import React, { useState } from 'react';
import {
    CCollapse,
    CContainer,
    CNavbar,
    CNavbarNav,
    CNavItem,
    CNavLink,
    CNavbarBrand,
    CNavbarToggler,
} from '@coreui/react';
import PopUp from './PopUp'; // Ensure that PopUp is correctly imported

const Interlocutor = () => {
    const [showPopUp, setShowPopUp] = useState(false);

    const handleNavbarClick = () => {
        setShowPopUp(true);
    };

    return (
        <div className="app-container d-flex flex-column">
            <CNavbar expand="lg" className="border rounded-3" onClick={handleNavbarClick}>
                <CContainer fluid>
                    <CNavbarBrand>
                        <h3>
                            Харилцагч
                        </h3>
                    </CNavbarBrand>
                </CContainer>
            </CNavbar>

            {showPopUp && <PopUp />} {/* Render PopUp when showPopUp is true */}
        </div>
    );
};

export default Interlocutor;
