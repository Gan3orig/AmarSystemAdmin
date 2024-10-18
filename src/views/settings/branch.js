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
    const [showEditBranch, setShowEditBranch] = useState(false);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const handleToggleAddBranch = () => {
        setShowAddBranch(prevState => !prevState);
    };

    const handleEditBranch = (branch) => {
        setSelectedBranch(branch);
        setShowEditBranch(true); // Show the edit branch component
    };

    const handleCloseEditBranch = () => {
        setShowEditBranch(false);
        setSelectedBranch(null); // Reset selected branch
    };

    const handleDeleteBranch = (branchId) => {
        const token = localStorage.getItem('token'); // Assuming token is stored in local storage
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in local storage

        const requestOptions = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
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
                // Update the branches state to remove the deleted branch
                setBranches(prevBranches => prevBranches.filter(branch => branch.branchId !== branchId));
                console.log(`Branch with id ${branchId} deleted successfully.`);
            })
            .catch((error) => {
                console.error("Error deleting branch:", error);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming token is stored in local storage
        const merchantId = localStorage.getItem("merchantId");

        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
                "Content-Type": "application/json"
            },
            redirect: "follow"
        };

        fetch(`https://api.majorsoft.mn/api/branchService?merchantId=${merchantId}`, requestOptions)
            .then((response) => {
                console.log('Response status:', response.status); // Log the response status
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log("Fetched branch data:", result);
                setBranches(result.data); // Ensure this is the correct path
            })
            .catch((error) => {
                console.error("Error fetching branch data:", error);
            });
    }, []);

    return (
        <main className='mx-2 mt-1'>
           {!showAddBranch && !showEditBranch ? (
                <CCard>
                    <CCardHeader>Салбар</CCardHeader>
                    <CCardBody className='text-center'>
                        {branches.length > 0 ? (
                            <CTable striped bordered hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>Салбарын нэр</CTableHeaderCell>
                                        <CTableHeaderCell>Салбарын төрөл</CTableHeaderCell>
                                        <CTableHeaderCell>Хаяг</CTableHeaderCell>
                                        <CTableHeaderCell>Холбогдох утас</CTableHeaderCell>
                                        <CTableHeaderCell>Салбар</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {branches.map((branch) => (
                                        <CTableRow key={branch.branchId || branch.branchName}>
                                            <CTableDataCell>{branch.branchName}</CTableDataCell>
                                            <CTableDataCell>{branch.businessTypeId}</CTableDataCell>
                                            <CTableDataCell>{branch.address}</CTableDataCell>
                                            <CTableDataCell>{branch.phone}</CTableDataCell>
                                            <CTableDataCell> 
                                                <CButton color="light" onClick={() => handleEditBranch(branch)}>Засах</CButton>
                                                <CButton color="secondary" onClick={() => handleDeleteBranch(branch.branchId)}>Устгах</CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    <CButton color='primary' className='my-2' onClick={handleToggleAddBranch}>
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
                                    <CButton color='primary' className='my-2' onClick={handleToggleAddBranch}>
                                        Салбар нэмэх
                                    </CButton>
                                </div>
                            </>
                        )}
                    </CCardBody>
                </CCard>
            )  : showAddBranch ? (
                <AddBranch visible={showAddBranch} setVisible={setShowAddBranch} />
            ) : (
                <EditBranch visible={showEditBranch} setVisible={handleCloseEditBranch} branch={selectedBranch} />
            )}
        </main>
    );
};

export default Branch;
