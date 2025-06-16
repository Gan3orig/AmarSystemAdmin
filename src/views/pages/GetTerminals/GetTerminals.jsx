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
} from "@coreui/react";
import axios from "axios";
import dayjs from "dayjs";

const GetTerminals = () => {
  const [terminals, setTerminals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://api.majorsoft.mn/api/adminReports/terminals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        // console.log(response.data.data);
        setTerminals(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <CSpinner color="primary" />;
  }

  return (
    <CContainer>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Байгууллагын нэр</CTableHeaderCell>
            <CTableHeaderCell>Холбогдсон эсэх</CTableHeaderCell>
            <CTableHeaderCell>Бүртгүүлсэн огноо</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {terminals.map((terminal, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{terminal.terminalCode}</CTableDataCell>
              <CTableDataCell>{terminal.terminalName}</CTableDataCell>
              <CTableDataCell>
                {terminal.isConnected ? "Холбогдсон" : "Холбогдоогүй"}
              </CTableDataCell>
              <CTableDataCell>
                {dayjs(terminal.createDate).format("YYYY-MM-DD")}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  );
};

export default GetTerminals;
