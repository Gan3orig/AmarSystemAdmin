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
  CCard,
  CCardHeader,
  CCardBody,
  CFormInput,
  CInputGroup,
  CPagination,
  CPaginationItem,
  CBadge,
  CTooltip,
  CAlert,
} from "@coreui/react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import { FaSearch, FaSync, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { MdMore } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import dayjs from "dayjs";

const PAGE_SIZE = 10;

const QpayMerchantsPage = () => {
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

  // Resize listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch merchants
  const fetchMerchants = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        "https://api.majorsoft.mn/api/QPay/merchantList",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setMerchants(res.data.data);
      setFilteredMerchants(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Мерчантын мэдээлэл татахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  // Debounced search
  useEffect(() => {
    const id = setTimeout(() => {
      const results = merchants.filter((merchant) =>
        Object.values(merchant).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setFilteredMerchants(results);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(id);
  }, [searchTerm, merchants]);

  // Refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchMerchants();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });

    const sorted = [...filteredMerchants].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredMerchants(sorted);
  };

  // Render cell
  const renderCellValue = (key, value, row) => {
    // Fallback name for PERSON type
    if (key === "name" && (!value || value === "") && row.type === "PERSON") {
      return `${row.owner_first_name || ""} ${row.owner_last_name || ""}`.trim();
    }

    if (typeof value === "string" && /date|time/i.test(key)) {
      const formatted = dayjs(value);
      return formatted.isValid() ? formatted.format("YYYY-MM-DD HH:mm") : value;
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
    if (key === "phone") {
      return value ? (
        <a href={`tel:${value}`} className="text-primary text-decoration-none">
          {value}
        </a>
      ) : (
        ""
      );
    }
    return value !== undefined && value !== null ? value.toString() : "";
  };

  // Header translations
  const headerTranslations = {
    id: "ID",
    register_number: "Бүртгэлийн №",
    name: "Нэр",
    owner_first_name: "Эцэг/Эх нэр",
    owner_last_name: "Өөрийн нэр",
    mcc_code: "MCC код",
    city: "Хот",
    district: "Дүүрэг",
    address: "Хаяг",
    phone: "Утас",
    email: "И-мэйл",
  };

  const headers = merchants.length > 0 ? Object.keys(merchants[0]) : [];
  const visibleHeaders = isMobile ? ["name", "phone"] : headers.slice(0, 5);

  // Pagination
  const totalPages = Math.ceil(filteredMerchants.length / PAGE_SIZE);
  const paginatedMerchants = filteredMerchants.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <CSpinner color="primary" style={{ width: 60, height: 60 }} />
        <div className="mt-3 text-secondary fs-5">
          Мэдээлэл ачааллаж байна...
        </div>
      </div>
    );
  }

  return (
    <CContainer fluid>
      <CCard className="shadow-lg border-0 mb-4 rounded-4">
        <CCardHeader className="bg-white border-bottom-0 py-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <h4 className="mb-0 text-primary fw-bold">
              <span className="me-2">QPay Merchants</span>
              <CBadge color="info" className="fs-6 rounded-pill">
                {filteredMerchants.length}
              </CBadge>
            </h4>
            <div className="d-flex gap-3 align-items-center flex-wrap">
              <div
                className="position-relative"
                style={{ width: isMobile ? "100%" : "300px" }}
              >
                <CFormInput
                  placeholder="Хайх..."
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
              <CTooltip content="Шинэчлэх">
                <CButton
                  color="light"
                  className={`shadow-sm rounded-circle d-flex align-items-center justify-content-center ${isRefreshing ? "spin" : ""}`}
                  onClick={handleRefresh}
                  style={{ width: 40, height: 40 }}
                  disabled={isRefreshing}
                >
                  <FaSync />
                </CButton>
              </CTooltip>
              <Link to="/quick-qr-code">
                <CButton
                  color="primary"
                  className="d-flex align-items-center gap-2 rounded-pill shadow-sm"
                >
                  <CIcon icon={cilPlus} /> Merchant нэмэх
                </CButton>
              </Link>
            </div>
          </div>
        </CCardHeader>

        {error && (
          <CAlert color="danger" className="mx-3 mt-3">
            {error}
          </CAlert>
        )}

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
                      <span className="d-flex align-items-center">
                        {headerTranslations[header] || header}
                        {sortConfig.key === header && (
                          <span className="ms-2 text-primary">
                            {sortConfig.direction === "asc" ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </span>
                        )}
                      </span>
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
                {paginatedMerchants.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell
                      colSpan={visibleHeaders.length + 1}
                      className="text-center py-5 text-secondary fs-5"
                    >
                      Илэрц олдсонгүй
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  paginatedMerchants.map((merchant, rowIndex) => {
                    const globalIndex =
                      (currentPage - 1) * PAGE_SIZE + rowIndex;
                    return (
                      <React.Fragment key={globalIndex}>
                        <CTableRow
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
                              style={{ maxWidth: "180px", fontSize: "1rem" }}
                            >
                              {renderCellValue(
                                header,
                                merchant[header],
                                merchant,
                              )}
                            </CTableDataCell>
                          ))}
                          <CTableDataCell className="text-center">
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
                                onClick={() => setSelectedIndex(globalIndex)}
                                title="Дэлгэрэнгүй харах"
                              />
                            )}
                          </CTableDataCell>
                        </CTableRow>
                        {selectedIndex === globalIndex && (
                          <CTableRow className="bg-light">
                            <CTableDataCell
                              colSpan={headers.length + 1}
                              className="p-4"
                            >
                              <div className="row g-3">
                                {headers.map((header) => (
                                  <div
                                    key={header}
                                    className="col-12 col-md-6 d-flex justify-content-between align-items-center border-bottom py-2"
                                  >
                                    <span className="fw-semibold text-secondary">
                                      {headerTranslations[header] || header}:
                                    </span>
                                    <span className="ms-2 text-white">
                                      {renderCellValue(
                                        header,
                                        merchant[header],
                                        merchant,
                                      )}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </CTableBody>
            </CTable>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-end align-items-center px-3 py-3">
                <CPagination align="end" size="sm">
                  <CPaginationItem
                    aria-label="Өмнөх"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Өмнөх
                  </CPaginationItem>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <CPaginationItem
                      key={idx}
                      active={currentPage === idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    aria-label="Дараах"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                  >
                    Дараах
                  </CPaginationItem>
                </CPagination>
              </div>
            )}
          </div>
        </CCardBody>
      </CCard>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg);} }
        .cursor-pointer { cursor: pointer; }
        .hover\\:bg-light:hover { background-color: #f8f9fa; }
        .transition-colors { transition: all 0.2s ease; }
        .table-active { background-color: #f0f4ff !important; }
      `}</style>
    </CContainer>
  );
};

export default QpayMerchantsPage;
