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

const GetBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://api.majorsoft.mn/api/adminReports/branches",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        // console.log(response.data.data);
        setBranches(response.data.data);
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
            <CTableHeaderCell>Футер текст</CTableHeaderCell>
            <CTableHeaderCell>Бүртгүүлсэн огноо</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {branches.map((branch, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{branch.branchCode}</CTableDataCell>
              <CTableDataCell>{branch.branchName}</CTableDataCell>
              <CTableDataCell>
                {typeof branch.footerText === "object"
                  ? JSON.stringify(branch.footerText)
                  : branch.footerText}
              </CTableDataCell>
              <CTableDataCell>
                {dayjs(branch.createDate).format("YYYY-MM-DD")}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  );
};

export default GetBranches;
