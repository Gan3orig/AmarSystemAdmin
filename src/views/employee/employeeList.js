import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CFormLabel, CImage } from '@coreui/react';
import { useState } from 'react';
import AddEmployeeList from './addEmployer'; // Import the AddEmployeeList component
import employee from './photos/team.png';

const EmployeeList = () => {
    const [showAddEmployee, setShowAddEmployee] = useState(false);

    const handleAddEmployeeClick = () => {
        setShowAddEmployee(!showAddEmployee);
    };

    return (
        <main className='mx-2 mt-2'>
            {!showAddEmployee ? (
                <CCard>
                    <CCardHeader>
                        <CCardTitle>Ажилчин</CCardTitle>
                    </CCardHeader>
                    <CCardBody className='text-center'>
                        <CImage
                            src={employee}
                            rounded
                            thumbnail
                            width={200}
                            height={200}
                            className="mb-2"
                            style={{ border: 'none' }}
                        />
                        <div className='d-flex flex-column align-items-center'>
                            <CFormLabel className='fs-2'>Ажилчин</CFormLabel>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <CButton color='primary' className='my-2' onClick={handleAddEmployeeClick}>
                                Ажилчин нэмэх
                            </CButton>
                        </div>
                    </CCardBody>
                </CCard>
            ) : (
                <AddEmployeeList />
            )}
        </main>
    );
};

export default EmployeeList;
