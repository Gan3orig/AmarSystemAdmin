import { cilArrowThickRight, cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardImage,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner
} from '@coreui/react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateToken } from 'src/validateToken'; // Validation
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  // Helper function to check if token is expired
  const isTokenExpired = () => {
    const expiresIn = localStorage.getItem('expiresIn');
    if (!expiresIn) return true; // If there's no expiry date, consider it expired
    const currentTime = new Date().getTime(); // Current time in milliseconds
    return currentTime > expiresIn; // Token is expired if current time is greater than expiry time
  };

  useEffect(() => {
    const isValid = validateToken(); // Validate the token on mount
    if (isValid && !isTokenExpired()) {
      navigate('/dashboard');
    } else {
      // If token is invalid or expired, clear localStorage and navigate to login
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlertMessage(''); // Reset alert message
    if (!username || !password) {
      setAlertMessage(t('fillCredentials'));
      return;
    }

    setIsLoading(true); // Start loading
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch("https://api.majorsoft.mn/api/login", requestOptions);
      const result = await response.json();

      if (response.ok) {
        if (result.isOK) {
          const data = JSON.parse(result.json);
          //const expiryDate = new Date().getTime() + data.expiresIn * 1000; // Calculate expiry time

          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user-info", data.userId);
          localStorage.setItem("expiresIn", data.expiresIn); // Save expiry date in milliseconds
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("role", data.role);
          localStorage.setItem("userId", data.userId);
          sessionStorage.setItem("token", data.accessToken);
          sessionStorage.setItem("expiresIn", data.expiresIn);
          sessionStorage.setItem("userId", data.userId);

          navigate('/dashboard');
        } else {
          setAlertMessage(result.message);
        }
      } else {
        setAlertMessage(result.message);
      }
    } catch (error) {
      setAlertMessage("Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.");
      console.log(error.message)
    } finally {
      setIsLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h2>{t('login')}</h2>
                    <p className="text-body-secondary">{t('enterCredentials')}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder={t('username')}
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? "text" : "password"}
                        placeholder={t('password')}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <CInputGroupText type="button" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </CInputGroupText>
                    </CInputGroup>
                    {alertMessage && <CAlert color='danger' dismissible onClose={() => setAlertMessage('')}>{alertMessage}</CAlert>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4" disabled={isLoading}>
                          {isLoading ? <CSpinner size="sm" /> : t('login')}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/reset-password">
                          <CButton color="link" className="px-0">
                            {t('forgotPassword')}
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                    <CRow>
                    <CCol xs={6}>
                      <Link to="/register">
                        <CButton color="link" className="px-0">
                          {t('nowRegister')}
                        </CButton>
                      </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5">
                <CCardBody className="text-center">
                  <div>
                    <h2>{t('register.title')}</h2>
                    <p>{t('registerBusiness')}</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3">
                        {t('nowRegister')}
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
