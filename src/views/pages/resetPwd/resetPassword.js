import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate=useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    setSuccessMessage('');

    if (!email) {
      setAlertMessage('Имэйл хаягаа оруулна уу');
      return;
    }

    // Create Headers object
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // Convert email to JSON string
    const raw = JSON.stringify( email );
     console.log(raw);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch('https://api.majorsoft.mn/api/login/forgotPassword', requestOptions);
      const result = await response.json();

      if (response.ok) {
       
        if(result.isOK){
            setSuccessMessage(result.message );
            setTimeout(() => navigate(`/set-password?email=${email}`), 1000);
        }
        else{
            setAlertMessage(result.message || 'Ийм бүртгэлтэй хэрэглэгч байхгүй байна.')
        }
      } else {
        setAlertMessage(result.message || 'Нууц үг сэргээхэд алдаа гарлаа');
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
                  <CForm onSubmit={handleResetPassword}>
                    <h1>Нууц үг сэргээх</h1>
                    <p className="text-body-secondary">Нууц үг сэргээх заавар авахын тулд имэйл хаягаа оруулна уу</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Имэйл"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    {alertMessage && <CAlert color='danger' dismissible onClose={() => setAlertMessage('')}>{alertMessage}</CAlert>}
                    {successMessage && <CAlert color='success' dismissible onClose={() => setSuccessMessage('')}>{successMessage}</CAlert>}
                    <CRow>
                      <CCol xs={6} className='d-flex justify-content-between w-100'>
                        <Link to="/login">
                          <CButton color="light" className="px-4">
                            Буцах
                          </CButton>
                        </Link>
                        <CButton type="submit" color="primary" className="px-4">
                          Илгээх
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

export default ResetPassword;
