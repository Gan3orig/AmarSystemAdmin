import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
} from '@coreui/react';
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import initialAvatar from './../../assets/images/userLight.png'

const AppHeaderDropdown = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [user, setUser] = useState({
    name: 'MajorSoft LLC',
    phoneNumber: '+976 70003214',
    email: 'info@majorsoft.mn',
  });
  
  const navigate = useNavigate(); // Use useNavigate hook
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPhotoClick = () => {
    fileInputRef.current.click();  
  };

  const handleSaveChanges = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); // Correctly handle navigation in the callback
  };

  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={avatar} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem href="#">
            <CIcon icon={cilBell} className="me-2" />
            Шинэчлэлтүүд
            <CBadge color="info" className="ms-2">42</CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilEnvelopeOpen} className="me-2" />
            Мессеж
            <CBadge color="success" className="ms-2">42</CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilTask} className="me-2" />
            Ажилууд
            <CBadge color="danger" className="ms-2">42</CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilCommentSquare} className="me-2" />
            Comments
            <CBadge color="warning" className="ms-2">42</CBadge>
          </CDropdownItem>
          <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Тохиргоонууд</CDropdownHeader>
          <CDropdownItem onClick={() => setModalVisible(true)}>
            <CIcon icon={cilUser} className="me-2" />
            <CBadge color="secondary" className="ms-2">42</CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilFile} className="me-2" />
            Төсөл
            <CBadge color="primary" className="ms-2">42</CBadge>
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={handleLogout}> {/* Handle logout via onClick */}
            <CIcon icon={cilLockLocked} className="me-2" />
            Гарах
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>

      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <CModalHeader>
          <h5 className="modal-title">Хэрэглэгчийн мэдээлэл</h5>
        </CModalHeader>
        <CModalBody>
          <div className="text-center mb-4">
            <CAvatar src={avatar} size="xl" className="mb-3" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            <div className="d-grid gap-2 d-md-block">
              <CButton className="position-sticky" color="primary" size="sm" onClick={handleEditPhotoClick}>
                Зураг солих
              </CButton>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <CForm>
            <CFormLabel>Нэр</CFormLabel>
            <CFormInput type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            <CFormLabel>Утасны дугаар</CFormLabel>
            <CFormInput type="text" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
            <CFormLabel>Э-Шуудан</CFormLabel>
            <CFormInput type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Хаах</CButton>
          <CButton color="primary" onClick={handleSaveChanges}>Хадгалах</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AppHeaderDropdown;
