import React, { useEffect, useState } from "react";
import {
  CAlert,
  CContainer,
  CSpinner,
  CFormInput,
  CBadge,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTooltip,
  CInputGroup,
  CCol,
  CCollapse,
  CRow,
  CButtonGroup,
  CFormLabel,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "src/assets/images/marker.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import {
  FaSearch,
  FaSync,
  FaEllipsisH,
  FaMapMarkerAlt,
  FaPhone,
  FaRegBuilding,
  FaIdCard,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [24, 24], // Slightly larger icons
  shadowSize: [16, 16],
});

const TerminalMap = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [terminalIdSearch, setTerminalIdSearch] = useState(""); // Added terminal ID search
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapView, setMapView] = useState(false); // Toggle between map and table view

  const [regNo, setRegNo] = useState("");
  const [secondResponse, setSecondResponse] = useState(null);
  const [response, setResponse] = useState(null);
  const [visibleA, setVisibleA] = useState(false);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Responsive
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Enhanced Leaflet marker icon
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
    shadowUrl: markerShadow,
    shadowSize: [16, 16],
    shadowAnchor: [8, 16],
  });

  const fetchLocations = async () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userId");
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.majorsoft.mn/api/terminalMap?userId=${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setLocations(res.data);
      setFilteredLocations(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setVisible(true);
      }
      console.error("Алдаа:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Enhanced search filter with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = locations.filter((loc) => {
        const matchesSearch = Object.values(loc).some((val) =>
          val?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        );
        const matchesTerminalId = terminalIdSearch
          ? loc.terminalId.toString().includes(terminalIdSearch)
          : true;
        return matchesSearch && matchesTerminalId;
      });
      setFilteredLocations(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, terminalIdSearch, locations]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchLocations();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleMoreClick = (location) => {
    setSelectedLocation(
      selectedLocation?.terminalId === location.terminalId ? null : location,
    );
  };

  // TinCode functions
  const handleInputChange = (event) => {
    setRegNo(event.target.value);
  };

  const handleCheckUser = () => {
    handleCheck(regNo);
  };

  const handleHideResults = () => {
    setVisibleA(false);
  };

  const handleCheck = async (regValue) => {
    const apiUrl = `https://api.ebarimt.mn/api/info/check/getTinInfo?regNo=${regValue}`;
    try {
      const apiResponse = await fetch(apiUrl);
      const apiData = await apiResponse.json();
      setResponse(apiData);
      setError(null);
      const tin = apiData?.data;
      if (tin) {
        const secondApiUrl = `https://api.ebarimt.mn/api/info/check/getInfo?tin=${tin}`;
        const secondApiResponse = await fetch(secondApiUrl);
        const secondApiData = await secondApiResponse.json();
        setSecondResponse(secondApiData);
      } else {
        setSecondResponse(null);
      }
      setVisibleA(true);
    } catch (err) {
      setResponse(null);
      setSecondResponse(null);
      setError(err.toString());
    }
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLocations.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

  // Helper to үүсгэх pagination items with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("left-ellipsis");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push("right-ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CSpinner color="primary" style={{ width: 60, height: 60 }} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-muted"
        >
          Мэдээлэл ачаалж байна...
        </motion.p>
      </div>
    );
  }

  return (
    <CContainer fluid>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CAlert
          color="warning"
          visible={visible}
          closeButton
          onShowChange={setVisible}
          className="rounded-4 shadow-sm"
        >
          <strong>Анхааруулга!</strong> Хэрэглэгчээр нэвтрээгүй байна уу?{" "}
          <a href="#/login" className="alert-link">
            Нэвтрэх
          </a>
        </CAlert>

        {/* MAIN CARD */}
        <CCard className="shadow-lg border-0 mb-4 rounded-4">
          <CCardHeader className="bg-white border-bottom-0 py-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <motion.div
                className="d-flex align-items-center"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="mb-0 text-primary fw-bold">
                  <span className="me-2">Терминал байршил</span>
                  <CBadge color="info" className="fs-6 rounded-pill">
                    {filteredLocations.length}
                  </CBadge>
                </h4>
              </motion.div>

              <div className="d-flex gap-3 align-items-center flex-wrap">
                <div
                  className="position-relative"
                  style={{ width: isMobile ? "100%" : "300px" }}
                >
                  <CFormInput
                    placeholder="Хайх (нэр, рег гэх мэт)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pe-5 shadow-sm"
                    style={{
                      minWidth: 180,
                      borderRadius: 24,
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow =
                        "0 0 0 0.25rem rgba(78, 84, 200, 0.25)";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = "";
                    }}
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

                {/* Terminal ID Search Field */}
                <div
                  className="position-relative"
                  style={{ width: isMobile ? "100%" : "200px" }}
                >
                  <CFormInput
                    placeholder="Terminal ID хайх..."
                    value={terminalIdSearch}
                    onChange={(e) => setTerminalIdSearch(e.target.value)}
                    className="pe-5 shadow-sm"
                    style={{
                      minWidth: 150,
                      borderRadius: 24,
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow =
                        "0 0 0 0.25rem rgba(78, 84, 200, 0.25)";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = "";
                    }}
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

                <CButtonGroup>
                  <CTooltip content="Жагсаалт/Газрын зураг">
                    <CButton
                      color={mapView ? "light" : "primary"}
                      className="shadow-sm"
                      onClick={() => setMapView(!mapView)}
                    >
                      <FaMapMarkerAlt />
                    </CButton>
                  </CTooltip>

                  <CTooltip content="Шинэчлэх">
                    <CButton
                      color="light"
                      className={`shadow-sm ${isRefreshing ? "spin" : ""}`}
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                    >
                      <FaSync />
                    </CButton>
                  </CTooltip>
                </CButtonGroup>
              </div>
            </div>
          </CCardHeader>

          <CCardBody className="p-3">
            <AnimatePresence mode="wait">
              {!mapView ? (
                <motion.div
                  key="table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Table */}
                  <CTable hover responsive className="align-middle">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>
                          <FaCalendarAlt className="me-2" />
                          ID
                        </CTableHeaderCell>
                        <CTableHeaderCell>
                          <FaRegBuilding className="me-2" />
                          Бизнесийн нэр
                        </CTableHeaderCell>
                        <CTableHeaderCell>
                          <FaIdCard className="me-2" />
                          Регистр
                        </CTableHeaderCell>
                        <CTableHeaderCell>
                          <FaPhone className="me-2" />
                          Утас
                        </CTableHeaderCell>
                        <CTableHeaderCell></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {currentItems.map((location) => (
                        <React.Fragment key={location.terminalId}>
                          <CTableRow
                            className={
                              selectedLocation?.terminalId ===
                              location.terminalId
                                ? "table-active"
                                : ""
                            }
                          >
                            <CTableDataCell>
                              {location.terminalId}
                            </CTableDataCell>
                            <CTableDataCell>
                              {location.businessName}
                            </CTableDataCell>
                            <CTableDataCell>
                              {location.registerNo}
                            </CTableDataCell>
                            <CTableDataCell>{location.phone1}</CTableDataCell>
                            <CTableDataCell
                              className="text-center"
                              style={{ width: 48 }}
                            >
                              <CButton
                                color="light"
                                size="sm"
                                onClick={() => handleMoreClick(location)}
                                className="rounded-circle"
                              >
                                <FaEllipsisH />
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                          {/* Collapse row */}
                          <CTableRow>
                            <CTableDataCell colSpan={5} className="p-0">
                              <CCollapse
                                visible={
                                  selectedLocation?.terminalId ===
                                  location.terminalId
                                }
                              >
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="p-4 rounded-3 m-2"
                                >
                                  <h6 className="mb-3 text-primary">
                                    Дэлгэрэнгүй мэдээлэл:
                                  </h6>
                                  <div className="row g-4">
                                    <div className="col-md-4">
                                      <div className="p-3 bg-[#333] rounded-3 shadow-sm">
                                        <strong>Entity Name:</strong>
                                        <br />
                                        {location.entityName}
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="p-3 bg-[#333] rounded-3 shadow-sm">
                                        <strong>Phone2:</strong>
                                        <br />
                                        {location.phone2 || "-"}
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="p-3 bg-black/80 rounded-3 shadow-sm">
                                        <strong>Лицензийн хугацаа:</strong>
                                        <br />
                                        {location.licenseExpireDate}
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="p-3 bg-[#333] rounded-3 shadow-sm">
                                        <strong>Координат:</strong>
                                        <br />
                                        {location.locationLat},{" "}
                                        {location.locationLng}
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="p-3 bg-[#333] rounded-3 shadow-sm">
                                        <strong>Бүртгүүлсэн огноо:</strong>
                                        <br />
                                        {location.createDate}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </CCollapse>
                            </CTableDataCell>
                          </CTableRow>
                        </React.Fragment>
                      ))}
                    </CTableBody>
                  </CTable>

                  {/* Pagination */}
                  <div className="d-flex justify-content-center mt-4">
                    <CPagination
                      aria-label="Page navigation"
                      className="shadow-sm"
                    >
                      {/* First */}
                      <CPaginationItem
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                      >
                        First
                      </CPaginationItem>

                      {/* Prev */}
                      <CPaginationItem
                        aria-label="Previous"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                      >
                        &laquo;
                      </CPaginationItem>

                      {getPageNumbers().map((item, idx) =>
                        typeof item === "number" ? (
                          <CPaginationItem
                            key={idx}
                            active={currentPage === item}
                            onClick={() => setCurrentPage(item)}
                          >
                            {item}
                          </CPaginationItem>
                        ) : (
                          <CPaginationItem key={idx} disabled>
                            &hellip;
                          </CPaginationItem>
                        ),
                      )}

                      {/* Next */}
                      <CPaginationItem
                        aria-label="Next"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                      >
                        &raquo;
                      </CPaginationItem>

                      {/* Last */}
                      <CPaginationItem
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        Last
                      </CPaginationItem>
                    </CPagination>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4"
                  style={{ height: "70vh", width: "100%" }}
                >
                  <MapContainer
                    center={[47, 106]}
                    zoom={6}
                    style={{ height: "100%", width: "100%" }}
                    className="rounded-4 shadow-sm"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap"
                    />
                    {filteredLocations.map((location) => (
                      <Marker
                        key={location.terminalId}
                        position={[location.locationLat, location.locationLng]}
                        icon={customIcon}
                      >
                        <Popup>
                          <div className="p-2">
                            <h6 className="mb-2">{location.businessName}</h6>
                            <p className="mb-1">{location.entityName}</p>
                            <p className="mb-1">✆ {location.phone1}</p>
                            {location.phone2 && (
                              <p className="mb-1">✆ {location.phone2}</p>
                            )}
                            <p className="mb-1">® {location.registerNo}</p>
                            <p className="mb-0 text-muted">
                              {location.createDate}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </CCardBody>
        </CCard>

        {/* TinCode CARD */}
        <CCard className="shadow-lg border-0 mb-4 rounded-4">
          <CCardHeader className="bg-white border-bottom-0 py-3">
            <h5 className="mb-0">TinCode & Merchant names</h5>
          </CCardHeader>
          <CCardBody>
            <CCol xs={12}>
              <CInputGroup className="mb-3 shadow-sm rounded-pill overflow-hidden">
                <CFormInput
                  className="border-0 ps-4"
                  type="text"
                  placeholder="Регистерийн дугаар"
                  value={regNo}
                  onChange={handleInputChange}
                />
                <CButtonGroup>
                  <CButton color="primary" onClick={handleCheckUser}>
                    Шалгах
                  </CButton>
                  <CButton color="secondary" onClick={handleHideResults}>
                    Хураах
                  </CButton>
                </CButtonGroup>
              </CInputGroup>
            </CCol>

            <AnimatePresence>
              {visibleA && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <CCol xs={12}>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="text"
                        placeholder="Tin Code"
                        value={response?.data || ""}
                        readOnly
                        className="bg-light"
                      />
                      <CFormInput
                        type="text"
                        placeholder="Merchant Name"
                        value={secondResponse?.data?.name || ""}
                        readOnly
                        className="bg-light"
                      />
                    </CInputGroup>
                  </CCol>

                  <CCol xs={12}>
                    <div className="bg-light p-4 rounded-4">
                      <h6 className="mb-3">API Хариу:</h6>
                      <div className="mb-4">
                        <p className="mb-2 text-primary">Анхны API:</p>
                        <pre className="bg-white p-3 rounded">
                          {response
                            ? JSON.stringify(response, null, 2)
                            : "No data"}
                        </pre>
                      </div>
                      <div>
                        <p className="mb-2 text-primary">Хоёр дахь API:</p>
                        <pre className="bg-white p-3 rounded">
                          {secondResponse
                            ? JSON.stringify(secondResponse, null, 2)
                            : "No data"}
                        </pre>
                      </div>
                    </div>
                  </CCol>
                </motion.div>
              )}
            </AnimatePresence>
          </CCardBody>
        </CCard>
      </motion.div>

      {/* Styles */}
      <style>
        {`
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .leaflet-container {
            font-family: inherit;
          }
          
          .leaflet-popup-content-wrapper {
            border-radius: 12px;
          }
          
          .leaflet-popup-content {
            margin: 0;
          }
        `}
      </style>
    </CContainer>
  );
};

export default TerminalMap;
