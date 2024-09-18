import { cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
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
  CRow,
  CSpinner,
} from '@coreui/react';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validateToken } from 'src/validateToken'; //MINII MUU VALIDATION
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isValid = validateToken(); // Validate the token
  //const history = useHistory();
  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        setAlertMessage('Хэрэглэгчийн нэр болон нууц үгээ оруулна уу');
        return;
      }
      setIsLoading(true);
      //await new Promise(resolve => setTimeout(resolve, 2000));
      const myHeaders = new Headers();
      console.log(myHeaders
      )
      myHeaders.append("Content-Type", "application/json");
    console.log(myHeaders)
      const raw = JSON.stringify({
        "username": username,
        "password": password
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw
      };
      const response = await fetch("https://api.majorsoft.mn/api/login", requestOptions);
      const result = await response.json();
      console.log(result)
      //history.push('/');
      if (response.ok) {
        if (result.isOK) {
          const data = JSON.parse(result.json)
          console.log(data)
          //const currentTime = new Date().getTime();
          const expiryDate =  data.expiresIn;
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user-info", data.userId);
          localStorage.setItem("expiryDate", expiryDate);
          localStorage.setItem("isAuthenticated", true);
          //setAlertMessage(result.message);
          window.location.href = '/';
        } else {
          setAlertMessage(result.message);
        }
      } else {
        setAlertMessage(result.message);
      }
    } catch (error) {
      setIsLoading(false);
      setAlertMessage(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={HandleLogin}>
                    <h2>Нэвтрэх</h2>
                    <p className="text-body-secondary">Та өөрийн бүртгэлтэй хаягаар нэвтрэнэ үү</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="username"
                        placeholder="Хэрэглэгчийн нэр"
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
                        placeholder="Нууц үг"
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
                        {!isLoading && <CButton type="submit" color="primary" className="px-4"> 
                          Нэвтрэх
                        </CButton>}
                        {isLoading && <CButton type="submit" color="primary" className="px-4"><CSpinner className="text-center" />....</CButton>  }
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/reset-password">
                          <CButton color="link" className="px-0">
                            Нууц үг мартсан
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5">
                <CCardBody className="text-center">
                  <div>
                    <h2>Бүртгүүлэх</h2>
                    <p>Бизнесээ ухаалгаар хяна</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3">
                        Одоо бүртгүүлэх
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
// Login.propTypes = { setAuthenticated: PropTypes.bool.isRequired };

export default Login;