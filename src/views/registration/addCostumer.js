import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFooter

  
} from "@coreui/react";
import AddCategory from "../notUsed/addCategory"; // Import your AddCategory component here
import { useTranslation } from "react-i18next";

const AddCustomer = () => {
  const { t } = useTranslation();
  const [customerName, setCustomerName] = useState("");
  const [customerGroup, setCustomerGroup] = useState([]);
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState([]);
  const [addModal, setModal] = useState(false);
  const [customers, setCustomers] = useState([]);

  const handleModalCat = () => {
    setModal(!addModal);
  };

  // Fetch customer data from the API
  const fetchCustomer = async () => {
    const url = "https://api.ebarimt.mn/api/info/check/getBranchInfo";
    const options = {
      method: "GET",
      headers: { Accept: "application/json" },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const dataArray = Array.isArray(data) ? data : data.data || [];

      if (Array.isArray(dataArray)) {
        const groupedCustomer = dataArray.reduce((acc, curr) => {
          const {
            customerName,
            customerGroup,
            customerAddress,
            customerPhone,
            customerCode, // Added customerCode for unique identification
          } = curr;

          if (!acc[customerCode]) {
            acc[customerCode] = {
              customerName,
              customerGroup,
              customerAddress,
              customerPhone,
            };
          }
          return acc;
        }, {});

        setCustomers(Object.values(groupedCustomer));
      } else {
        console.error("Unexpected data format:", dataArray);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <main className="d-flex flex-column align-items-center mt-2">
      <CCard style={{ maxWidth: "800px", width: "100%" }}>
        <CCardHeader>{t("r.addItem")}</CCardHeader>
        <CCardBody>
          <CForm>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>{t("r.customerName")}</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder={t("r.customerName")}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>{t("r.customerGroup")}</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder={t("r.customerGroup")}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>{t("r.customerAddress")}</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder={t("r.customerAddress")}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>{t("r.customerPhone")}</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder={t("r.customerPhone")}
                  required
                />
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
        <CFooter>
          <CRow className="d-flex justify-content-end">
            <CCol xs="auto">
              <CButton color="primary" >
                Хадгалах
              </CButton>
            </CCol>
            <CCol xs="auto">
              <CButton color="secondary" >
                Буцах
              </CButton>
            </CCol>
          </CRow>
        </CFooter>
      </CCard>
    </main>
  );
};

export default AddCustomer;
