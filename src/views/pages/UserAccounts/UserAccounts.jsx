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
import UserMobileTable from "./UserMobileTable";

const PAGE_SIZE = 10;

const UserAccounts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://api.majorsoft.mn/api/adminReports/userAccounts",
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
      user.userName?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower) ||
      (user.id + "").includes(searchLower)
    );
  });

  // Pagination тооцоолол
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
      {/* Mobile view */}
      <div style={{ display: window.innerWidth < 768 ? "block" : "none" }}>
        <UserMobileTable users={filteredUsers} />
      </div>

      {/* Desktop / tablet view */}
      <div style={{ display: window.innerWidth < 768 ? "none" : "block" }}>
        <CContainer>
          <CRow className="mb-3">
            <CCol xs={12} md={6} lg={4}>
              <CFormInput
                type="text"
                placeholder="Хэрэглэгч хайх (нэр, и-мэйл, утас, ID)"
                value={search}
                onChange={handleSearchChange}
              />
            </CCol>
          </CRow>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Хэрэглэгчийн нэр</CTableHeaderCell>
                <CTableHeaderCell>И-мэйл</CTableHeaderCell>
                <CTableHeaderCell>Утас</CTableHeaderCell>
                <CTableHeaderCell>Бүртгүүлсэн огноо</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedUsers.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={5} className="text-center">
                    Хэрэглэгч олдсонгүй
                  </CTableDataCell>
                </CTableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <CTableRow key={user.id}>
                    <CTableDataCell>{user.id}</CTableDataCell>
                    <CTableDataCell>{user.userName}</CTableDataCell>
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
            <CRow className="mt-3">
              <CCol>
                <CPagination align="center" aria-label="Хуудас">
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
              </CCol>
            </CRow>
          )}
        </CContainer>
      </div>
    </>
  );
};

export default UserAccounts;
