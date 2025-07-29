import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  Fa42Group,
  FaComputer,
  FaLaptopCode,
  FaQrcode,
  FaStore,
  FaTerminal,
  FaUser,
  FaUserGroup,
} from "react-icons/fa6";

import { CBadge, CNavGroup, CNavLink, CSidebarNav } from "@coreui/react";
import { MdTask } from "react-icons/md";

export const AppSidebarNav = ({ items }) => {
  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink {...(rest.to && { as: NavLink })} {...rest}>
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    );
  };

  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item;
    const Component = component;
    return (
      <Component
        compact
        as="div"
        key={index}
        toggler={navLink(name, icon)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    );
  };

  const defaultItems = [
    {
      component: "CNavItem",
      name: ` Хөгжүүлэгчийн түүх`,
      to: "/developer-history",
      icon: <FaLaptopCode style={{ opacity: "0.3", marginRight: "15px" }} />,
    },
    {
      component: "CNavItem",
      name: `Quick QR Code`,
      to: "/qpay-merchants",
      icon: <FaQrcode style={{ opacity: "0.3", marginRight: "15px" }} />,
    },
    {
      component: "CNavItem",
      name: `Терминал`,
      to: "/terminal-page",
      icon: <FaTerminal style={{ opacity: "0.3", marginRight: "15px" }} />,
    },
    {
      component: "CNavItem",
      name: `Системийн хэрэглэгчид`,
      to: "/user-accounts",
      icon: <FaUser style={{ opacity: "0.3", marginRight: "15px" }} />,
    },
    {
      component: "CNavItem",
      name: `Мерчантс`,
      to: "/get-merchants",
      icon: <FaUserGroup style={{ opacity: "0.3", marginRight: "15px" }} />,
    },
    {
      component: "CNavItem",
      name: `Салбар`,
      to: "/get-branches",
      icon: <FaStore style={{ opacity: "0.3", marginRight: "15px" }} />,
    },
    {
      component: "CNavItem",
      name: `Төхөөрөмжүүд`,
      to: "/get-terminals",
      icon: <FaComputer style={{ opacity: "0.3", marginRight: "15px" }} />,
    },
    {
      component: "CNavItem",
      name: `Task`,
      to: "/tasks",
      icon: <MdTask style={{ opacity: "0.3", marginRight: "15px" }} />,
    },
  ];

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      {defaultItems.map((item, index) => navItem(item, index))}
    </CSidebarNav>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
