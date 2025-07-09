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
import BranchMobileTable from "./BranchMobileTable";

const PAGE_SIZE = 10;

const GetBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBranches = async () => {
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
        setBranches(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Салбаруудын мэдээлэл татахад алдаа гарлаа:", error);
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  // Хайлт хийх функц
  const filteredBranches = branches.filter((branch) => {
    const searchLower = search.toLowerCase();
    return (
      (branch.branchCode + "").toLowerCase().includes(searchLower) ||
      branch.branchName?.toLowerCase().includes(searchLower) ||
      (typeof branch.footerText === "string"
        ? branch.footerText.toLowerCase().includes(searchLower)
        : JSON.stringify(branch.footerText).toLowerCase().includes(searchLower))
    );
  });

  // Хуудаслалт тооцоолол
  const totalPages = Math.ceil(filteredBranches.length / PAGE_SIZE);
  const paginatedBranches = filteredBranches.slice(
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
        <BranchMobileTable branches={paginatedBranches} />
      </div>
      <CContainer
        style={{ display: window.innerWidth < 768 ? "none" : "block" }}
      >
        <CRow className="mb-3">
          <CCol xs={12} md={6} lg={4}>
            <CFormInput
              type="text"
              placeholder="Хайх (ID, нэр, футер текст)"
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
              <CTableHeaderCell>Футер текст</CTableHeaderCell>
              <CTableHeaderCell>Бүртгүүлсэн огноо</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paginatedBranches.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={4} className="text-center">
                  Илэрц олдсонгүй
                </CTableDataCell>
              </CTableRow>
            ) : (
              paginatedBranches.map((branch, index) => (
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
              ))
            )}
          </CTableBody>
        </CTable>
        {totalPages > 1 && (
          <CPagination className="mt-3">
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

export default GetBranches;
