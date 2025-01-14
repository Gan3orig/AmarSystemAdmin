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
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Change this to set how many items you want per page

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://api.majorsoft.mn/api/terminalMap",{
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          // const result = await response.json();
          setData(data); // Assume API returns an array of data
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtered data based on the search term
  const filteredData = data.filter(
    (location) =>
      location.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.phone1.includes(searchTerm) ||
      location.registerNo.includes(searchTerm),
  );

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <CContainer>
      {loading ? (
        <div className="text-center">
          <CSpinner />
        </div>
      ) : (
        <>
          <CInputGroup className="mb-3">
            <CFormInput
              type="text"
              placeholder="Хайх"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CInputGroupText>
              <CIcon icon={cilSearch} />
            </CInputGroupText>
          </CInputGroup>

          <CTable align="middle" hover responsive bordered>
            <CTableHead color="primary">
              <CTableRow>
                <CTableHeaderCell>*</CTableHeaderCell>
                <CTableHeaderCell>Нэр</CTableHeaderCell>
                <CTableHeaderCell>Байгууллагын нэр</CTableHeaderCell>
                <CTableHeaderCell>Утасны дугаар</CTableHeaderCell>
                <CTableHeaderCell>Регисртийн дугаар</CTableHeaderCell>
                <CTableHeaderCell>Эхэлсэн огноо</CTableHeaderCell>
                <CTableHeaderCell>Дуусах огноо</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentItems.map((location, index) => (
                <CTableRow key={location.terminalId}>
                  <CTableDataCell>
                    {indexOfFirstItem + index + 1}
                  </CTableDataCell>
                  <CTableDataCell>{location.businessName}</CTableDataCell>
                  <CTableDataCell>{location.entityName}</CTableDataCell>
                  <CTableDataCell>
                    {location.phone1}  {location.phone2}
                  </CTableDataCell>
                  <CTableDataCell>{location.registerNo}</CTableDataCell>
                  <CTableDataCell>{location.createDate}</CTableDataCell>
                  <CTableDataCell>
                  {location.licenseExpireDate}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          {/* Pagination Controls */}
          <CPagination aria-label="Page navigation example" className="mt-3">
            <CPaginationItem
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Өмнөх
            </CPaginationItem>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;

              // Show first and last pages and pages around current
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <CPaginationItem
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    active={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </CPaginationItem>
                );
              }

              // Show ellipses
              if (pageNumber === 2 && currentPage > 3) {
                return (
                  <CPaginationItem key="ellipsis-left" disabled>
                    ...
                  </CPaginationItem>
                );
              }

              if (
                pageNumber === totalPages - 1 &&
                currentPage < totalPages - 2
              ) {
                return (
                  <CPaginationItem key="ellipsis-right" disabled>
                    ...
                  </CPaginationItem>
                );
              }

              return null;
            })}

            <CPaginationItem
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Дараах
            </CPaginationItem>
          </CPagination>
        </>
      )}
    </CContainer>
  );
};

export default Table;
