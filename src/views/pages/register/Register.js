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
import { useTranslation } from 'react-i18next'; // Import i18n hook

const Register = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password || !confirmPassword) {
      setError(t('error.fieldsRequired'));
      return;
    }
  
    if (password !== confirmPassword) {
      setError(t('error.passwordMismatch'));
      return;
    }
  
    setError('');
    const data = {
      name,
      email,
      phone,
      password,
      deviceIdentityInfo: "string",
      userAgent: navigator.userAgent,
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch('https://api.majorsoft.mn/api/login/createUser', requestOptions);
  
      // If the response is not successful (4xx or 5xx errors)
      if (!response.ok) {
        // Parse the response body for an error message
        const errorData = await response.json();
        const backendMessage = errorData.message || t('error.general'); // Use backend message or fallback
        throw new Error(backendMessage); // Throw to be caught below
      }
  
      const result = await response.json();
  
      if (result.Success) {
        setSuccess(result.message || "Амжилттай бүртгэгдлээ"); // Use backend success message or default
        resetForm();
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setError(result.message || t('error.general')); // Display backend message on failure
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || t('error.general')); // Display error message from backend or a general one
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
      {/* {success && (
        <CAlert color="success">
          {success}
        </CAlert>
      )} */}
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSignUp}>
                  <h1>{t('register.title')}</h1> 
                  <p className="text-body-secondary">{t('register.subtitle')}</p> 
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder={t('register.namePlaceholder')} // Translation for "Нэр"
                      autoComplete="username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder={t('register.emailPlaceholder')} // Translation for "Email"
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
                      placeholder={t('register.phonePlaceholder')}
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
                      placeholder={t('register.passwordPlaceholder')}
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
                      placeholder={t('register.confirmPasswordPlaceholder')}
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
                      {t('register.submitButton')} 
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
