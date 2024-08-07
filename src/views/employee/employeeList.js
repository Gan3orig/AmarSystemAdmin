import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CImage, CButton, CFormLabel } from '@coreui/react';
import employee from './photos/team.png'
const EmployeeList = () => {
    const [importVisible, setImportVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    const toggleImportModal = () => {
        setImportVisible(!importVisible);
    };

    const handleModal = () => {
        setVisible(!visible);
    };

    return (
        <main className='mx-2 mt-5'>
            <CCard>
                <CCardHeader>Ажилчин</CCardHeader>
                <CCardBody className='text-center'>
                    <CImage
                        src={employee} // Ensure `product` is imported or defined
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
                        <CButton color='primary' className='my-2' onClick={handleModal}>
                            Ажилчин нэмэх 
                        </CButton>
                    
                    </div>
                </CCardBody> {/* Closed the CCardBody tag */}
            </CCard> {/* Closed the CCard tag */}
        </main>
    );
};

export default EmployeeList;
