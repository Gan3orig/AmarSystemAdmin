import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CImage, CButton, CFormLabel } from '@coreui/react';
import settingImage from './photos/icons8-setting-96.png'; // Renamed import for clarity
import Addsetting from './Addsetting'; // Import the Addsetting component

const Settings = () => {
    const [isAddSettingVisible, setIsAddSettingVisible] = useState(false);

    const handleShowAddSetting = () => {
        setIsAddSettingVisible(true);
    };

    if (isAddSettingVisible) {
        return <Addsetting />;
    }

    return (
        <main className='mx-2 mt-2'>
            <CCard>
                <CCardHeader>Эрхийн тохиргоо</CCardHeader>
                <CCardBody className='text-center'>
                    <CImage
                        src={settingImage} // Updated variable name
                        rounded
                        thumbnail
                        width={200}
                        height={200}
                        className="mb-2"
                        style={{ border: 'none' }}
                    />
                    <div className='d-flex flex-column align-items-center'>
                        <CFormLabel className='fs-2'>Эрхийн тохиргоо</CFormLabel>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <CButton color='primary' className='my-2' onClick={handleShowAddSetting}>
                            Эрх нэмэх 
                        </CButton>
                    </div>
                </CCardBody>
            </CCard>
        </main>
    );
};

export default Settings;
