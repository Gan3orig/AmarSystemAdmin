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
  CCard,
  CCardHeader,
  CCardBody,
  CFormInput,
  CBadge,
  CButton,
  CTooltip,
  CPagination,
  CPaginationItem,
  CAlert,
} from "@coreui/react";
import axios from "axios";
import dayjs from "dayjs";
import {
  FaSearch,
  FaSync,
  FaChevronDown,
  FaChevronUp,
  FaFilter,
} from "react-icons/fa";
import { MdMore } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_SIZE = 10;

const GetMerchants = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  // Window resize listener for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch merchants from API with error handling
  const fetchMerchants = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://api.majorsoft.mn/api/adminReports/merchants",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setMerchants(response.data.data);
      setFilteredMerchants(response.data.data);
    } catch (error) {
      setError(
        "Байгууллагын мэдээлэл татахад алдаа гарлаа. Дахин оролдоно уу.",
      );
      console.error("Error fetching merchants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = merchants.filter((merchant) =>
        Object.values(merchant).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setFilteredMerchants(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, merchants]);

  // Enhanced refresh handler with feedback
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchMerchants();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Improved sorting with animation
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredMerchants].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredMerchants(sortedData);
  };

  // Enhanced cell value renderer with formatting
  const renderCellValue = (key, value) => {
    if (
      key === "logo" ||
      key === "logoThumb" ||
      (value !== null && typeof value === "object")
    ) {
      return "";
    }

    if (typeof value === "string" && /date/i.test(key)) {
      const formatted = dayjs(value);
      return formatted.isValid() ? formatted.format("YYYY-MM-DD HH:mm") : value;
    }

    if (key === "phone") {
      return value ? (
        <a href={`tel:${value}`} className="text-primary text-decoration-none">
          {value}
        </a>
      ) : (
        ""
      );
    }

    if (key === "email") {
      return value ? (
        <a
          href={`mailto:${value}`}
          className="text-primary text-decoration-none"
        >
          {value}
        </a>
      ) : (
        ""
      );
    }

    if (key === "web") {
      return value ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-decoration-none"
        >
          {value}
        </a>
      ) : (
        ""
      );
    }

    return value !== undefined && value !== null ? value.toString() : "";
  };

  // Mongolian header translations
  const headerTranslations = {
    merchantId: "Байгууллагын ID",
    merchantName: "Байгууллагын нэр",
    propertyType: "Хуулийн хэлбэр",
    director: "Захирал",
    accountant: "Нябо",
    phone: "Утас",
    email: "И-мэйл",
    web: "Вебсайт",
    address: "Хаяг",
    logo: "Лого",
    logoThumb: "Лого (thumbnail)",
  };

  const headers = merchants.length > 0 ? Object.keys(merchants[0]) : [];
  const visibleHeaders = isMobile
    ? ["merchantName", "phone"]
    : headers.slice(0, 5);

  const totalPages = Math.ceil(filteredMerchants.length / PAGE_SIZE);
  const paginatedMerchants = filteredMerchants.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <CSpinner color="primary" style={{ width: 60, height: 60 }} />
        <div className="mt-3 text-secondary fs-5">
          Байгууллагын мэдээлэл ачааллаж байна...
        </div>
      </motion.div>
    );
  }

  return (
    <CContainer fluid>
      {error && (
        <CAlert color="danger" className="mb-4">
          {error}
        </CAlert>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CCard className="shadow-lg border-0 mb-4 rounded-4">
          <CCardHeader className="bg-white border-bottom-0 py-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <motion.h4
                className="mb-0 text-primary fw-bold"
                whileHover={{ scale: 1.02 }}
              >
                <span className="me-2">Байгууллагын жагсаалт</span>
                <CBadge color="info" className="fs-6 rounded-pill">
                  {filteredMerchants.length}
                </CBadge>
              </motion.h4>
              <div className="d-flex gap-3 align-items-center flex-wrap">
                <div
                  className="position-relative"
                  style={{ width: isMobile ? "100%" : "300px" }}
                >
                  <CFormInput
                    placeholder="Хайх (нэр, утас, и-мэйл гэх мэт)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pe-5 shadow-sm rounded-pill"
                    style={{ minWidth: 180 }}
                    autoFocus
                  />
                  <FaSearch
                    className="position-absolute text-primary"
                    style={{
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      opacity: 0.7,
                      pointerEvents: "none",
                    }}
                    size={18}
                  />
                </div>

                <CTooltip content="Шүүлтүүр">
                  <CButton
                    color="light"
                    className="shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}
                  >
                    <FaFilter />
                  </CButton>
                </CTooltip>

                <CTooltip content="Шинэчлэх">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CButton
                      color="primary"
                      variant="ghost"
                      className={`shadow-sm rounded-circle d-flex align-items-center justify-content-center ${isRefreshing ? "spin" : ""}`}
                      onClick={handleRefresh}
                      style={{ width: 40, height: 40 }}
                      disabled={isRefreshing}
                    >
                      <FaSync />
                    </CButton>
                  </motion.div>
                </CTooltip>
              </div>
            </div>
          </CCardHeader>

          <CCardBody className="p-0">
            <div className="table-responsive">
              <CTable hover bordered className="align-middle mb-0">
                <CTableHead>
                  <CTableRow className="bg-light">
                    {visibleHeaders.map((header) => (
                      <CTableHeaderCell
                        key={header}
                        className="text-nowrap cursor-pointer user-select-none"
                        onClick={() => handleSort(header)}
                        style={{
                          position: "relative",
                          fontWeight: 600,
                          fontSize: "1rem",
                          background: "#f4f6fb",
                          color: sortConfig.key === header ? "#4e54c8" : "#333",
                          borderTopLeftRadius:
                            header === visibleHeaders[0] ? "12px" : undefined,
                          borderTopRightRadius:
                            header === visibleHeaders[visibleHeaders.length - 1]
                              ? "12px"
                              : undefined,
                          letterSpacing: "0.5px",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <motion.span
                          className="d-flex align-items-center"
                          whileHover={{ scale: 1.02 }}
                        >
                          {headerTranslations[header] || header}
                          {sortConfig.key === header && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="ms-2 text-primary"
                            >
                              {sortConfig.direction === "asc" ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </motion.span>
                          )}
                        </motion.span>
                      </CTableHeaderCell>
                    ))}
                    <CTableHeaderCell
                      style={{
                        width: "48px",
                        background: "#f4f6fb",
                        borderTopRightRadius: "12px",
                      }}
                    ></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <AnimatePresence>
                    {paginatedMerchants.length === 0 ? (
                      <CTableRow>
                        <CTableDataCell
                          colSpan={visibleHeaders.length + 1}
                          className="text-center py-5 text-secondary fs-5"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Илэрц олдсонгүй
                          </motion.div>
                        </CTableDataCell>
                      </CTableRow>
                    ) : (
                      paginatedMerchants.map((merchant, rowIndex) => {
                        const globalIndex =
                          (currentPage - 1) * PAGE_SIZE + rowIndex;
                        return (
                          <React.Fragment key={globalIndex}>
                            <motion.tr
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: rowIndex * 0.05 }}
                              className={`align-middle hover:bg-light transition-colors ${selectedIndex === globalIndex ? "table-active" : ""}`}
                              style={{
                                borderLeft:
                                  selectedIndex === globalIndex
                                    ? "4px solid #4e54c8"
                                    : undefined,
                                background:
                                  selectedIndex === globalIndex
                                    ? "#f0f4ff"
                                    : undefined,
                              }}
                            >
                              {visibleHeaders.map((header) => (
                                <CTableDataCell
                                  key={header}
                                  className="text-truncate"
                                  style={{
                                    maxWidth: "180px",
                                    fontSize: "1rem",
                                  }}
                                >
                                  {renderCellValue(header, merchant[header])}
                                </CTableDataCell>
                              ))}
                              <CTableDataCell className="text-center">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  {selectedIndex === globalIndex ? (
                                    <IoClose
                                      size={22}
                                      className="cursor-pointer text-danger"
                                      onClick={() => setSelectedIndex(null)}
                                      title="Дэлгэрэнгүй хаах"
                                    />
                                  ) : (
                                    <MdMore
                                      size={22}
                                      className="cursor-pointer text-primary"
                                      onClick={() =>
                                        setSelectedIndex(globalIndex)
                                      }
                                      title="Дэлгэрэнгүй харах"
                                    />
                                  )}
                                </motion.div>
                              </CTableDataCell>
                            </motion.tr>
                            {selectedIndex === globalIndex && (
                              <motion.tr
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-light"
                              >
                                <CTableDataCell
                                  colSpan={headers.length + 1}
                                  className="p-4"
                                >
                                  <div className="row g-3">
                                    {headers.map((header) => (
                                      <motion.div
                                        key={header}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="col-12 col-md-6 d-flex justify-content-between align-items-center border-bottom py-2"
                                      >
                                        <span className="fw-semibold text-secondary">
                                          {headerTranslations[header] || header}
                                          :
                                        </span>
                                        <span className="ms-2 text-dark">
                                          {renderCellValue(
                                            header,
                                            merchant[header],
                                          )}
                                        </span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </CTableDataCell>
                              </motion.tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </AnimatePresence>
                </CTableBody>
              </CTable>
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CPagination align="center" className="mt-4">
                    <CPaginationItem
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Өмнөх
                    </CPaginationItem>
                    {Array.from({ length: totalPages }, (_, idx) => (
                      <CPaginationItem
                        key={idx + 1}
                        active={currentPage === idx + 1}
                        onClick={() => setCurrentPage(idx + 1)}
                      >
                        {idx + 1}
                      </CPaginationItem>
                    ))}
                    <CPaginationItem
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Дараах
                    </CPaginationItem>
                  </CPagination>
                </motion.div>
              )}
            </div>
          </CCardBody>
        </CCard>
      </motion.div>
      <style>
        {`
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .cursor-pointer {
            cursor: pointer;
          }
          .hover\\:bg-light:hover {
            background-color: #f8f9fa;
          }
          .transition-colors {
            transition: all 0.2s ease;
          }
          .table-active {
            background-color: #f0f4ff !important;
          }
          .rounded-pill {
            border-radius: 50rem !important;
          }
          .rounded-4 {
            border-radius: 1rem !important;
          }
        `}
      </style>
    </CContainer>
  );
};

export default GetMerchants;
