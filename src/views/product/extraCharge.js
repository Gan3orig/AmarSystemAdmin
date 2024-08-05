import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormLabel,
    CImage,
} from '@coreui/react';
import charge from './photos/charge.png';
import AddExtraCharge from './addExtraCharge'; // Import the AddExtraCharge component

const ExtraCharge = () => {
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
                <CCardHeader>Нэмэлт төлбөр</CCardHeader>
                <CCardBody className='text-center'>
                    <CImage
                        src={charge}
                        rounded
                        thumbnail
                        width={200}
                        height={200}
                        className="mb-2"
                        style={{ border: 'none' }}
                    />
                    <div className='d-flex flex-column align-items-center'>
                        <CFormLabel className='fs-2'>Нэмэлт төлбөр</CFormLabel>
                        <CFormLabel>Бараанд нэмж болох сонголтуудын багцийг үүсгэнэ</CFormLabel>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <CButton color='primary' className='my-2' onClick={handleModal}>
                            Төлбөр нэмэх
                        </CButton>
                    </div>
                </CCardBody>
            </CCard>
            <AddExtraCharge visible={visible} onClose={handleModal} /> {/* Show AddExtraCharge modal */}
        </main>
    );
};

export default ExtraCharge;
