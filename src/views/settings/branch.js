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
} from '@coreui/react';
import branchImage from '../settings/photos/subbranch.png'; 
import AddBranch from './addBranch'; 
import EditBranch from './editBranch';

const Branch = () => {
    const [showAddBranch, setShowAddBranch] = useState(false);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState([]);
    const [edit, setEdit] = useState(false); // Renamed to setEdit for clarity

    const businessTypeMap = {
        0: 'Дэлгүүр',
        1: 'Ресторан',
        2: 'Түргэн хоол',
        3: 'Салон',
        4: 'Эмийн сан',
        5: 'Зочид Буудал'
    };

    const handleToggleAddBranch = (branch) => {
        if (branch) {
            setSelectedBranch(branch);
            setEdit(true); // Set edit mode
        } else {
            setSelectedBranch(null);
            setEdit(false); // Add new branch mode
        }
        setShowAddBranch(!showAddBranch);
    };

    const handleDeleteBranch = (branchId) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const requestOptions = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            redirect: "follow"
        };

        fetch(`https://api.majorsoft.mn/api/branchService?branchId=${branchId}&userId=${userId}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                setBranches(prevBranches => prevBranches.filter(branch => branch.branchId !== branchId));
                console.log(`Branch with id ${branchId} deleted successfully.`);
            })
            .catch((error) => {
                console.error("Error deleting branch:", error);
            });
    };

    const  getDatas = () => {
        const token = localStorage.getItem('token');
        const merchantId = localStorage.getItem("merchantId");

        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            redirect: "follow"
        };

        fetch(`https://api.majorsoft.mn/api/branchService?merchantId=${merchantId}`, requestOptions)
            .then((response) => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log("Fetched branch data:", result);
                setBranches(result.data);
            })
            .catch((error) => {
                console.error("Error fetching branch data:", error);
            });
    } 
    useEffect(() => {
       getDatas()
    }, []);

    return (
        <main className='mx-2 mt-1'>
            {!showAddBranch ? (
                <CCard>
                    <CCardHeader>Салбар</CCardHeader>
                    <CCardBody className='text-center'>
                        {branches.length > 0 ? (
                            <CTable striped bordered hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>Салбарын нэр</CTableHeaderCell>
                                        <CTableHeaderCell>Салбарын төрөл</CTableHeaderCell>
                                        <CTableHeaderCell>Салбар</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {branches.map((branch) => (
                                        <CTableRow key={branch.branchId || branch.branchName}>
                                            <CTableDataCell>{branch.branchName}</CTableDataCell>
                                            <CTableDataCell>{businessTypeMap[branch.businessTypeId] || 'Тодорхойгүй'}</CTableDataCell>
                                            <CTableDataCell> 
                                                <CButton color="light" onClick={() => handleToggleAddBranch(branch)}>Засах</CButton>
                                                <CButton color="secondary" onClick={() => handleDeleteBranch(branch.branchId)}>Устгах</CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    <CButton color='primary' className='my-2' onClick={() => handleToggleAddBranch()}>
                                        Салбар нэмэх
                                    </CButton>
                                </CTableBody>
                            </CTable>
                        ) : (
                            <>
                                <CImage
                                    src={branchImage}
                                    rounded
                                    thumbnail
                                    width={200}
                                    height={200}
                                    className="mb-2"
                                    style={{ border: 'none' }}
                                />
                                <div className='d-flex flex-column align-items-center'>
                                    <CFormLabel className='fs-2'>Салбар</CFormLabel>
                                    <CFormLabel>Эндээс та салбараа удирдах боломжтой</CFormLabel>
                                </div>
                                <div className='d-flex flex-column align-items-center'>
                                    <CButton color='primary' className='my-2' onClick={() => handleToggleAddBranch()}>
                                        Салбар нэмэх
                                    </CButton>
                                </div>
                            </>
                        )}
                    </CCardBody>
                </CCard>
            ) : (
                <AddBranch
                    visible={showAddBranch}
                    setVisible={setShowAddBranch}
                    edit={edit}
                    editBranch={selectedBranch}
                    refresh = {getDatas}
                />
            )}
        </main>
    );
};

export default Branch;
