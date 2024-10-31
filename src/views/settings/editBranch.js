/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CFormLabel,
    CFormInput,
} from '@coreui/react';

// eslint-disable-next-line react/prop-types
const EditBranch = ({ branch, onClose }) => {
    const [branchData, setBranchData] = useState({
        branchId: '',
        branchName: '',
        businessTypeId: '',
        logoSmall: '',
        address: '',
        phone: '',
        branchCode: '',
        locationLat: '',
        locationlng: '',
        subBranchCode: '',
    });

    // Load the branch data into state when the component is mounted or branch prop changes
    useEffect(() => {
        if (branch) {
            setBranchData({
                branchId: branch.branchId,
                merchantId: branch.merchantId,
                branchName: branch.branchName,
                businessTypeId: branch.businessTypeId,
                logoSmall: branch.logoSmall,
                address: branch.address,
                phone: branch.phone,
                branchCode: branch.branchCode,
                locationLat: branch.locationLat,
                locationlng: branch.locationlng,
                subBranchCode: branch.subBranchCode,
            });
        }
    }, [branch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBranchData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'PUT', // Use PUT to update the branch
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                branchData
            }),
        };

        try {
            const response = await fetch(`https://api.majorsoft.mn/api/branchService`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("Update Result:", result);
            onClose(); // Call the onClose function to close the edit form
        } catch (error) {
            console.error("Error updating branch data:", error);
        }
    };

    return (
        <CCard>
            <CCardHeader>Edit Branch</CCardHeader>
            <CCardBody>
                <CFormLabel>Branch Name</CFormLabel>
                <CFormInput
                    type="text"
                    name="branchName"
                    value={branchData.branchName}
                    onChange={handleInputChange}
                />
                <CFormLabel>Business Type ID</CFormLabel>
                <CFormInput
                    type="text"
                    name="businessTypeId"
                    value={branchData.businessTypeId}
                    onChange={handleInputChange}
                />
                <CFormLabel>Logo Small</CFormLabel>
                <CFormInput
                    type="text"
                    name="logoSmall"
                    value={branchData.logoSmall}
                    onChange={handleInputChange}
                />
                <CFormLabel>Address</CFormLabel>
                <CFormInput
                    type="text"
                    name="address"
                    value={branchData.address}
                    onChange={handleInputChange}
                />
                <CFormLabel>Phone</CFormLabel>
                <CFormInput
                    type="text"
                    name="phone"
                    value={branchData.phone}
                    onChange={handleInputChange}
                />
                <CFormLabel>Branch Code</CFormLabel>
                <CFormInput
                    type="text"
                    name="branchCode"
                    value={branchData.branchCode}
                    onChange={handleInputChange}
                />
                <CFormLabel>Location Latitude</CFormLabel>
                <CFormInput
                    type="text"
                    name="locationLat"
                    value={branchData.locationLat}
                    onChange={handleInputChange}
                />
                <CFormLabel>Location Longitude</CFormLabel>
                <CFormInput
                    type="text"
                    name="locationlng"
                    value={branchData.locationlng}
                    onChange={handleInputChange}
                />
                <CFormLabel>Sub Branch Code</CFormLabel>
                <CFormInput
                    type="text"
                    name="subBranchCode"
                    value={branchData.subBranchCode}
                    onChange={handleInputChange}
                />
                <div className="d-flex justify-content-between mt-3">
                    <CButton color="secondary" onClick={onClose} type="button">
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={handleSubmit} type="button">
                        Save Changes
                    </CButton>
                </div>
            </CCardBody>
        </CCard>
    );
};

export default EditBranch;
