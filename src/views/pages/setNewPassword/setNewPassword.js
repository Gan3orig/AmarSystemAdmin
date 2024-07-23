import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow
} from '@coreui/react';

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lastSentCode, setAuthCode] = useState(''); // Added lastSentCodestate
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Extract token from URL
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    setSuccessMessage('');

    if (!newPassword || !confirmPassword || !lastSentCode) {
      setAlertMessage('Бүх талбарыг бөглөнө үү');
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlertMessage('Нууц үг тохирохгүй байна');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email,newPassword, lastSentCode}) // Include lastSentCodein the request body
    
    };

    try {
      const response = await fetch('https://api.majorsoft.mn/api/login/changePassword', requestOptions);
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message || 'Нууц үг амжилттай шинэчлэгдлээ');
       
        setTimeout(() => navigate('/login'), 1000); // Redirect to login after a delay
      } else {
        setAlertMessage(result.message || 'Нууц үг шинэчлэхэд алдаа гарлаа');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('Серверийн алдаа');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Шинэ нууц үг тохируулах</h1>
                     <CFormInput
                      type="email"
                      value={email}
                      className="mb-3"
                      disabled
                    />
                    <CFormInput
                      type="number"
                      
                       placeholder="Баталгаажуулах код"
                       autoComplete="auth-code"
                      value={lastSentCode}
                      onChange={(e) => setAuthCode(e.target.value)}
                      
                      className="mb-3"
                    />
                    <CFormInput
                      type="text"
                     placeholder="Шинэ нууц үг"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mb-3"
                    />
                    <CFormInput
                      type="text"
                      placeholder="Шинэ нууц үгийг дахин оруулах"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mb-3"
                    />
                    {alertMessage && <CAlert color='danger' dismissible onClose={() => setAlertMessage('')}>{alertMessage}</CAlert>}
                    {successMessage && <CAlert color='success' dismissible onClose={() => setSuccessMessage('')}>{successMessage}</CAlert>}
                    <CRow>
                      <CCol xs={12}>
                        <CButton type="submit" color="primary" className="px-4 ">
                          Шинэчлэх
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default SetNewPassword;
