import { useState, useEffect } from 'react';
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
    CModalTitle
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilAirplay, cilLocationPin } from '@coreui/icons';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Define the default icon for markers
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
        console.error('Error fetching location data:', error);
        return null;
    }
};

// LocationMarker component handles marker placement on map
// eslint-disable-next-line react/prop-types
const LocationMarker = ({ setPosition, setNewBranchLocation }) => {
    const [markerPosition, setMarkerPosition] = useState(null);

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setMarkerPosition([lat, lng]);
            setPosition([lat, lng]);
            setNewBranchLocation(`Lat: ${lat}, Lng: ${lng}`);
        },
    });

    return markerPosition ? (
        <Marker position={markerPosition} icon={defaultIcon}>
            <Popup>You selected this location</Popup>
        </Marker>
    ) : null;
};

// AddBranch component
// eslint-disable-next-line react/prop-types
const AddBranch = ({ visible, setVisible }) => {
    const [branches, setBranches] = useState([]);
    const [subBranches, setSubBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedSubBranch, setSelectedSubBranch] = useState('');
    const [newBranchName, setNewBranchName] = useState('');
    const [newBranchLocation, setNewBranchLocation] = useState('');
    const [newBranchContact, setNewBranchContact] = useState('');
    const [newBranchType, setNewBranchType] = useState('');
    const [branchPosition, setBranchPosition] = useState([51.505, -0.09]); // Default position
    const [subBranchPosition, setSubBranchPosition] = useState([51.505, -0.09]); // Default position
    const [showMapModal, setShowMapModal] = useState(false);
    const [zipCode, setZipCode] = useState('');

    // Fetch branch data from API
    useEffect(() => {
        const fetchBranches = async () => {
            const url = 'https://api.ebarimt.mn/api/info/check/getBranchInfo';
            const options = {
                method: 'GET',
                headers: { Accept: 'application/json' },
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                const dataArray = Array.isArray(data) ? data : data.data || [];

                if (Array.isArray(dataArray)) {
                    const groupedBranches = dataArray.reduce((acc, curr) => {
                        const { branchCode, branchName, subBranchCode, subBranchName, latitude, longitude, zipCode } = curr;
                        if (!acc[branchCode]) {
                            acc[branchCode] = { branchCode, branchName, location: { latitude, longitude }, zipCode, subBranches: [] };
                        }
                        acc[branchCode].subBranches.push({ subBranchCode, subBranchName, location: { latitude, longitude }, zipCode });
                        return acc;
                    }, {});
                    setBranches(Object.values(groupedBranches));
                } else {
                    console.error('Unexpected data format:', dataArray);
                }
            } catch (error) {
                console.error('Error fetching branch data:', error);
            }
        };

        fetchBranches();
    }, []);

    // Handle branch selection
    const handleBranchChange = (event) => {
        const branchId = event.target.value;
        setSelectedBranch(branchId);
        const selectedBranchData = branches.find(branch => branch.branchCode === branchId);
        setSubBranches(selectedBranchData ? selectedBranchData.subBranches : []);
        if (selectedBranchData && selectedBranchData.location) {
            const { latitude, longitude } = selectedBranchData.location;
            setBranchPosition([latitude, longitude]);
            setNewBranchLocation(`Lat: ${latitude}, Lng: ${longitude}`);
        }
    };

    // Handle sub-branch selection
    const handleSubBranchChange = (e) => {
        const subBranchId = e.target.value;
        setSelectedSubBranch(subBranchId);
        const selectedSubBranchData = subBranches.find(subBranch => subBranch.subBranchCode === subBranchId);
        if (selectedSubBranchData && selectedSubBranchData.location) {
            const { latitude, longitude } = selectedSubBranchData.location;
            setSubBranchPosition([latitude, longitude]);
            setNewBranchLocation(`Lat: ${latitude}, Lng: ${longitude}`);
        }
    };

    // Add branch functionality
    const handleAddBranch = () => {
        if (!newBranchName || !newBranchLocation || !newBranchContact || !newBranchType) {
            alert('Please fill in all required fields.');
            return;
        }

        const newBranch = {
            branchCode: Date.now(),
            branchName: newBranchName,
            location: branchPosition,
            contact: newBranchContact,
            branchType: newBranchType,
            subBranches: []
        };

        setBranches([...branches, newBranch]);
        // Reset form fields
        setNewBranchName('');
        setNewBranchType('');
        setNewBranchLocation('');
        setNewBranchContact('');
        setSelectedBranch('');
        setSelectedSubBranch('');
        setBranchPosition([51.505, -0.09]);
        setSubBranchPosition([51.505, -0.09]);
        setZipCode('');
        setVisible(false);
    };

    // Handle zip code change and geocode
    const handleZipCodeChange = async (e) => {
        const zip = e.target.value;
        setZipCode(zip);
        if (zip.length === 5) {
            const location = await geocodeZipCode(zip);
            if (location) {
                setBranchPosition(location);
                setSubBranchPosition(location);
                setNewBranchLocation(`Lat: ${location[0]}, Lng: ${location[1]}`);
            } else {
                alert('Location not found for this zip code.');
            }
        }
    };

    const handleIconClick = () => {
        setShowMapModal(true);
    };

    const handleModalClose = () => {
        setShowMapModal(false);
    };

    if (!visible) return null;

    // Define positions to display multiple markers
    const positions = [branchPosition, subBranchPosition].filter(pos => pos[0] !== 51.505 && pos[1] !== -0.09);

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4>{/* If you have editing functionality, toggle title here */}Салбар нэмэх</h4>
                </CCardHeader>
                <CCardBody>
                    <CForm className="row g-3">
                        <CRow md={4}>
                            <CFormLabel htmlFor="branchName">Салбарын нэр</CFormLabel>
                            <CFormInput
                                type="text"
                                id="branchName"
                                value={newBranchName}
                                onChange={(e) => setNewBranchName(e.target.value)}
                            />
                        </CRow>
                        <CRow md={4}>
                            <CFormSelect
                                id="branchType"
                                label="Салбарын төрөл"
                                value={newBranchType}
                                onChange={(e) => setNewBranchType(e.target.value)}
                            >
                                <option value="" disabled>Сонгох</option>
                                <option value="store">Дэлгүүр</option>
                                <option value="restaurant">Ресторан</option>
                                <option value="fastfood">Түргэн хоол</option>
                                <option value="salon">Салон</option>
                                <option value="pharmacy">Эмийн сан</option>
                                <option value="hotel">Зочид Буудал</option>
                            </CFormSelect>
                        </CRow>
                        <CRow md={4}>
                            <CFormSelect
                                id="branchSelect"
                                label="Аймаг/Хот"
                                value={selectedBranch}
                                onChange={handleBranchChange}
                            >
                                <option value="" disabled>Салбарын байршил сонгох</option>
                                {branches.map(branch => (
                                    <option key={branch.branchCode} value={branch.branchCode}>
                                        {branch.branchName}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CRow>
                        <CRow md={4}>
                            <CFormSelect
                                id="subBranchSelect"
                                label="Дүүрэг/Сум"
                                value={selectedSubBranch}
                                onChange={handleSubBranchChange}
                            >
                                <option value="" disabled>Дэд салбарын байршил сонгох</option>
                                {subBranches.map(subBranch => (
                                    <option key={subBranch.subBranchCode} value={subBranch.subBranchCode}>
                                        {subBranch.subBranchName}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CRow>
                        <CRow md={4}>
                            <CFormLabel htmlFor="branchAddress">Салбарын хаяг</CFormLabel>
                            <CFormInput
                                type="text"
                                
                               
                            />
                        </CRow>
                        <CRow md={4}>
                            <CFormLabel htmlFor="branchLocation">
                                Салбарын байршил <CIcon icon={cilLocationPin} onClick={handleIconClick}></CIcon>
                            </CFormLabel>
                            <CFormInput
                                type="text"
                                id="branchAddress"
                                value={newBranchLocation}
                                onChange={(e) => setNewBranchLocation(e.target.value)}
                            />
                      
                        </CRow>
                        <CRow md={3}>
                            <CFormLabel htmlFor="branchPhoneNumber">Утасны дугаар</CFormLabel>
                            <CFormInput
                                type="text"
                                id="branchPhoneNumber"
                                value={newBranchContact}
                                onChange={(e) => setNewBranchContact(e.target.value)}
                            />
                        </CRow>
                        <CCol xs={12}>
                            <div className="d-grid gap-2 d-md-block">
                                <CButton color="primary" type="button" onClick={handleAddBranch}>
                                    Хадгалах
                                </CButton>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Хаах
                                </CButton>
                            </div>
                        </CCol>
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
                <MapContainer center={[47.92123, 106.918556]} zoom={13} style={{ height: '400px', width: '100%' }}>

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
                        <LocationMarker setPosition={setBranchPosition} setNewBranchLocation={setNewBranchLocation} />
                    </MapContainer>
                    <div className="d-grid gap-2 d-md-block mt-3">
                        <CButton color="primary" onClick={handleModalClose}>Болих</CButton>
                        <CButton color="outline-primary" onClick={() => { /* Handle save functionality here */ }}>Хадгалах</CButton>
                    </div>
                </CModalBody>
            </CModal>
        </>
    );

};

export default AddBranch;
