import React, { useState, useEffect } from 'react';
import '../settings/setting.css';
import {
  CButton,
  CModal,
  CCardBody,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CFormSelect,
  CRow,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell
} from '@coreui/react';

const Settings = () => {
  const [visible, setVisible] = useState(false);
  const [posFormVisible, setPosFormVisible] = useState(false);
  const [branches, setBranches] = useState([]);
  const [subBranches, setSubBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedOrganizationType, setSelectedOrganizationType] = useState('');
  const [showAddBranchButton, setShowAddBranchButton] = useState(false);

  // State for new branch form
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchType, setNewBranchType] = useState('');
  const [newBranchLocation, setNewBranchLocation] = useState('');
  const [newBranchContact, setNewBranchContact] = useState('');

  // State for editing branch
  const [editingBranch, setEditingBranch] = useState(null);

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
        console.log('API Data:', data);
        const dataArray = Array.isArray(data) ? data : data.data || [];

        if (Array.isArray(dataArray)) {
          const groupedBranches = dataArray.reduce((acc, curr) => {
            const { branchCode, branchName, subBranchCode, subBranchName } = curr;
            if (!acc[branchCode]) {
              acc[branchCode] = { branchCode, branchName, subBranches: [], location: '', contact: '' };
            }
            acc[branchCode].subBranches.push({ subBranchCode, subBranchName });
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

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId);
    const selectedBranchData = branches.find(branch => branch.branchCode === branchId);
    setSubBranches(selectedBranchData ? selectedBranchData.subBranches : []);
  };

  const handleOrganizationTypeChange = (event) => {
    setSelectedOrganizationType(event.target.value);
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setNewBranchName(branch.branchName);
    setNewBranchLocation(branch.location);
    setNewBranchContact(branch.contact);
    setVisible(true); // Open the modal to edit
  };

  const handleDeleteBranch = async (branchId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this branch?');
    if (confirmDelete) {
      // Replace the following URL with your actual delete endpoint
      const url = `https://api.ebarimt.mn/api/info/check/deleteBranch/${branchId}`;
      const options = {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          // Remove the branch from state
          setBranches(branches.filter(branch => branch.branchCode !== branchId));
        } else {
          console.error('Failed to delete branch:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting branch:', error);
      }
    }
  };

  const handleEditPOS = (posId) => {
    // Implement edit logic here
    console.log(`Edit POS with ID: ${posId}`);
  };

  const handleDeletePOS = (posId) => {
    // Implement delete logic here
    console.log(`Delete POS with ID: ${posId}`);
  };

  const handleAddBranch = () => {
    const newBranch = {
      branchCode: Date.now(), // Generate a unique ID for the new branch
      branchName: newBranchName,
      location: newBranchLocation,
      contact: newBranchContact,
      subBranches: [] // You can add subBranches logic here if needed
    };
    if (editingBranch) {
      // Update existing branch
      setBranches(branches.map(branch => 
        branch.branchCode === editingBranch.branchCode ? newBranch : branch
      ));
      setEditingBranch(null);
    } else {
      // Add new branch
      setBranches([...branches, newBranch]);
    }

    // Clear form fields
    setNewBranchName('');
    setNewBranchType('');
    setNewBranchLocation('');
    setNewBranchContact('');
    setVisible(false); // Close the modal
  };

  return (
    <div className="app-container">
      <nav className="sidebar">
        <CButton onClick={() => setShowAddBranchButton(false)}>Нэмэлт ториргоо</CButton>
        <CButton onClick={() => setShowAddBranchButton(true)}>Салбарууд</CButton>
      </nav>
      <main className="content">
        <CCardBody>
          {showAddBranchButton && (
            <>
              <CButton color="primary" onClick={() => setVisible(true)}>
                Салбар нэмэх
              </CButton>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Нэр</CTableHeaderCell>
                    <CTableHeaderCell>Хаяг</CTableHeaderCell>
                    <CTableHeaderCell>Пос тоо</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {branches.map((branch, index) => (
                    <CTableRow key={branch.branchCode}>
                      <CTableDataCell>{index + 1}</CTableDataCell> {/* Order number */}
                      <CTableDataCell>{branch.branchName}</CTableDataCell>
                      <CTableDataCell>{branch.location || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{branch.subBranches.length}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="warning" onClick={() => handleEditBranch(branch)}>
                          Edit
                        </CButton>
                        <CButton color="danger" onClick={() => handleDeleteBranch(branch.branchCode)}>
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </>
          )}
        </CCardBody>

        <CCardBody>
          {showAddBranchButton && (
            <>
              <CButton color="primary" onClick={() => setPosFormVisible(true)}>
                Пос төхөөрөмж
              </CButton>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Нэр</CTableHeaderCell>
                    <CTableHeaderCell>Салбар</CTableHeaderCell>
                    <CTableHeaderCell>Төлөв</CTableHeaderCell>
                    <CTableHeaderCell>Систем</CTableHeaderCell>
                    <CTableHeaderCell>НӨАТ</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {/* Add data rows here */}
                  <CTableRow>
                    <CTableDataCell>1</CTableDataCell>
                    <CTableDataCell>POS Device 1</CTableDataCell>
                    <CTableDataCell>Branch A</CTableDataCell>
                    <CTableDataCell>Active</CTableDataCell>
                    <CTableDataCell>Type 1</CTableDataCell>
                    <CTableDataCell>VAT Included</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" onClick={() => handleEditPOS(1)}>
                        Edit
                      </CButton>
                      <CButton color="danger" onClick={() => handleDeletePOS(1)}>
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                  {/* Add more data rows as needed */}
                </CTableBody>
              </CTable>
            </>
          )}
        </CCardBody>

        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader>
            <CModalTitle id="LiveDemoExampleLabel">
              {editingBranch ? 'Салбар засах' : 'Салбар бүртгүүлэх'}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="row g-3">
              <CRow md={4}>
                <CFormInput
                  type="text"
                  id="OrganizationName"
                  label="Салбарын нэр"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                />
              </CRow>
              <CRow md={4}>
                <CFormSelect
                  id="OrganizationType"
                  label="Салбарын төрөл"
                  value={newBranchType}
                  onChange={(e) => setNewBranchType(e.target.value)}
                >
                  <option value="" disabled>Сонгоно уу...</option>
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
                  id="branchName"
                  label="Сум дүүрэг"
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
              </CRow>
              <CRow md={4}>
                <CFormSelect
                  id="subbranchName"
                  label="Хороо"
                  value=""
                  onChange={() => {}}
                >
                  <option value="" disabled>Сонгоно уу...</option>
                  {subBranches.map((subBranch) => (
                    <option key={subBranch.subBranchCode} value={subBranch.subBranchCode}>
                      {subBranch.subBranchName}
                    </option>
                  ))}
                </CFormSelect>
              </CRow>
              <CRow md={4}>
                <CFormLabel htmlFor="branchAddress">Салбарын Хаяг</CFormLabel>
                <CInputGroup className="has-validation">
                  <CFormInput
                    type="text"
                    id="branchAddress"
                    value={newBranchLocation}
                    onChange={(e) => setNewBranchLocation(e.target.value)}
                  />
                </CInputGroup>
              </CRow>

              <CRow md={3}>
                <CFormInput
                  type="text"
                  id="zip"
                  label="Утас"
                  value={newBranchContact}
                  onChange={(e) => setNewBranchContact(e.target.value)}
                />
              </CRow>
            
              <CCol xs={12}>
                <CButton color="primary" type="button" onClick={handleAddBranch}>
                  Save changes
                </CButton>
              </CCol>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal
          visible={posFormVisible}
          onClose={() => setPosFormVisible(false)}
          aria-labelledby="PosModalLabel"
        >
          <CModalHeader>
            <CModalTitle id="PosModalLabel">ПОС төхөөрөмж бүртгүүлэх</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="row g-3">
              <CRow md={4}>
                <CFormInput
                  type="text"
                  id="posName"
                  label="ПОС нэр"
                />
              </CRow>
              <CRow md={4}>
                <CFormSelect
                  id="posBranch"
                  label="Салбар"
                  value=""
                  onChange={() => {}}
                >
                  <option value="" disabled>Сонгоно уу...</option>
                  {branches.map((branch) => (
                    <option key={branch.branchCode} value={branch.branchCode}>
                      {branch.branchName}
                    </option>
                  ))}
                </CFormSelect>
              </CRow>
              <CRow md={4}>
                <CFormSelect
                  id="posSystemType"
                  label="Системийн төрөл"
                  value=""
                  onChange={() => {}}
                >
                  <option value="" disabled>Сонгоно уу...</option>
                  <option value="type1">Төрөл 1</option>
                  <option value="type2">Төрөл 2</option>
                  <option value="type3">Төрөл 3</option>
                </CFormSelect>
              </CRow>
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Submit form
                </CButton>
              </CCol>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setPosFormVisible(false)}>
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </main>
    </div>
  );
};

export default Settings;
