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
import { cilSettings } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import ProductList from './productlist';
import Category from './categories';
import ExtraCharge from './extraCharge'; 
import {useTranslation} from 'react-i18next';

const Product = () => {
    const [showProductSection, setShowProductSection] = useState(false);
    const [showCategorySection, setShowCategorySection] = useState(false);
    const [showExtraSection, setShowExtraSection] = useState(false);
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="app-container d-flex flex-column">
            <CNavbar expand="lg" className="border rounded-3">
                <CContainer fluid>
                    <CNavbarBrand>
                        <h3>
                            <CIcon icon={cilSettings} /> {t('Бараа')}
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
                                    {t('Барааны жагсаалт')}
                                </CNavLink>
                            </CNavItem>
                            <CNavItem className={`${showCategorySection ? 'border-bottom fw-bold' : ''}`}>
                                <CNavLink
                                    active
                                    onClick={() => {
                                        setShowExtraSection(false);
                                        setShowProductSection(false);
                                        setShowCategorySection(true);
                                    }}
                                >
                                    {t('Категор')}
                                </CNavLink>
                            </CNavItem>
                            <CNavItem className={`${showExtraSection ? 'border-bottom fw-bold' : ''}`}>
                                <CNavLink
                                    active
                                    onClick={() => {
                                        setShowExtraSection(true);
                                        setShowProductSection(false);
                                        setShowCategorySection(false);
                                    }}
                                >
                                    {t('Нэмэлт төлбөр')}
                                </CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>
            {showProductSection && <ProductList />}
            {showCategorySection && <Category />}
            {showExtraSection && <ExtraCharge />}
        </div>
    );
};

export default Product;
