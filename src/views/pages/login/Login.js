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
  CRow
} from '@coreui/react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import axios from 'axios';
// import { useAuth } from 'src/AuthContext';
//import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  //const history = useHistory();
  const navigate = useNavigate();
  const HandleLogin = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    try {
      setLoading(true);
      if (!username || !password) {
        setAlertMessage('Хэрэглэгчийн нэр болон нууц үгээ оруулна уу');
        return;
      }
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
    
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
      //history.push('/');
      if (response.ok) {
        if (result.isOK) {
          const data = JSON.parse(result.json)
          const currentTime = new Date().getTime();
          const expiryDate = currentTime + data.expiresIn * 1000;
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user-info", data.userId);
          localStorage.setItem("expiryDate", expiryDate);
          localStorage.setItem("isAuthenticated", true);
          //setAlertMessage(result.message);
          navigate('/dashboard');
        } else {
          setAlertMessage(result.message);
        }
      } else {
        setAlertMessage(result.message);
      }
    } catch (error) {
      setAlertMessage(error.message);
    }
    finally{setLoading(false);}
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
                    <h1>Нэвтрэх</h1>
                    <p className="text-body-secondary">Та өөрийн бүртгэлтэй хаягаар нэвтрэнэ үү</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
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
                        <CButton type="submit" color="primary" className="px-4">
                          Нэвтрэх
                        </CButton>
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

export default Login;
