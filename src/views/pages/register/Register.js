import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Бүх талбаруудыг бөглөнө үү');
      return;
    }

    if (password !== confirmPassword) {
      setError('Нууц үг тохирохгүй байна');
      return;
    }

    setError('');
    const data = {
      email: email,
      userName: name,
      phone: phone,
      password: password,
      userAgent: navigator.userAgent,
    };
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch('https://api.majorsoft.mn/api/userAccount', requestOptions);
      const result = await response.json();
      console.log(response);
      console.log(result.isOK);
      if (result.isOK) {
        setSuccess(result.message);
        resetForm();
        setTimeout(()=>{navigate('/login');},2000)
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Алдаа гарлаа');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSignUp}>
                  <h1>Бүртгүүлэх</h1>
                  <p className="text-body-secondary">Шинэ хаяг нээх</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Нэр"
                      autoComplete="username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Утас"
                      autoComplete="Phone_number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Нууц үг"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Нууц үг давтана уу"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <CInputGroupText onClick={togglePassword} style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </CInputGroupText>
                  </CInputGroup>
                  {success && (
                    <CAlert color="success" dismissible onClose={() => setSuccess('')}>
                      {success}
                    </CAlert>
                  )}
                  {error && (
                    <CAlert color="danger" dismissible onClose={() => setError('')}>
                      {error}
                    </CAlert>
                  )}
                  <div className="d-grid">
                    <CButton color="primary" type="submit">
                      Бүртгүүлэх
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
