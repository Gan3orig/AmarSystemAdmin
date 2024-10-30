/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CFormLabel,
    CFormInput,
    CFormSelect,
} from '@coreui/react';

const EditBranch = ({ branch, onClose }) => {
    const [branchData, setBranchData] = useState({
        branchId: '',
        merchantId: '',
        branchName: '',
        businessTypeId: '',
        branchCode: '',
        subBranchCode: '',
        locationLat: '',
        locationlng: '',
        phone: '',
        address: '',
        logoSmall: '',
        createUserId: ''
    });
    const [newBranchType, setNewBranchType] = useState('');

    useEffect(() => {
        if (branch) {
            setBranchData({
                // eslint-disable-next-line react/prop-types
                branchId: branch.branchId,
                branchName: branch.branchName,
                businessTypeId: branch.businessTypeId,
                logoSmall: branch.logoSmall,
                address: branch.address,
                phone: branch.phone,
                branchCode: branch.branchCode,
                subBranchCode: branch.subBranchCode,
                locationLat: branch.locationLat,
                locationlng: branch.locationlng,
               
            });
            setNewBranchType(branch.businessTypeId); // Initialize branch type
        }
    }, [branch]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'logoSmall' && files) {
            setBranchData((prevData) => ({
                ...prevData,
                logoSmall: files[0], // Save the file object
            }));
        } else {
            setBranchData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        if (!branchData.branchName || !branchData.phone) {
            alert("Please fill in all required fields.");
            return;
        }

        const token = localStorage.getItem('token');
        const merchantId = localStorage.getItem('merchantId'); // Optional if necessary

        const formData = new FormData();
        Object.keys(branchData).forEach((key) => {
            formData.append(key, branchData[key]);
        });

        // Append the updated branch type
        formData.append('businessTypeId', newBranchType);

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        };

        try {
            const response = await fetch(`https://api.majorsoft.mn/api/branchService/${branchData.branchId}`, requestOptions);
            const result = await response.json();

            if (result.success) {
                alert(result.message);
                onClose();
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Error updating branch data:", error);
            alert("Failed to update branch. Please try again.");
        }
    };

    return (
        <CCard>
            <CCardHeader>Салбар засах</CCardHeader>
            <CCardBody>
                <CFormLabel>Салбарын нэр</CFormLabel>
                <CFormInput
                    type="text"
                    name="branchName"
                    value={branchData.branchName}
                    onChange={handleInputChange}
                    required
                />
                <CFormLabel>Салбарын төрөл</CFormLabel>
                <CFormSelect
                    id="branchType"
                    value={newBranchType}
                    onChange={(e) => setNewBranchType(e.target.value)}
                >
                    <option value={branchData.businessTypeId} disabled>
                      Сонгох
                    </option>
                    <option value="0">Дэлгүүр</option>
                    <option value="1">Ресторан</option>
                    <option value="2">Түргэн хоол</option>
                    <option value="3">Салон</option>
                    <option value="4">Эмийн сан</option>
                    <option value="5">Зочид Буудал</option>
                </CFormSelect>

                <CFormLabel>Лого (Жижиг)</CFormLabel>
                <CFormInput
                    type="file"
                    name="logoSmall"
                    onChange={handleInputChange}
                />
                <CFormLabel>Хаяг</CFormLabel>
                <CFormInput
                    type="text"
                    name="address"
                    value={branchData.address}
                    onChange={handleInputChange}
                />
                <CFormLabel>Утас</CFormLabel>
                <CFormInput
                    type="text"
                    name="phone"
                    value={branchData.phone}
                    onChange={handleInputChange}
                    required
                />
                <CFormLabel>Салбарын код</CFormLabel>
                <CFormInput
                    type="text"
                    name="branchCode"
                    value={branchData.branchCode}
                    onChange={handleInputChange}
                />
                <CFormLabel>Байршлын өргөрөг</CFormLabel>
                <CFormInput
                    type="text"
                    name="locationLat"
                    value={branchData.locationLat}
                    onChange={handleInputChange}
                />
                <CFormLabel>Байршлын уртраг</CFormLabel>
                <CFormInput
                    type="text"
                    name="locationlng"
                    value={branchData.locationlng}
                    onChange={handleInputChange}
                />
                <div className="d-flex justify-content-between mt-3">
                    <CButton color="secondary" onClick={onClose} type="button">
                        Болих
                    </CButton>
                    <CButton color="primary" onClick={handleSubmit} type="button">
                        Өөрчлөлт хадгалах
                    </CButton>
                </div>
            </CCardBody>
        </CCard>
    );
};

export default EditBranch;
