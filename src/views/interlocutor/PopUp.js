import React, { useState } from 'react';
import {
    CCollapse,
    CContainer,
    CNavbar,
    CNavbarNav,
    CNavItem,
    CNavLink,
    CNavbarBrand,
    CCardHeader,
    CCardBody,
    CNav,
    CFormLabel
} from '@coreui/react';

const PopUp = () => {
    const [selectedTab, setSelectedTab] = useState('Жилээр');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className="app-container d-flex flex-column">
            <CCardHeader>
                Төлбөртэй нэмэлт үйлчилгээ
            </CCardHeader>
            <CCardHeader>
                <CNav variant="tabs" className="card-header-tabs">
                    <CNavItem>
                        <CNavLink active={selectedTab === 'Жилээр'} onClick={() => handleTabClick('Жилээр')}>
                            Жилээр
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink active={selectedTab === 'Сараар'} onClick={() => handleTabClick('Сараар')}>
                            Сараар
                        </CNavLink>
                    </CNavItem>
                </CNav>
            </CCardHeader>
            <CFormLabel>Amar 2.0 Store</CFormLabel>
            {selectedTab === 'Жилээр' && (
                <div>
                    ₮360,000 / анх суулгах
                    <br />
                    Кассын борлуулалт
                    <br />
                    Үнийн шошго
                    <br />
                    Төлбөрийн төрлүүд
                    <br />
                    Бараа материал
                    <br />
                    Хяналт тооллого тооцоо
                </div>
            )}
            {selectedTab === 'Сараар' && (
                <div>
                    {/* Add the content for the "Сараар" tab here */}
                </div>
            )}

            <CCardBody>
                {/* Add content for CCardBody if needed */}
            </CCardBody>

            <CNavbar expand="lg" className="border rounded-3">
                <CContainer fluid>
                    {/* Add content for CNavbar if needed */}
                </CContainer>
            </CNavbar>
        </div>
    );
};

export default PopUp;
