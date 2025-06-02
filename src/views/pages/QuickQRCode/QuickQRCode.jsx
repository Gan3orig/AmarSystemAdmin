import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CButton,
  CFormSelect,
} from "@coreui/react";
import axios from "axios";

const QuickQRCode = () => {
  const [formType, setFormType] = useState("individual");
  const [formData, setFormData] = useState({
    owner_register_no: "",
    owner_first_name: "",
    owner_last_name: "",
    location_lat: "",
    location_lng: "",
    register_number: "",
    name: "",
    mcc_code: "",
    city: "",
    district: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    axios.post(
      "https://sandbox-quickqr.qpay.mn/v2/auth/token",
      {
        terminal_id: "1234567890",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:admin"),
        },
      },
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sandbox-quickqr.qpay.mn/v2/merchant/" +
          (formType === "individual" ? "person" : "company"),
        formData,
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>QPAY бүртгэл</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Бүртгэлийн төрөл</CFormLabel>
                  <CFormSelect value={formType} onChange={handleFormTypeChange}>
                    <option value="individual">Хувь хүн</option>
                    <option value="business">Байгууллага</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              {formType === "individual" ? (
                <>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Регистрийн дугаар</CFormLabel>
                      <CFormInput
                        type="text"
                        name="owner_register_no"
                        value={formData.owner_register_no}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Нэр</CFormLabel>
                      <CFormInput
                        type="text"
                        name="owner_first_name"
                        value={formData.owner_first_name}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Овог</CFormLabel>
                      <CFormInput
                        type="text"
                        name="owner_last_name"
                        value={formData.owner_last_name}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Байршил (Өргөрөг)</CFormLabel>
                      <CFormInput
                        type="text"
                        name="location_lat"
                        value={formData.location_lat}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Байршил (Уртраг)</CFormLabel>
                      <CFormInput
                        type="text"
                        name="location_lng"
                        value={formData.location_lng}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CRow>
                </>
              ) : (
                <>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Байгууллагын нэр</CFormLabel>
                      <CFormInput
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Регистрийн дугаар</CFormLabel>
                      <CFormInput
                        type="text"
                        name="register_number"
                        value={formData.register_number}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>MCC код</CFormLabel>
                      <CFormInput
                        type="text"
                        name="mcc_code"
                        value={formData.mcc_code}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Хот</CFormLabel>
                      <CFormInput
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Дүүрэг</CFormLabel>
                      <CFormInput
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Хаяг</CFormLabel>
                      <CFormInput
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Утас</CFormLabel>
                      <CFormInput
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>И-мэйл</CFormLabel>
                      <CFormInput
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CRow>
                </>
              )}
              <CButton type="submit" color="primary">
                QR код үүсгэх
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default QuickQRCode;
