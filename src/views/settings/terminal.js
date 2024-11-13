import { useEffect, useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormSelect,
    CImage,
    CTable,
    CTableBody,
    CTableHeaderCell,
    CTableRow,
    CTableDataCell,
    CTableHead,
} from '@coreui/react';
import TerminalImage from '../settings/photos/terminal.png';

const Terminal = () => {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null); // Stores selected branch object
    const [terminals, setTerminals] = useState([]);

    const getBranches = () => {
        const token = localStorage.getItem('token');
        const merchantId = localStorage.getItem('merchantId');

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
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
                console(result.data);
            })
            .catch((error) => {
                console.error('Error fetching branch data:', error);
            });
    };

    const getTerminals = (branchId) => {
        const token = localStorage.getItem('token');

        fetch(`https://api.majorsoft.mn/api/terminal/branchTerminals?branchId=${branchId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result) => {
                setTerminals(result.data);  
            })
            .catch((error) => {
                console.error('Error fetching terminals:', error);
            });
    };

    const addTerminal = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!selectedBranch) {
            console.error('No branch selected');
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                branchId: selectedBranch.branchId, 
                userId: userId,                     
                isConnect: true,                  
                confirmDate: new Date().toISOString(), 
            }),
        };

        fetch('https://api.majorsoft.mn/api/terminal', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log('Terminal added successfully:', result);
                getTerminals(selectedBranch.branchId); 
            })
            .catch((error) => {
                console.error('Error adding terminal:', error);
            });
    };

    useEffect(() => {
        getBranches();
    }, []);

    return (
        <main className="mx-2 mt-1">
            <CCard>
                <CCardHeader>Төхөөрөмжүүд</CCardHeader>
                <CCardBody className="text-center">
                    <CFormSelect
                        style={{ minWidth: 'w-5' }}
                        id="branchType"
                        value={selectedBranch?.branchId || ''}  
                        onChange={(e) => {
                            const selected = branches.find((branch) => branch.branchId === parseInt(e.target.value));
                            setSelectedBranch(selected);
                            getTerminals(selected.branchId); 
                        }}
                    >
                        <option value="" disabled>Салбарыг сонгох</option>
                        {branches.map((branch) => (
                            <option key={branch.branchId} value={branch.branchId}>
                                {branch.branchName}
                            </option>
                        ))}
                    </CFormSelect>

                    {/* Check if terminals exist */}
                    {terminals.length > 0 ? (
                        <CTable striped bordered hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Төхөөрөмжийн нэр</CTableHeaderCell>
                                    <CTableHeaderCell>Үйлдэл</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {terminals.map((terminal) => (
                                    <CTableRow key={terminal.terminalId}>
                                        <CTableDataCell>{terminal.terminalName}</CTableDataCell>
                                        <CTableDataCell>
                                            {/* Add more actions here if needed */}
                                        </CTableDataCell>
                                    </CTableRow>
                                    
                                ))}
                                   <CButton color="primary" className="my-2" onClick={addTerminal}>
                                    Төхөөрөмж нэмэх
                                </CButton>
                            </CTableBody>
                        </CTable>
                    ) : (
                        <div>
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
                                <CButton color="primary" className="my-2" onClick={addTerminal}>
                                    Төхөөрөмж нэмэх
                                </CButton>
                            </div>
                        </div>
                    )}
                </CCardBody>
            </CCard>
        </main>
    );
};

export default Terminal;
