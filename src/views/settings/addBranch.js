/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CInputGroup,
  CFormFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilAirplay, cilLocationPin } from "@coreui/icons";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import PropTypes from "prop-types";
import uploadPhoto from "../settings/photos/upload.png";
import { useNavigate } from "react-router-dom";
import "./main.css";
import "./branch";
import { logo } from "src/assets/brand/logo";
const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41], // Adjust as needed
});

// Geocode the zip code to latitude and longitude
const geocodeZipCode = async (zipCode) => {
  const url = `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&format=json&addressdetails=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return [parseFloat(lat), parseFloat(lon)];
    }
    return null;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};
const LocationMarker = ({
  setPosition,
  setNewBranchLocationLat,
  setNewBranchLocationLng,
}) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      setPosition([lat, lng]);
      setNewBranchLocationLat(lat);
      setNewBranchLocationLng(lng);
    },
  });

  return markerPosition ? (
    <Marker position={markerPosition} icon={defaultIcon}>
      <Popup>You selected this location</Popup>
    </Marker>
  ) : null;
};
// Add PropTypes validation
LocationMarker.propTypes = {
  setPosition: PropTypes.func.isRequired,
  setNewBranchLocationLat: PropTypes.func.isRequired,
  setNewBranchLocationLng: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/prop-types
const AddBranch = ({ visible, setVisible, edit, editBranch, refresh }) => {
  const [branches, setBranches] = useState([]);
  const [subBranches, setSubBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubBranch, setSelectedSubBranch] = useState("");
  const [newBranchName, setNewBranchName] = useState("");
  const [newBranchLocationLat, setNewBranchLocationLat] = useState("");
  const [newBranchLocationLng, setNewBranchLocationLng] = useState("");
  const [newBranchContact, setNewBranchContact] = useState("");
  const [newBranchAddress, setNewBranchAddress] = useState("");
  const [newBranchType, setNewBranchType] = useState("");
  const [branchPosition, setBranchPosition] = useState([51.505, -0.09]);
  const [subBranchPosition, setSubBranchPosition] = useState([51.505, -0.09]);
  const [showMapModal, setShowMapModal] = useState(false);
  const navigate = useNavigate();
  const [filepath, setFilePath] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editData, setEditData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [validated, setValidated] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  // Fetch branch data from API
  useEffect(() => {
    if (editBranch) {
      setEditData(editBranch);
    }

    //brunch uusgeh
    const fetchBranches = async () => {
      const url = "https://api.ebarimt.mn/api/info/check/getBranchInfo";
      const options = {
        method: "GET",
        headers: { Accept: "application/json" },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const dataArray = Array.isArray(data) ? data : data.data || [];

        if (Array.isArray(dataArray)) {
          const groupedBranches = dataArray.reduce((acc, curr) => {
            const {
              branchName,
              branchCode,
              subBranchCode,
              subBranchName,
              latitude,
              longitude,
              zipCode,
            } = curr;
            if (!acc[branchCode]) {
              acc[branchCode] = {
                branchCode,
                branchName,
                subBranchCode,
                location: { latitude, longitude },
                zipCode,
                subBranches: [],
              };
            }
            acc[branchCode].subBranches.push({
              subBranchCode,
              subBranchName,
              location: { latitude, longitude },
              zipCode,
            });
            return acc;
          }, {});
          setBranches(Object.values(groupedBranches));
        } else {
          console.error("Unexpected data format:", dataArray);
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };

    fetchBranches();
  }, []);
  useEffect(() => {
    if (editData) {
      const branch = branches.find((b) => b.branchCode === editData.branchCode);
      if (branch && branch.subBranches) {
        setSubBranches(branch.subBranches);
      }
    }
  }, [editData, branches]);

  const handleBranchChange = (e) => {
    const selectedBranchCode = e.target.value;
    const branch = branches.find((b) => b.branchCode === selectedBranchCode);
    if (branch && branch.subBranches) {
      setSubBranches(branch.subBranches);
      setSelectedBranch(selectedBranchCode);
    } else {
      setSubBranches([]);
    }
  };

  const handleSubBranchChange = (e) => {
    const subBranchId = e.target.value;
    setSelectedSubBranch(subBranchId);
  };
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "https://api.majorsoft.mn/api/branchService/uploadLogo",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error("Error uploading photo");
        }

        const data = await response.json();

        console.log("Upload success", data);
        const filePath = data.imageUrl;
        setFilePath(filePath);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  const handleAddBranch = async (event) => {
    event.preventDefault();


    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return; 
    }
  

    setValidated(true);
    const token = localStorage.getItem("token");
    const branchData = {
      branchId: editData.branchId,
      merchantId: editData.merchantId,
      branchName: newBranchName || editData.branchName,
      businessTypeId: newBranchType || editData.businessTypeId,
      branchCode: selectedBranch || editData.branchCode,
      subBranchCode: selectedSubBranch || editData.subBranchCode,
      locationLat: String(newBranchLocationLat) || editData.locationLat,
      locationLng: String(newBranchLocationLng) || editData.locationlng,
      phone: newBranchContact || editData.phone,
      address: newBranchAddress || editData.address,
      logoSmall: filepath || editData.logoSmall || '',
      createUserId: userId,
    };
    if (edit) {
      const formData = new FormData();
      Object.keys(branchData).forEach((key) => {
        formData.append(key, branchData[key]);
      });

      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(branchData),
      };

      try {
        const response = await fetch(
          `https://api.majorsoft.mn/api/branchService`,
          requestOptions,
        );
        const result = await response.json();

        if (result.success) {
          setVisible();
          refresh();
        }
      } catch (error) {
        console.error("Error updating branch data:", error);
      }
    } else {
      try {
        const response = await fetch(
          "https://api.majorsoft.mn/api/branchService",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(branchData),
          },
        );

        if (!response.ok) {
          const errorDetails = await response.text();
          console.error("Error creating branch service:", errorDetails);
          

          return;
        }

        const data = await response.json();
        console.log("Branch Service Created:", data);

        setVisible();
        refresh();
      } catch (error) {
        console.error("Error creating branch service:", error);
      }
    }
  };
  const handleIconClick = () => {
    setShowMapModal(true);
  };
  const handleModalClose = () => {
    setShowMapModal(false);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  if (!visible) return null;

  const positions = [branchPosition, subBranchPosition].filter(
    (pos) => pos[0] !== 51.505 && pos[1] !== -0.09,
  );

  return (
    <>
      <CCard className="w-4">
        <CCardHeader>
          {edit ? <h4>Салбар засах</h4> : <h4>Салбар нэмэх</h4>}
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleAddBranch}
          >
            <CRow>
              <CCol md={6}>
                <CRow md={4}>
                  <CFormLabel htmlFor="branchName">Салбарын нэр</CFormLabel>
                  <CFormInput
                    type="text"
                    id="branchName"
                    feedbackValid="Looks good!"
                    value={newBranchName || editData.branchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                    required
                  />
                  <CFormFeedback invalid>Салбарын нэрийг оруулна уу.</CFormFeedback> 
                </CRow>
                <CRow md={4}>
                  <CFormSelect
                    id="branchType"
                    label="Бизнес төрөл"
                    value={newBranchType || editData.businessTypeId }
                    onChange={(e) => setNewBranchType(e.target.value)}
                    feedbackValid="Looks good!"
                    required
                  >
                    <option selected="" value="" disabled="" >
                      Сонгох..
                    </option>
                    <option value="0">Дэлгүүр</option>
                    <option value="1">Ресторан</option>
                    <option value="2">Түргэн хоол</option>
                    <option value="3">Салон</option>
                    <option value="4">Эмийн сан</option>
                    <option value="5">Зочид Буудал</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Салбарын төрлийг сонгоно уу.</CFormFeedback> 
                </CRow>
              </CCol>
              <CCol md={6}>
                <CRow className="d-flex justify-content-center align-items-center">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}
                  >
                    <img
                      src={
                        editData.logoSmall
                          ? editData.logoSmall // If the logo is already present (edit mode)
                          : filepath
                            ? filepath
                            : uploadPhoto
                      }
                      alt="Branch preview"
                      className="rounded"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        document.getElementById(handleFileChange).click()
                      } // Trigger file input click
                    />
                  </div>

                  <CFormInput
                    type="file"
                    id="branchPhoto"
                    style={{ display: "none" }}
                    onChange={handlePhotoUpload} // Handle file input change
                  />

                  <CButton
                    color="primary"
                    variant="ghost"
                    onClick={() =>
                      document.getElementById("branchPhoto").click()
                    }
                    className="mt-2"
                  >
                    Лого оруулах
                  </CButton>
                </CRow>
              </CCol>
            </CRow>

            <CRow md={4}>
              <CFormSelect
                id="branchSelect"
                label="Аймаг/Хот"
                value={selectedBranch || editData?.branchCode || ""}
                onChange={handleBranchChange}
                feedbackValid="Looks good!"
                    required
              >
                <option value="" disabled>
                  Салбарын байршил сонгох
                </option>
                {branches.map((branch) => (
                  <option key={branch.branchCode} value={branch.branchCode}>
                    {branch.branchName}
                  </option>
                ))}
              </CFormSelect>
              <CFormFeedback invalid>Аймаг хотыг сонгоно уу.</CFormFeedback> 
              <CFormSelect
                id="subBranchSelect"
                label="Дүүрэг/Сум"
                value={selectedSubBranch || editData?.subBranchCode || ""}
                onChange={handleSubBranchChange}
                feedbackValid="Looks good!"
                required
              >
                <option value="" disabled>
                  Дүүрэг/Сум сонгох
                </option>
                {subBranches.map((subBranch) => (
                  <option
                    key={subBranch.subBranchCode}
                    value={subBranch.subBranchCode}
                  >
                    {subBranch.subBranchName}
                  </option>
                ))}
              </CFormSelect>
              <CFormFeedback invalid>Сум дүүргийг сонгоно уу.</CFormFeedback> 
            </CRow>
            <CRow md={4}>
              <CFormLabel htmlFor="branchAddress">Хаяг</CFormLabel>
              <CFormInput
                type="text"
                id="branchAddress"
                value={newBranchAddress || editData.address}
                onChange={(e) => setNewBranchAddress(e.target.value)}
                 feedbackValid="Looks good!"
                 required
              />
              <CFormFeedback invalid>Салбарын хаягыг оруулна уу.</CFormFeedback> 
            </CRow>
            <CRow md={4}>
              <CFormLabel htmlFor="branchLocation">Байршил</CFormLabel>
              <CInputGroup>
                <CFormInput
                  placeholder=" "
                  type="text"
                  id="branchLocation"
                  required
                  value={`${newBranchLocationLat || editData.locationLat || " "} ${newBranchLocationLng || editData.locationlng || " "}`}
                />
                <span className="input-group-text">
                  <CIcon icon={cilLocationPin} onClick={handleIconClick} />
                </span>
              </CInputGroup>
              <CFormFeedback invalid>Салбарын байршлыг оруулна уу.</CFormFeedback> 
              
            </CRow>
            <CRow md={4}>
              <CFormLabel htmlFor="branchPhoneNumber">Утасны дугаар</CFormLabel>
              <CFormInput
                type="text"
                id="branchPhoneNumber"
                pattern="^\d{8}$"
                maxLength="8"
                feedbackValid="Looks good!"
                value={newBranchContact || editData.phone}
                onChange={(e) => setNewBranchContact(e.target.value)}
                
                required
              />
              <CFormFeedback invalid>Утасны дугаар 8 оронтой тоо байх ёстой.</CFormFeedback>
            </CRow>
            <div className="d-grid gap-2">
              <CButton color="primary" onClick={handleAddBranch}>
                {edit ? "Засах" : "Нэмэх"}
              </CButton>

              <CButton color="secondary" onClick={() => setVisible(false)}>
                Хаах
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>

      {/* Map Modal */}
      <CModal size="lg" visible={showMapModal} onClose={handleModalClose}>
        <CModalHeader onClose={handleModalClose}>
          <CModalTitle>
            <CIcon icon={cilLocationPin}></CIcon> Байршил оруулах
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <MapContainer
            center={[47.92123, 106.918556]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Render existing markers */}
            {positions.map((position, idx) => (
              <Marker key={idx} position={position} icon={defaultIcon}>
                <Popup>Branch Location {idx + 1}</Popup>
              </Marker>
            ))}
            {/* Allow user to add a new marker */}
            <LocationMarker
              setPosition={setBranchPosition}
              setNewBranchLocationLat={setNewBranchLocationLat}
              setNewBranchLocationLng={setNewBranchLocationLng}
            />
          </MapContainer>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton color="primary" onClick={handleModalClose}>
              Болих
            </CButton>
            <CButton color="outline-primary" onClick={handleModalClose}>
              Хадгалах
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export default AddBranch;
