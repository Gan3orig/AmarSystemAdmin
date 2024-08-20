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
import {cilUser} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import TimeList from './timeList';
import TimeSetting from './timeSettings';
import EmployeeList from './employeeList';
import Settings from './settings';


const Employee = () => {
    const [showTimeList, setShowTimeList] = useState(false);
    const [showTimeSetting, setShowTimeSetting] = useState(false);
    const [showEmployeeList, setShowEmployeeList] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [visible, setVisible] = useState(false);

    return (
        <div className="app-container d-flex flex-column mt-2">
            <CNavbar expand="lg" className="border rounded-3">
                <CContainer fluid>
                    <CNavbarBrand>
                        <h3>
                            Ажилчин
                        </h3>
                    </CNavbarBrand>
                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarNav>
                            <CNavItem className={`${showEmployeeList ? 'border-bottom fw-bold' : ''}`}>
                                <CNavLink
                                    active
                                    onClick={() => {
                                        setShowTimeList(false);
                                        setShowTimeSetting(false);
                                        setShowEmployeeList(true);
                                        setShowSettings(false);
                                    }}
                                >
                                    Ажилчны жагсаалт
                                </CNavLink>
                            </CNavItem>
                            <CNavItem className={`${showSettings ? 'border-bottom fw-bold' : ''}`}>
                                <CNavLink
                                    active
                                    onClick={() => {
                                        setShowEmployeeList(false);
                                        setShowTimeList(false);
                                        setShowTimeSetting(false);
                                        setShowSettings(true);
                                    }}
                                >
                                    Эрхийн тохиргоо
                                </CNavLink>
                            </CNavItem>
                            <CNavItem className={`${showTimeSetting ? 'border-bottom fw-bold' : ''}`}>
                                <CNavLink
                                    active
                                    onClick={() => {
                                        setShowEmployeeList(false);
                                        setShowTimeList(false);
                                        setShowTimeSetting(true);
                                        setShowSettings(false);
                                    }}
                                >
                                    Цагийн тохиргоо
                                </CNavLink>
                            </CNavItem>
                            <CNavItem className={`${showTimeList ? 'border-bottom fw-bold' : ''}`}>
                                <CNavLink
                                    active
                                    onClick={() => {
                                        setShowEmployeeList(false);
                                        setShowTimeList(true);
                                        setShowTimeSetting(false);
                                        setShowSettings(false);
                                    }}
                                > 
                                    Цагын жагсаалт
                                </CNavLink>
                            </CNavItem>
                            
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>
            {showEmployeeList && <EmployeeList />}
            {showSettings && <Settings />}
            {showTimeSetting&& <TimeSetting />}
            {showTimeList && <TimeList />} {/* Display ExtraCharge component for Нэмэлт төлбөр */}
        </div>
    );
};

export default Employee;
