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
import { CFormSwitch } from '@coreui/react';
import { cilSettings } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import ProductList from './productlist';


const Product = () => {
    const [showProductSection, setShowProductSection] = useState(false);
    const [showCategorySection, setShowCategorySection] = useState(false);
    const [showExtraSection, setShowExtraSection] = useState(false);
    const [visible, setVisible] = useState(false);

    return (
        <div className="app-container d-flex flex-column">
            <CNavbar expand="lg" className="border rounded-3">
                <CContainer fluid>
                    <CNavbarBrand>
                        <h3>
                            <CIcon icon={cilSettings} /> Бараа
                        </h3>
                    </CNavbarBrand>
                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarNav>
                        <CNavItem className={`${showProductSection ? 'border-bottom fw-bold' : ''}`}>
                                <CNavLink
                                    active
                                    onClick={() => {
                                        setShowCategorySection(false);
                                        setShowExtraSection(false);
                                        setShowProductSection(true);
                                    }}
                                >
                                    Барааны жагсаалт
                                </CNavLink>
                            </CNavItem>
                           <CNavItem className={`${showCategorySection ? 'border-bottom fw-bold': ''}`}>
                            <CNavLink
                            active
                            onClick={()=>{
                                        
                                        setShowExtraSection(false);
                                        setShowProductSection(false);
                                        setShowCategorySection(true);
                            }}>
                                Нэмэлт төлбөр
                            </CNavLink>
                            </CNavItem>
                            <CNavItem className={`${showExtraSection ? 'border-bottom fw-bold': ''}`}>
                            <CNavLink
                            active
                            onClick={()=>{
                                        
                                        setShowExtraSection(true);
                                        setShowProductSection(false);
                                        setShowCategorySection(false);
                            }}>
                                Категор
                            </CNavLink>

                           </CNavItem>
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>
            {showProductSection && <ProductList />}
        </div>
    );
};

export default Product;
