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
  CFormInput,
  CPagination,
  CPaginationItem,
  CRow,
  CCol,
} from "@coreui/react";
import axios from "axios";
import dayjs from "dayjs";
import MerchantsMobileTable from "./MerchantsMobileTable";

const PAGE_SIZE = 10;

const GetMerchants = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://api.majorsoft.mn/api/adminReports/merchants",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Хэрэглэгчийн мэдээлэл татахад алдаа гарлаа:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Хайлт хийх функц
  const filteredUsers = users.filter((user) => {
    const searchLower = search.toLowerCase();
    return (
      user.merchantName?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower) ||
      (user.id + "").includes(searchLower)
    );
  });

  // Хуудаслалт тооцоолол
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Хуудас солих
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Хайлт өөрчлөгдөхөд хуудас 1 рүү шилжүүлэх
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <CSpinner color="primary" />;
  }

  return (
    <>
      <div style={{ display: window.innerWidth < 768 ? "block" : "none" }}>
        <MerchantsMobileTable users={paginatedUsers} />
      </div>
      <CContainer
        style={{ display: window.innerWidth < 768 ? "none" : "block" }}
      >
        <CRow className="mb-3">
          <CCol xs={12} md={6} lg={4}>
            <CFormInput
              type="text"
              placeholder="Хайх (нэр, и-мэйл, утас, ID)"
              value={search}
              onChange={handleSearchChange}
            />
          </CCol>
        </CRow>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Байгууллагын нэр</CTableHeaderCell>
              <CTableHeaderCell>И-мэйл</CTableHeaderCell>
              <CTableHeaderCell>Утас</CTableHeaderCell>
              <CTableHeaderCell>Бүртгүүлсэн огноо</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paginatedUsers.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={5} className="text-center">
                  Илэрц олдсонгүй
                </CTableDataCell>
              </CTableRow>
            ) : (
              paginatedUsers.map((user) => (
                <CTableRow key={user.id}>
                  <CTableDataCell>{user.id}</CTableDataCell>
                  <CTableDataCell>{user.merchantName}</CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell>{user.phone}</CTableDataCell>
                  <CTableDataCell>
                    {dayjs(user.createDate).format("YYYY-MM-DD")}
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
        {totalPages > 1 && (
          <CPagination align="center" className="mt-3">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Өмнөх
            </CPaginationItem>
            {Array.from({ length: totalPages }, (_, idx) => (
              <CPaginationItem
                key={idx + 1}
                active={currentPage === idx + 1}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Дараах
            </CPaginationItem>
          </CPagination>
        )}
      </CContainer>
    </>
  );
};

export default GetMerchants;
