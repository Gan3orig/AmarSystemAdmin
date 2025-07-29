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
  FaChevronUp,
  FaChevronDown,
  FaFilter,
} from "react-icons/fa";
import { MdMore } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_SIZE = 10;

const UserAccounts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch users
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      setError(null);
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
      setFilteredUsers(response.data.data);
    } catch (error) {
      setError("Хэрэглэгчийн мэдээлэл татахад алдаа гарлаа");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search filter with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = users.filter((user) =>
        Object.values(user).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setFilteredUsers(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, users]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchUsers();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Sort handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sortedData);
  };

  // Render cell value
  const renderCellValue = (key, value) => {
    if (value !== null && typeof value === "object") {
      return "";
    }

    if (typeof value === "boolean") {
      return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <CBadge
            color={value ? "success" : "danger"}
            className="px-3 py-2 fs-6"
            style={{ cursor: "default" }}
          >
            {value ? "Баталгаажсан" : "Баталгаажаагүй"}
          </CBadge>
        </motion.div>
      );
    }

    if (typeof value === "string" && /date/i.test(key)) {
      const formatted = dayjs(value);
      return formatted.isValid() ? formatted.format("YYYY-MM-DD HH:mm") : value;
    }

    return value !== undefined && value !== null ? value.toString() : "";
  };

  // Header translations
  const headerTranslations = {
    userId: "Хэрэглэгч ID",
    userName: "Нэр",
    email: "И-мэйл",
    phone: "Утас",
    isConfirm: "Баталгаажсан эсэх",
    createDate: "Бүртгэсэн огноо",
    updateDate: "Шинэчилсэн огноо",
    roleId: "Role ID",
    deviceInfo: "Төхөөрөмж",
    verifyCode: "Баталгаажуулах код",
  };

  const headers = users.length > 0 ? Object.keys(users[0]) : [];
  const visibleHeaders = isMobile
    ? ["userName", "isConfirm"]
    : headers.slice(0, 5);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Loading
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
          Хэрэглэгчдийн мэдээлэл ачааллаж байна...
        </div>
      </motion.div>
    );
  }

  return (
    <CContainer fluid>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CCard className="shadow-lg border-0 mb-4 rounded-4">
          {error && (
            <CAlert color="danger" className="m-3">
              {error}
            </CAlert>
          )}

          <CCardHeader className="bg-white border-bottom-0 py-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <motion.h4
                className="mb-0 text-primary fw-bold"
                whileHover={{ scale: 1.02 }}
              >
                <span className="me-2">Хэрэглэгчийн жагсаалт</span>
                <CBadge color="info" className="fs-6">
                  {filteredUsers.length}
                </CBadge>
              </motion.h4>

              <div className="d-flex gap-2 align-items-center flex-wrap">
                <motion.div
                  className="position-relative"
                  style={{ width: isMobile ? "100%" : "300px" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <CFormInput
                    placeholder="Хайх..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pe-5 shadow-sm"
                    style={{
                      minWidth: 180,
                      borderRadius: 24,
                      transition: "all 0.2s ease",
                    }}
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
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CTooltip content="Шинэчлэх">
                    <CButton
                      color="light"
                      className={`shadow-sm d-flex align-items-center justify-content-center ${isRefreshing ? "spin" : ""}`}
                      onClick={handleRefresh}
                      style={{
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        transition: "all 0.2s ease",
                      }}
                      disabled={isRefreshing}
                    >
                      <FaSync />
                    </CButton>
                  </CTooltip>
                </motion.div>
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
                          color: "black",
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
                          whileHover={{ scale: 1.05 }}
                        >
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
                    {paginatedUsers.length === 0 ? (
                      <CTableRow>
                        <CTableDataCell
                          colSpan={visibleHeaders.length + 1}
                          className="text-center py-5 text-secondary fs-5"
                        >
                          Илэрц олдсонгүй
                        </CTableDataCell>
                      </CTableRow>
                    ) : (
                      paginatedUsers.map((user, rowIndex) => {
                        const globalIndex =
                          (currentPage - 1) * PAGE_SIZE + rowIndex;
                        return (
                          <motion.tr
                            key={globalIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`align-middle hover:bg-light transition-colors ${
                              selectedIndex === globalIndex
                                ? "table-active"
                                : ""
                            }`}
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
                                {renderCellValue(header, user[header])}
                              </CTableDataCell>
                            ))}
                            <CTableDataCell className="text-center">
                              <motion.div
                                whileHover={{ scale: 1.2 }}
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
                        );
                      })
                    )}
                  </AnimatePresence>
                </CTableBody>
              </CTable>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  className="d-flex justify-content-center align-items-center p-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CPagination align="center" className="mb-0">
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
                </motion.div>
              )}
            </div>
          </CCardBody>
        </CCard>
      </motion.div>

      {/* Styles */}
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg);} }
        .cursor-pointer { cursor: pointer; }
        .hover\\:bg-light:hover { background-color: #f8f9fa; }
        .transition-colors { transition: all 0.2s ease; }
        .table-active { background-color: #f0f4ff !important; }
        
        /* Custom Styles */
        .table-responsive {
          scrollbar-width: thin;
          scrollbar-color: #4e54c8 #f0f4ff;
        }
        
        .table-responsive::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .table-responsive::-webkit-scrollbar-track {
          background: #f0f4ff;
          border-radius: 4px;
        }
        
        .table-responsive::-webkit-scrollbar-thumb {
          background: #4e54c8;
          border-radius: 4px;
        }
        
        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #383d9e;
        }
      `}</style>
    </CContainer>
  );
};

export default UserAccounts;
