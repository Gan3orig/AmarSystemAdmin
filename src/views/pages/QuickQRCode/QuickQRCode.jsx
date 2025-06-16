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
  const [mccCodes, setMccCodes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    owner_first_name: "",
    owner_last_name: "",
    register_number: "",
    company_name: "",
    name: "",
    name_eng: "",
    mcc_code: "",
    city: "",
    district: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("https://api.majorsoft.mn/api/QPay/mccCode")
      .then((e) => setMccCodes(e.data));
    axios
      .get("https://api.majorsoft.mn/api/QPay/aimagHot")
      .then((e) => setCities(e.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.majorsoft.mn/api/QPay/" +
          (formType === "individual" ? "person" : "company"),
        formData,
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGetDistricts = async (e) => {
    const cityValue = e.target.value;
    setFormData({
      ...formData,
      city: cityValue,
      district: "", // Reset district when city changes
    });
    const response = await axios.get(
      `https://api.majorsoft.mn/api/QPay/sumDuureg?pAimagHot=${cityValue}`,
    );
    setDistricts(response.data);
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
                      <CFormLabel>Регистрийн дугаар *</CFormLabel>
                      <CFormInput
                        type="text"
                        name="register_number"
                        value={formData.register_number}
                        onChange={handleChange}
                        required
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
                      <CFormLabel>Байгууллагын нэр *</CFormLabel>
                      <CFormInput
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Байгууллагын нэр (Англи)</CFormLabel>
                      <CFormInput
                        type="text"
                        name="name_eng"
                        value={formData.name_eng}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>MCC код *</CFormLabel>
                      <CFormSelect
                        name="mcc_code"
                        value={formData.mcc_code}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Сонгоно уу</option>
                        {mccCodes.map((code) => (
                          <option key={code.mcc_code} value={code.mcc_code}>
                            {code.name_mon}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Хот *</CFormLabel>
                      <CFormSelect
                        name="city"
                        value={formData.city}
                        onChange={handleGetDistricts}
                        required
                      >
                        <option value="">Сонгоно уу</option>
                        {cities.map((city) => (
                          <option key={city.code} value={city.code}>
                            {city.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Дүүрэг *</CFormLabel>
                      <CFormSelect
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        disabled={!formData.city}
                        required
                      >
                        <option value="">Сонгоно уу</option>
                        {districts.map((district) => (
                          <option key={district.code} value={district.code}>
                            {district.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Хаяг *</CFormLabel>
                      <CFormInput
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Утас *</CFormLabel>
                      <CFormInput
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>И-мэйл *</CFormLabel>
                      <CFormInput
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CRow>
                </>
              ) : (
                <>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Байгууллагын нэр *</CFormLabel>
                      <CFormInput
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Регистрийн дугаар *</CFormLabel>
                      <CFormInput
                        type="text"
                        name="register_number"
                        value={formData.register_number}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Байгууллагын нэр (Англи)</CFormLabel>
                      <CFormInput
                        type="text"
                        name="name_eng"
                        value={formData.name_eng}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>MCC код *</CFormLabel>
                      <CFormSelect
                        name="mcc_code"
                        value={formData.mcc_code}
                        onChange={handleChange}
                      >
                        <option value="">Сонгоно уу</option>
                        {mccCodes.map((code) => (
                          <option key={code.mcc_code} value={code.mcc_code}>
                            {code.name_mon}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Хот</CFormLabel>
                      <CFormSelect
                        name="city"
                        value={formData.city}
                        onChange={handleGetDistricts}
                      >
                        <option value="">Сонгоно уу</option>
                        {cities.map((city) => (
                          <option key={city.code} value={city.code}>
                            {city.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} className="mb-3">
                      <CFormLabel>Дүүрэг</CFormLabel>
                      <CFormSelect
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        disabled={!formData.city}
                      >
                        <option value="">Сонгоно уу</option>
                        {districts.map((district) => (
                          <option key={district.code} value={district.code}>
                            {district.name}
                          </option>
                        ))}
                      </CFormSelect>
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
