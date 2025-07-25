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
} from "@coreui/react";
import axios from "axios";
import dayjs from "dayjs";
import TerminalsMobileTable from "./TerminalsMobileTable";
import {
  FaSearch,
  FaDownload,
  FaSync,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdMore } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const PAGE_SIZE = 10;

const GetTerminals = () => {
  const [terminals, setTerminals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTerminals, setFilteredTerminals] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // Responsive check
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchTerminals = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.majorsoft.mn/api/adminReports/terminals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setTerminals(response.data.data);
      setFilteredTerminals(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Терминалын мэдээлэл татахад алдаа гарлаа:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerminals();
  }, []);

  useEffect(() => {
    const filtered = terminals.filter((terminal) =>
      Object.values(terminal).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
    setFilteredTerminals(filtered);
    setCurrentPage(1);
  }, [searchTerm, terminals]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchTerminals();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredTerminals].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredTerminals(sortedData);
  };

  const exportToCSV = () => {
    const headers = Object.keys(terminals[0] || {}).join(",");
    const rows = filteredTerminals
      .map((terminal) =>
        Object.values(terminal)
          .map((value) => (typeof value === "string" ? `"${value}"` : value))
          .join(","),
      )
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "terminals.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <CSpinner color="primary" style={{ width: 60, height: 60 }} />
        <div className="mt-3 text-secondary fs-5">
          Терминалын мэдээлэл ачааллаж байна...
        </div>
      </div>
    );
  }

  const headers = terminals.length > 0 ? Object.keys(terminals[0]) : [];
  const visibleHeaders = headers.slice(0, 5);

  const renderCellValue = (key, value) => {
    if (key === "isConnect" || key === "isConnected") {
      return (
        <CBadge color={value ? "success" : "danger"} className="px-3 py-2 fs-6">
          {value ? "Холбогдсон" : "Холбогдоогүй"}
        </CBadge>
      );
    }

    if (typeof value === "string" && /date/i.test(key)) {
      const formatted = dayjs(value);
      return formatted.isValid() ? formatted.format("YYYY-MM-DD HH:mm") : value;
    }

    if (value !== null && typeof value === "object") {
      return "";
    }

    return value !== undefined && value !== null ? value.toString() : "";
  };

  const headerTranslations = {
    terminalId: "Терминал ID",
    terminalName: "Терминал нэр",
    branchId: "Салбар ID",
    isConnect: "Холболт",
    isConnected: "Холболт",
    userConfirm: "Баталгаажуулсан хэрэглэгч",
    confirmDate: "Баталгаажуулсан огноо",
    appName: "Апп нэр",
    appVersion: "Апп хувилбар",
    localIP: "Дотоод IP",
    publicIP: "Гаднах IP",
    macAddress: "MAC хаяг",
    posApiType: "POS API төрөл",
    tin: "НӨАТ дугаар",
    posId: "POS ID",
    posNo: "POS дугаар",
    version: "Верс",
    operatorCpny: "Оператор компани",
    lastSentDate: "Сүүлд илгээсэн огноо",
    lotteryCount: "Сугалааны тоо",
    customerDisplay: "Хэрэглэгчийн дэлгэц",
    port: "Порт",
    paperSize: "Цаасны хэмжээ",
    cashPrinter: "Касс принтер",
    createUserId: "Үүсгэсэн хэрэглэгч",
    createDate: "Үүсгэсэн огноо",
    color: "Өнгө",
  };

  // Pagination
  const totalPages = Math.ceil(filteredTerminals.length / PAGE_SIZE);
  const paginatedTerminals = filteredTerminals.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <CContainer fluid>
      <CCard className="shadow-lg border-0 mb-4">
        <CCardHeader className="bg-white border-bottom-0 py-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <h4 className="mb-0 text-primary fw-bold">
              <span className="me-2">Терминалын жагсаалт</span>
              <CBadge color="info" className="fs-6">
                {filteredTerminals.length}
              </CBadge>
            </h4>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              <div
                className="position-relative"
                style={{ width: isMobile ? "100%" : "300px" }}
              >
                <CFormInput
                  placeholder="Хайх (ID, нэр, салбар гэх мэт)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pe-5 shadow-sm"
                  style={{ minWidth: 180, borderRadius: 24 }}
                  autoFocus
                />
                <FaSearch
                  className="position-absolute"
                  style={{
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: 0.5,
                    pointerEvents: "none",
                  }}
                  size={18}
                />
              </div>
              <CTooltip content="Шинэчлэх">
                <CButton
                  color="light"
                  className={`shadow-sm d-flex align-items-center justify-content-center ${isRefreshing ? "spin" : ""}`}
                  onClick={handleRefresh}
                  style={{ borderRadius: "50%", width: 40, height: 40 }}
                  disabled={isRefreshing}
                >
                  <FaSync />
                </CButton>
              </CTooltip>
              {/* <CTooltip content="CSV татах">
                <CButton
                  color="success"
                  className="shadow-sm d-flex align-items-center justify-content-center"
                  onClick={exportToCSV}
                  style={{ borderRadius: "50%", width: 40, height: 40 }}
                >
                  <FaDownload />
                </CButton>
              </CTooltip> */}
            </div>
          </div>
        </CCardHeader>

        <CCardBody className="p-0">
          {/* {isMobile ? (
            <div>
              <TerminalsMobileTable terminals={filteredTerminals} />
            </div>
          ) : ( */}
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
                        borderTopLeftRadius:
                          header === visibleHeaders[0] ? "12px" : undefined,
                        borderTopRightRadius:
                          header === visibleHeaders[visibleHeaders.length - 1]
                            ? "12px"
                            : undefined,
                        letterSpacing: "0.5px",
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
                {paginatedTerminals.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell
                      colSpan={visibleHeaders.length + 1}
                      className="text-center py-5 text-secondary fs-5"
                    >
                      Илэрц олдсонгүй.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  paginatedTerminals.map((terminal, rowIndex) => {
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
                              {renderCellValue(header, terminal[header])}
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
                                    <span className="ms-2 text-dark">
                                      {renderCellValue(
                                        header,
                                        terminal[header],
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
                    &laquo;
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
                    &raquo;
                  </CPaginationItem>
                </CPagination>
              </div>
            )}
          </div>
          {/* )} */}
        </CCardBody>
      </CCard>

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
            transition: background-color 0.2s ease;
          }
          .table-active {
            background-color: #f0f4ff !important;
          }
        `}
      </style>
    </CContainer>
  );
};

export default GetTerminals;
