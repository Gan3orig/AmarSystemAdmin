import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CAvatar,
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
} from "@coreui/react";
import { cilSettings, cilUser, cilLockLocked } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import initialAvatar from "./../../assets/images/userLight.png";

const AppHeaderDropdown = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchMerchantData = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User ID is not found in local storage.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://api.majorsoft.mn/api/merchantData?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const merchantData = await response.json();

        // Save merchantId to localStorage
        if (merchantData.data && merchantData.data.length > 0) {
          setUser(merchantData.data);
          localStorage.setItem("merchantId", merchantData.data[0].merchantId); // Ensure this line is executed correctly
        }
      } catch (error) {
        console.error("Error fetching merchant data:", error.message);
      }
    };

    fetchMerchantData();
  }, []);

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

  const handleSaveChanges = async () => {
    // Add save logic here if needed
    setModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle
          placement="bottom-end"
          className="py-0 pe-0"
          caret={false}
        >
          <CAvatar src={avatar} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
            Хэрэглэгчийн мэдээлэл
          </CDropdownHeader>
          
          {user.length > 1 && (
            user.map((merchant, index) => (
              <React.Fragment key={index}>
                <CDropdownItem>Merchant ID: {merchant.merchantId}</CDropdownItem>
                <CDropdownItem>Merchant Name: {merchant.merchantName}</CDropdownItem>
              </React.Fragment>
            ))
          )}
          {user.length === 1 && (
            <>
              <CDropdownItem>Merchant ID: {user[0].merchantId}</CDropdownItem>
              <CDropdownItem>Merchant Name: {user[0].merchantName}</CDropdownItem>
            </>
          )}

          <CDropdownHeader className="bg-body-secondary fw-semibold my-2">
            Settings
          </CDropdownHeader>
          <CDropdownItem onClick={() => setModalVisible(true)}>
            <CIcon icon={cilUser} className="me-2" />
            Нүүр хуудас
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilSettings} className="me-2" />
            Тохиргоо
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={handleLogout}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Гарах
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <h5 className="modal-title">Profile</h5>
        </CModalHeader>
        <CModalBody>
          <div className="text-center mb-4">
            <CAvatar
              src={avatar}
              size="xl"
              className="mb-3"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            <div className="d-grid gap-2 d-md-block">
              <CButton color="primary" size="sm" onClick={handleEditPhotoClick}>
                Зураг солих
              </CButton>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <CForm>
            <CFormLabel>Merchant Name</CFormLabel>
            <CFormInput
              type="text"
              value={user.merchantName}
              onChange={(e) =>
                setUser({ ...user, merchantName: e.target.value })
              }
            />
            <CFormLabel>Merchant ID</CFormLabel>
            <CFormInput
              type="text"
              value={user.merchantId}
              onChange={(e) => setUser({ ...user, merchantId: e.target.value })}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Хаах
          </CButton>
          <CButton color="primary" onClick={handleSaveChanges}>
            Хадгалах
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AppHeaderDropdown;
