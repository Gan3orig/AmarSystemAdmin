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
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

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
        <CAccordionItem itemKey={2} alwaysOpen={true}>
          <CAccordionHeader>
            Салбарын мэдээлэл (Terminal table)
          </CAccordionHeader>
          <CAccordionBody>
            <TerminalTable data={locations} />
          </CAccordionBody>
        </CAccordionItem>

        <CAccordionItem itemKey={3} alwaysOpen={true}>
          <CAccordionHeader>TinCode & MerchantName</CAccordionHeader>
          <CAccordionBody>
            <Link to="/admin/merchantTinCode">TinCode & MerchantName</Link>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CContainer>
  );
};

export default TerminalMap;
