import React, { useState, useEffect } from 'react';
import {
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CForm, CRow, CCol, CFormInput, CFormSelect, CButton, CFormLabel, CInputGroup
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilPen } from '@coreui/icons';

// eslint-disable-next-line react/prop-types
const EditModal = ({ isVisible, handleClose, data, type }) => {
  // States for both types
  const [branchName, setBranchName] = useState('');
  const [branchType, setBranchType] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSubBranch, setSelectedSubBranch] = useState('');
  const [branchLocation, setBranchLocation] = useState('');
  const [branchContact, setBranchContact] = useState('');

  // Individual-specific states
  const [individualReg, setIndividualReg] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerSurname, setOwnerSurname] = useState('');
  const [mccCode, setMccCode] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // States for branches and sub-branches
  const [branches, setBranches] = useState([]);
  const [subBranches, setSubBranches] = useState([]);

  useEffect(() => {
    // if (data) {
    //   if (type === 'organization') {
    //     setBranchName(data.legalEntityReg || '');
    //     setBranchType(data.legalEntityName|| '');
    //     setSelectedBranch(data.ownerReg || '');
    //     setSelectedSubBranch(data.ownerName || '');
    //     setBranchLocation(data.businessNameENG|| '');
    //     setBranchContact(data.mccCode || '');
    //     setBranchType(data.province|| '');
    //     setSelectedBranch(data.district || '');
    //     setSelectedSubBranch(data.address || '');
    //     setBranchLocation(data.phone|| '');
    //     setBranchContact(data.email || '');


    //   } else if (type === 'individual') {
    //     setIndividualReg(data.ownerReg || '');
    //     setOwnerName(data.ownerName || '');
    //     setOwnerSurname(data.ownerSurname|| '');
    //     setMccCode(data.mccCode || '');
    //     setAddress(data.province || '');
    //     setPhone(data.district || '');
    //     setEmail(data.address || '');
    //     setPhone(data.phone || '');
    //     setEmail(data.email || '');
    //   }
    // }
  }, [data, type]);

  const handleBranchChange = (e) => {
    const selectedBranchCode = e.target.value;
    setSelectedBranch(selectedBranchCode);
    // Fetch sub-branches for the selected branch
  };

  const handleSaveChanges = () => {
    // API call to save changes
  };

  return (
    <CModal
      visible={isVisible}
      onClose={handleClose}
      aria-labelledby="EditModalLabel"
    >
      <CModalHeader>
        <CModalTitle id="EditModalLabel">
          {type === 'organization' ? 'Edit Organization' : 'Edit Individual'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3">
        <CRow md={4}>
                <CFormInput
                  type="text"
                  id="branchAddress"
                  label="Branch Address"
                  // eslint-disable-next-line react/prop-types
                  value={address ? address : data.address}
                  onChange={(e)=>setAddress(e.target.value)}
                /> 
              </CRow>
          {type === 'organization' ? (
            <>
              <CRow md={4}>
                <CFormInput
                  type="text"
                  id="branchName"
                  label="Branch Name"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                />
              </CRow>
              <CRow md={4}>
                <CFormSelect
                  id="branchType"
                  label="Branch Type"
                  value={branchType}
                  onChange={(e) => setBranchType(e.target.value)}
                >
                  <option value="" disabled>Select...</option>
                  <option value="store">Store</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="fastfood">Fast Food</option>
                  <option value="salon">Salon</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="hotel">Hotel</option>
                </CFormSelect>
              </CRow>
              <CRow md={4}>
                <CFormSelect
                  id="branchLocation"
                  label="Region/City"
                  value={selectedBranch}
                  onChange={handleBranchChange}
                >
                  <option value="" disabled>Select...</option>
                  {branches.map((branch) => (
                    <option key={branch.branchCode} value={branch.branchCode}>
                      {branch.branchName}
                    </option>
                  ))}
                </CFormSelect>
              </CRow>
              <CRow md={4}>
                <CFormSelect
                  id="subBranchLocation"
                  label="District"
                  value={selectedSubBranch}
                  onChange={(e) => setSelectedSubBranch(e.target.value)}
                >
                  <option value="">Select...</option>
                  {subBranches.map((subBranch) => (
                    <option key={subBranch.subBranchCode} value={subBranch.subBranchCode}>
                      {subBranch.subBranchName}
                    </option>
                  ))}
                </CFormSelect>
              </CRow>
              <CRow md={4}>
                <CFormInput
                  type="text"
                  id="branchAddress"
                  label="Branch Address"
                  value={branchLocation}
                  onChange={(e) => setBranchLocation(e.target.value)}
                />
              </CRow>
            </>
          ) : type === 'individual' && (
            <>
              <CRow className='align-items-center'>
                <CCol xs={6}>
                  <CFormLabel>Эзэмшигчийн регистр</CFormLabel>
                  <CInputGroup className='mb-3'>
                    <CFormInput
                      className='individualReg'
                      type="text"
                      placeholder="Регистерийн дугаар"
                      aria-describedby="button-addon2"
                      value={individualReg}
                      onChange={(e) => setIndividualReg(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel>Эзэмшигчийн Нэр</CFormLabel>
                  <CFormInput className='LastName' value={ownerName} disabled />
                </CCol>
              </CRow>

              <CRow className='align-items-center'>
                <CCol xs={6}>
                  <CFormLabel>Эзэмшигчийн Овог</CFormLabel>
                  <CFormInput
                    className='FirstName'
                    value={ownerSurname}
                    onChange={(e) => setOwnerSurname(e.target.value)}
                  />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel>MCC code</CFormLabel>
                  <CFormSelect
                    value={mccCode}
                    onChange={(e) => setMccCode(e.target.value)}
                  >
                    {/* Add options here */}
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className='align-items-center'>
                <CCol xs={6}>
                  <CFormLabel>Аймаг/Хот</CFormLabel>
                  <CFormSelect
                    id="branchName"
                    value={selectedBranch}
                    onChange={handleBranchChange}
                  >
                    <option value="" disabled>Сонгоно уу...</option>
                    {branches.map((branch) => (
                      <option key={branch.branchCode} value={branch.branchCode}>
                        {branch.branchName}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel>Сум дүүрэг</CFormLabel>
                  <CFormSelect
                    id="subbranchName"
                    value={selectedSubBranch}
                    onChange={(e) => setSelectedSubBranch(e.target.value)}
                  >
                    <option value="">Сонгоно уу...</option>
                    {subBranches.map((subBranch) => (
                      <option key={subBranch.subBranchCode} value={subBranch.subBranchCode}>
                        {subBranch.subBranchName}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className='align-items-center'>
                <CCol xs={6}>
                  <CFormLabel>Хаяг</CFormLabel>
                  <CFormInput
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel>Утас</CFormLabel>
                  <CFormInput
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </CCol>
              </CRow>

              <CRow className='align-items-center'>
                <CCol xs={12}>
                  <CFormLabel>Майл</CFormLabel>
                  <CFormInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </CCol>
              </CRow>
            </>
          )}

          <CCol xs={12}>
            <CButton color="primary" type="button" onClick={handleSaveChanges}>
              Save Changes
            </CButton>
          </CCol>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditModal;
