import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormLabel,
    CFormInput,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CModalFooter,
} from '@coreui/react';

const AddExtraCharge = ({ visible, onClose }) => {
    const [chargeName, setChargeName] = useState('');
    const [chargeAmount, setChargeAmount] = useState('');

    const handleSave = () => {
        // Implement save logic here
        console.log('Extra Charge Added:', { chargeName, chargeAmount });
        onClose(); // Close the modal after saving
    };

    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>Нэмэлт төлбөр нэмэх</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCard>
                    <CCardHeader>Нэмэлт төлбөрийн мэдээлэл</CCardHeader>
                    <CCardBody>
                        <div className='mb-3'>
                            <CFormLabel>Төлбөрийн нэр</CFormLabel>
                            <CFormInput
                                type='text'
                                placeholder='Төлбөрийн нэр'
                                value={chargeName}
                                onChange={(e) => setChargeName(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Төлбөрийн дүн</CFormLabel>
                            <CFormInput
                                type='number'
                                placeholder='Төлбөрийн дүн'
                                value={chargeAmount}
                                onChange={(e) => setChargeAmount(e.target.value)}
                            />
                        </div>
                    </CCardBody>
                </CCard>
            </CModalBody>
            <CModalFooter>
                <CButton color='secondary' onClick={onClose}>
                    Хаах
                </CButton>
                <CButton color='primary' onClick={handleSave}>
                    Хадгалах
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

// Define prop types
AddExtraCharge.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddExtraCharge;
