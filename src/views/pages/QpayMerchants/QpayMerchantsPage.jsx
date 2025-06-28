import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
  CContainer,
  CButton,
} from "@coreui/react";
import { Link } from "react-router-dom";

const QpayMerchantsPage = () => {
  const [merchants, setMerchants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (isLoading) {
    axios
      .post("https://api.majorsoft.mn/api/QPay/getMerchants", null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setMerchants(res.data.rows);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // alert("Error");
      });
    // }
  }, [isLoading]);

  if (isLoading) {
    return <CSpinner color="primary" />;
  }

  return (
    <CContainer>
      <Link to="/quick-qr-code">
        <CButton color="primary">Merchant нэмэх</CButton>
      </Link>
      <CTable hover striped responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Бүртгэлийн №</CTableHeaderCell>
            <CTableHeaderCell scope="col">Нэр</CTableHeaderCell>
            <CTableHeaderCell scope="col">MCC код</CTableHeaderCell>
            <CTableHeaderCell scope="col">Хот</CTableHeaderCell>
            <CTableHeaderCell scope="col">Дүүрэг</CTableHeaderCell>
            <CTableHeaderCell scope="col">Хаяг</CTableHeaderCell>
            <CTableHeaderCell scope="col">Утас</CTableHeaderCell>
            <CTableHeaderCell scope="col">И-мэйл</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {merchants.map((merchant, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>{merchant.register_number}</CTableDataCell>
              <CTableDataCell>{merchant.name}</CTableDataCell>
              <CTableDataCell>{merchant.mcc_code}</CTableDataCell>
              <CTableDataCell>{merchant.city}</CTableDataCell>
              <CTableDataCell>{merchant.district}</CTableDataCell>
              <CTableDataCell>{merchant.address}</CTableDataCell>
              <CTableDataCell>{merchant.phone}</CTableDataCell>
              <CTableDataCell>{merchant.email}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  );
};

export default QpayMerchantsPage;
