import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "src/assets/images/marker.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  CAlert,
  CContainer,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CLink,
  CSpinner,
  CButtonGroup,
  CButton,
  CFormInput,
  CCol,
  CCollapse,
  CInputGroup,
  CFormLabel,
  CRow,
  CCard,
  CCardBody,
} from "@coreui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import TerminalTable from "./TerminalTable";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [20, 20],
  shadowSize: [12, 12],
});

const TerminalMap = () => {
  const [locations, setLocations] = useState([]);
  const [regNo, setRegNo] = useState("");
  const [secondResponse, setSecondResponse] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleA, setVisibleA] = useState(false);

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [20, 20],
    iconAnchor: [21, 21],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,
    shadowSize: [12, 12],
  });

  useEffect(() => {
    const fetchLocations = async () => {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userId");
      console.log("userid:", userid);
      try {
        const response = await axios.get(
          `https://api.majorsoft.mn/api/terminalMap?userId=${userid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        console.log("response:", response.data);
        setLocations(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setVisible(true);
        }
        console.error("erorrrrrr:", error);
      }
    };
    if (loading) {
      fetchLocations();
    }
  }, [loading]);

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
    const apiOptions = {
      method: "GET",
      headers: { Accept: "application/json" },
    };

    try {
      const apiResponse = await fetch(apiUrl, apiOptions);
      const apiData = await apiResponse.json();
      setResponse(apiData);
      setError(null);

      const tin = apiData?.data;

      if (tin) {
        const secondApiUrl = `https://api.ebarimt.mn/api/info/check/getInfo?tin=${tin}`;
        const secondApiOptions = {
          method: "GET",
          headers: { Accept: "application/json" },
        };

        const secondApiResponse = await fetch(secondApiUrl, secondApiOptions);
        const secondApiData = await secondApiResponse.json();

        setSecondResponse(secondApiData);
      } else {
        setSecondResponse(null);
      }

      setVisibleA(true);
    } catch (error) {
      setResponse(null);
      setSecondResponse(null);
      setError(error.toString());
      // setVisibleA(false);
    }
  };

  if (loading) {
    return <CSpinner color="primary" />;
  }
  return (
    <CContainer>
      <CAlert
        color="warning"
        visible={visible}
        closeButton
        onShowChange={setVisible}
      >
        <strong>Анхааруулга!</strong> Хэрэглэгчээр нэвтрээгүй байна үү?{" "}
        <CLink href="#/login">Нэвтрэх</CLink>
      </CAlert>
      <CAccordion activeItemKey={1} alwaysOpen={true}>
        <TerminalTable data={locations} />

        <CAccordionItem itemKey={1}>
          <CAccordionHeader>Терминал байршил (Terminal Map)</CAccordionHeader>
          <CAccordionBody>
            <MapContainer
              center={[47, 106]}
              zoom={6}
              style={{ height: "80vh", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {locations.map((location) => (
                <Marker
                  key={location.terminalId}
                  position={[location.locationLat, location.locationLng]}
                  icon={customIcon}
                >
                  <Popup>
                    <strong>{location.businessName}</strong>
                    <br />
                    {location.entityName}
                    <br />✆{location.phone1},{location.phone2}
                    <br />®{location.registerNo}
                    <br />
                    {location.createDate}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </CAccordionBody>
        </CAccordionItem>
        <br />
        {/* <CAccordionItem itemKey={2} alwaysOpen={true}>
          <CAccordionHeader>
            Салбарын мэдээлэл (Terminal table)
          </CAccordionHeader>
          <CAccordionBody>
            <TerminalTable data={locations} />
          </CAccordionBody>
        </CAccordionItem> */}

        <CAccordionItem itemKey={3} alwaysOpen={true}>
          <CAccordionHeader>TinCode & MerchantName</CAccordionHeader>
          <CAccordionBody>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>TinCode & Merchant names</CAccordionHeader>
              <CAccordionBody>
                <CCol xs="auto">
                  <CFormLabel
                    className="visually-hidden"
                    htmlFor="autoSizingInput"
                  >
                    Цахим баримт 3.0 TIN code ба ТТД Нэр авах
                  </CFormLabel>
                </CCol>
                <CCol xs={12}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      className="reg"
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
                        value={response?.data || ""}
                        readOnly
                      />
                      <CFormInput
                        type="text"
                        placeholder="Merchant Name"
                        aria-label="readonly input example"
                        value={secondResponse?.data?.name || ""}
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
                            <pre>
                              {response
                                ? JSON.stringify(response, null, 2)
                                : "No data"}
                            </pre>
                          </CCardBody>
                          <CCardBody>
                            <div className="result">
                              Хоёр дахь API-ийн хариу:
                            </div>
                            <pre>
                              {secondResponse
                                ? JSON.stringify(secondResponse, null, 2)
                                : "No data"}
                            </pre>
                          </CCardBody>
                        </CCard>
                      </CCollapse>
                    </CCol>
                  </CRow>
                </CCol>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CContainer>
  );
};

export default TerminalMap;
