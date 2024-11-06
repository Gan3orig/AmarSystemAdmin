import { useEffect, useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormLabel,
    CImage,
    CTable,
    CTableBody,
    CTableHeaderCell,
    CTableRow,
    CTableDataCell,
    CTableHead,
    CFormSelect,
} from '@coreui/react';
import TerminalImage from '../settings/photos/terminal.png'; 
import AddTerminal from './addTerminal'; 

const Terminal = () => {
    const [branches, setBranches] = useState([]);
    const [selectedBranchName, setSelectedBranchName] = useState('');
    const [showAddBranch, setShowAddBranch] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [terminals, setTerminals] = useState([]);

    const getDatas = () => {
        const token = localStorage.getItem('token');
        const merchantId = localStorage.getItem('merchantId');

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };

        fetch(`https://api.majorsoft.mn/api/branchService?merchantId=${merchantId}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                setBranches(result.data);
            })
            .catch((error) => {
                console.error('Error fetching branch data:', error);
            });
    };

    const handleDeleteBranch = (branchId) => {
        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        fetch(`https://api.majorsoft.mn/api/branchService?branchId=${branchId}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setBranches((prevBranches) => prevBranches.filter((branch) => branch.branchId !== branchId));
                console.log(`Branch with id ${branchId} deleted successfully.`);
            })
            .catch((error) => {
                console.error('Error deleting branch:', error);
            });
    };


    const addTerminal = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); 
      
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                branchId: selectedBranch?.branchId,  
                userId: userId,  
                terminalName: 'New Terminal'  
            })
        };
    
        fetch('https://api.majorsoft.mn/api/terminal', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log("Terminal added successfully:", result);
                getDatas();  // Refresh branch data after adding terminal
            })
            .catch((error) => {
                console.error('Error adding terminal:', error);
            });
    };
    

    useEffect(() => {
        getDatas();
    }, []);

    return (
        <main className="mx-2 mt-1">
            {!showAddBranch ? (
                <CCard>
                    <CCardHeader>Төхөөрөмжүүд</CCardHeader>
                    <CCardBody className="text-center">
                        <CFormSelect
                            style={{ minWidth: 'w-5' }}
                            id="branchType"
                            value={selectedBranchName}
                            onChange={(e) => setSelectedBranchName(e.target.value)}
                        >
                            <option value="" disabled>Салбарыг сонгох</option>
                            {branches.map((branch) => (
                                <option key={branch.branchId} value={branch.branchName}>
                                    {branch.branchName}
                                </option>
                            ))}
                        </CFormSelect>
                        {terminals.length > 0 ? (
                            <CTable striped bordered hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>Салбарын нэр</CTableHeaderCell>
                                        <CTableHeaderCell>Бүртгэлтэй төхөөрөмж</CTableHeaderCell>
                                        <CTableHeaderCell>Үйлдэл</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {branches.map((branch) => (
                                        <CTableRow key={branch.branchId}>
                                            {/* <CTableDataCell>{branch.branchName}</CTableDataCell>
                                            <CTableDataCell>{branch.branchType}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButton color="light" onClick={() => handleToggleAddBranch(branch)}>Засах</CButton>
                                                <CButton color="secondary" onClick={() => handleDeleteBranch(branch.branchId)}>Устгах</CButton>
                                            </CTableDataCell> */}
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        ) : (
                            <>
                                <CImage
                                    src={TerminalImage}
                                    rounded
                                    thumbnail
                                    width={200}
                                    height={200}
                                    className="mb-2"
                                    style={{ border: 'none' }}
                                />
                                <div className="d-flex flex-column align-items-center">
                                    <CFormLabel className="fs-2">Төхөөрөмжүүд</CFormLabel>
                                    <CFormLabel>Эндээс та салбараа удирдах боломжтой</CFormLabel>
                                </div>
                                <CButton color="primary" className="my-2" onClick={addTerminal}>
                                    Төхөөрөмж нэмэх
                                </CButton>
                            </>
                        )}
                    </CCardBody>
                </CCard>
            ) : (
                <AddTerminal
                    visible={showAddBranch}
                    setVisible={setShowAddBranch}
                    edit={!!selectedBranch}
                    editBranch={selectedBranch}
                    refresh={getDatas}
                />
            )}
        </main>
    );
};

export default Terminal;
