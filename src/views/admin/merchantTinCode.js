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
      <CAccordionBody>
						<CCol xs="auto">
						<CFormLabel className="visually-hidden" htmlFor="autoSizingInput">
							Цахим баримт 3.0 TIN code ба ТТД Нэр авах
						</CFormLabel>
							</CCol>
							<CCol xs={12}>
								<CInputGroup className="mb-3">
									<CFormInput
										className='reg'
										type="text"
										placeholder="Регистерийн дугаар"
										aria-describedby="button-addon2"
										value={regNo}
										onChange={handleInputChange}
									/>
									<CButtonGroup role="group" aria-label="Basic example">
										<CButton
											type="button"
											color="primary"
											id="button-addon2"
											onClick={handleCheckUser}
										>
											Шалгах
										</CButton>
										<CButton color="primary" onClick={handleHideResults}>
											Хураах
										</CButton>
									</CButtonGroup>
								</CInputGroup>
							</CCol>
							<CCol xs={12}>
								<CCollapse visible={visibleA}>
									<CInputGroup className="mb-3">
										<CFormInput
											type="text"
											placeholder="Tin Code"
											aria-label="readonly input example"
											value={response?.data || ''}
											readOnly
										/>
										<CFormInput
											type="text"
											placeholder="Merchant Name"
											aria-label="readonly input example"
											value={secondResponse?.data?.name || ''}
											readOnly
										/>
									</CInputGroup>
								</CCollapse>
							</CCol>
							<CCol xs={12}>
								<CRow>
									<CCol>
										<CCollapse visible={visibleA}>
											<CCard className="mt-3">
												<CCardBody>
													<div className="result">Анхны API-ийн хариу:</div>
													<pre>{response ? JSON.stringify(response, null, 2) : 'No data'}</pre>
												</CCardBody>
												<CCardBody>
													<div className="result">Хоёр дахь API-ийн хариу:</div>
													<pre>{secondResponse ? JSON.stringify(secondResponse, null, 2) : 'No data'}</pre>
												</CCardBody>
											</CCard>
										</CCollapse>
									</CCol>
								</CRow>
							</CCol>
				</CAccordionBody>
    </CContainer>
  );
};

export default Table;
