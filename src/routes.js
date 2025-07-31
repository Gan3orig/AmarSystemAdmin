import { element } from "prop-types";
import React from "react";
import QuickQRCode from "./views/pages/QuickQRCode/QuickQRCode";
import TerminalPage from "./views/pages/Terminal/Terminal";
import UserAccounts from "./views/pages/UserAccounts/UserAccounts";
import GetMerchants from "./views/pages/GetMerchants/GetMerchants";
import GetBranches from "./views/pages/GetBranches/GetBranches";
import GetTerminals from "./views/pages/GetTerminals/GetTerminals";
import QpayMerchantsPage from "./views/pages/QpayMerchants/QpayMerchantsPage";
import TasksBoard from "./views/pages/Tasks/TasksBoard";
import BanksPage from "./views/pages/Banks/BanksPage";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const DeveloperHistory = React.lazy(
  () => import("./views/pages/DeveloperHistory/DeveloperHistory"),
);
//adminPanel
const Admin = React.lazy(() => import("./views/admin/admin"));
const terminalMap = React.lazy(() => import("./views/admin/terminalMap"));

//regastration

const productList = React.lazy(
  () => import("./views/registration/productlist"),
);
const customer = React.lazy(() => import("./views/registration/customer"));

//flow
// const cashFlow = React.lazy(() => import('./views/flow/cashFlow'));
// const itemTransaction = React.lazy(() => import('./views/flow/itemTransaction'));
// const count = React.lazy(() => import('./views/flow/count'));
// const payReceiveable = React.lazy(() => import('./views/flow/payReceiveable'));
// const cardTransaction = React.lazy(() => import('./views/flow/cardTransaction'));

//Settings
const Settings = React.lazy(() => import("./views/settings/setting"));
const Branch = React.lazy(() => import("./views/settings/branch"));
const Terminal = React.lazy(() => import("./views/settings/terminal"));

// Base
const Accordion = React.lazy(() => import("./views/base/accordion/Accordion"));
const Breadcrumbs = React.lazy(
  () => import("./views/base/breadcrumbs/Breadcrumbs"),
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const ListGroups = React.lazy(
  () => import("./views/base/list-groups/ListGroups"),
);
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(
  () => import("./views/base/paginations/Paginations"),
);
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const Progress = React.lazy(() => import("./views/base/progress/Progress"));
const Spinners = React.lazy(() => import("./views/base/spinners/Spinners"));
const Tables = React.lazy(() => import("./views/base/tables/Tables"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));

// Buttons
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const ButtonGroups = React.lazy(
  () => import("./views/buttons/button-groups/ButtonGroups"),
);
const Dropdowns = React.lazy(
  () => import("./views/buttons/dropdowns/Dropdowns"),
);

//Forms
const ChecksRadios = React.lazy(
  () => import("./views/forms/checks-radios/ChecksRadios"),
);
const FloatingLabels = React.lazy(
  () => import("./views/forms/floating-labels/FloatingLabels"),
);
const FormControl = React.lazy(
  () => import("./views/forms/form-control/FormControl"),
);
const InputGroup = React.lazy(
  () => import("./views/forms/input-group/InputGroup"),
);
const Layout = React.lazy(() => import("./views/forms/layout/Layout"));
const Range = React.lazy(() => import("./views/forms/range/Range"));
const Select = React.lazy(() => import("./views/forms/select/Select"));
const Validation = React.lazy(
  () => import("./views/forms/validation/Validation"),
);
const Charts = React.lazy(() => import("./views/charts/Charts"));

// Icons
const CoreUIIcons = React.lazy(
  () => import("./views/icons/coreui-icons/CoreUIIcons"),
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));

// Notifications
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Toasts = React.lazy(() => import("./views/notifications/toasts/Toasts"));

const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(
  () => import("./views/theme/typography/Typography"),
);
const Employee = React.lazy(() => import("./views/employee/employee"));

const role = localStorage.getItem("role");

const routes = [
  { path: "/", exact: true, name: "Нүүр" },
  { path: "/dashboard", name: "Хянах самбар", element: Dashboard },
  {
    path: "/developer-history",
    name: "Хөгжүүлэгчийн түүх",
    element: DeveloperHistory,
  },
  {
    path: "/quick-qr-code",
    name: "Quick QR Code",
    element: QuickQRCode,
  },
  {
    path: "/qpay-merchants",
    name: "Qpay merchants",
    element: QpayMerchantsPage,
  },
  {
    path: "/terminal-page",
    name: "Терминал",
    element: TerminalPage,
  },
  {
    path: "/user-accounts",
    name: "Хэрэглэгчид",
    element: UserAccounts,
  },
  {
    path: "/get-branches",
    name: "Салбар",
    element: GetBranches,
  },
  {
    path: "/get-terminals",
    name: "Терминал",
    element: GetTerminals,
  },
  {
    path: "/get-merchants",
    name: "Хэрэглэгчид",
    element: GetMerchants,
  },
  { path: "/settings", name: "Тохиргоо", element: Settings },
  // terminalMap -> terminal-page
  { path: "/terminalMap", name: "Терминал", element: TerminalPage },
  { path: "/admin", name: "Админ", element: Admin },
  { path: "/tasks", name: "Ажил", element: TasksBoard },
  ...(role === "admin"
    ? [
        { path: "/theme", name: "Theme", element: Colors, exact: true },

        { path: "/theme/colors", name: "Colors", element: Colors },
        { path: "/theme/typography", name: "Typography", element: Typography },
        { path: "/base", name: "Base", element: Cards, exact: true },
        { path: "/base/accordion", name: "Accordion", element: Accordion },
        {
          path: "/base/breadcrumbs",
          name: "Breadcrumbs",
          element: Breadcrumbs,
        },
        { path: "/base/cards", name: "Cards", element: Cards },
        { path: "/base/carousels", name: "Carousel", element: Carousels },
        { path: "/base/collapses", name: "Collapse", element: Collapses },
        { path: "/base/list-groups", name: "List Groups", element: ListGroups },
        { path: "/base/navs", name: "Navs", element: Navs },
        {
          path: "/base/paginations",
          name: "Paginations",
          element: Paginations,
        },
        // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
        { path: "/employee", name: "Ажилчин", element: Employee },
        { path: "/base/popovers", name: "Popovers", element: Popovers },
        { path: "/base/progress", name: "Progress", element: Progress },
        { path: "/base/spinners", name: "Spinners", element: Spinners },
        { path: "/base/tables", name: "Tables", element: Tables },
        { path: "/base/tooltips", name: "Tooltips", element: Tooltips },
        { path: "/buttons", name: "Buttons", element: Buttons, exact: true },
        { path: "/buttons/buttons", name: "Buttons", element: Buttons },
        { path: "/buttons/dropdowns", name: "Dropdowns", element: Dropdowns },
        {
          path: "/buttons/button-groups",
          name: "Button Groups",
          element: ButtonGroups,
        },
        { path: "/charts", name: "Charts", element: Charts },
        { path: "/forms", name: "Forms", element: FormControl, exact: true },
        {
          path: "/forms/form-control",
          name: "Form Control",
          element: FormControl,
        },
        { path: "/forms/select", name: "Select", element: Select },
        {
          path: "/forms/checks-radios",
          name: "Checks & Radios",
          element: ChecksRadios,
        },
        { path: "/forms/range", name: "Range", element: Range },
        {
          path: "/forms/input-group",
          name: "Input Group",
          element: InputGroup,
        },
        {
          path: "/forms/floating-labels",
          name: "Floating Labels",
          element: FloatingLabels,
        },
        { path: "/forms/layout", name: "Layout", element: Layout },
        { path: "/forms/validation", name: "Validation", element: Validation },
        { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
        {
          path: "/icons/coreui-icons",
          name: "CoreUI Icons",
          element: CoreUIIcons,
        },
        { path: "/icons/flags", name: "Flags", element: Flags },
        { path: "/icons/brands", name: "Brands", element: Brands },
        {
          path: "/notifications",
          name: "Notifications",
          element: Alerts,
          exact: true,
        },
        { path: "/notifications/alerts", name: "Alerts", element: Alerts },
        { path: "/notifications/badges", name: "Badges", element: Badges },
        { path: "/notifications/modals", name: "Modals", element: Modals },
        { path: "/notifications/toasts", name: "Toasts", element: Toasts },
        { path: "/widgets", name: "Widgets", element: Widgets },

        //settings
        { path: "/settings", name: "Тохиргоо", element: Settings },
        { path: "/settings/branch", name: "Салбарууд", element: Branch },
        { path: "/settings/Terminal", name: "Төхөөрөмжүүд", element: Terminal },
      ]
    : [
        { path: "/theme/colors", name: "Colors", element: Colors },
        { path: "/theme/typography", name: "Typography", element: Typography },
        { path: "/base", name: "Base", element: Cards, exact: true },
        { path: "/base/accordion", name: "Accordion", element: Accordion },
        {
          path: "/base/breadcrumbs",
          name: "Breadcrumbs",
          element: Breadcrumbs,
        },
        { path: "/base/cards", name: "Cards", element: Cards },
        { path: "/base/carousels", name: "Carousel", element: Carousels },
        { path: "/base/collapses", name: "Collapse", element: Collapses },
        { path: "/base/list-groups", name: "List Groups", element: ListGroups },
        { path: "/base/navs", name: "Navs", element: Navs },
        {
          path: "/base/paginations",
          name: "Paginations",
          element: Paginations,
        },
        // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
        { path: "/employee", name: "Ажилчин", element: Employee },
        { path: "/base/popovers", name: "Popovers", element: Popovers },
        { path: "/base/progress", name: "Progress", element: Progress },
        { path: "/base/spinners", name: "Spinners", element: Spinners },
        { path: "/base/tables", name: "Tables", element: Tables },
        { path: "/base/tooltips", name: "Tooltips", element: Tooltips },
        { path: "/buttons", name: "Buttons", element: Buttons, exact: true },
        { path: "/buttons/buttons", name: "Buttons", element: Buttons },
        { path: "/buttons/dropdowns", name: "Dropdowns", element: Dropdowns },
        {
          path: "/buttons/button-groups",
          name: "Button Groups",
          element: ButtonGroups,
        },
        { path: "/charts", name: "Charts", element: Charts },
        { path: "/forms", name: "Forms", element: FormControl, exact: true },
        {
          path: "/forms/form-control",
          name: "Form Control",
          element: FormControl,
        },
        { path: "/forms/select", name: "Select", element: Select },
        {
          path: "/forms/checks-radios",
          name: "Checks & Radios",
          element: ChecksRadios,
        },
        { path: "/forms/range", name: "Range", element: Range },
        {
          path: "/forms/input-group",
          name: "Input Group",
          element: InputGroup,
        },
        {
          path: "/forms/floating-labels",
          name: "Floating Labels",
          element: FloatingLabels,
        },
        { path: "/forms/layout", name: "Layout", element: Layout },
        { path: "/forms/validation", name: "Validation", element: Validation },
        { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
        {
          path: "/icons/coreui-icons",
          name: "CoreUI Icons",
          element: CoreUIIcons,
        },
        { path: "/icons/flags", name: "Flags", element: Flags },
        { path: "/icons/brands", name: "Brands", element: Brands },
        {
          path: "/notifications",
          name: "Notifications",
          element: Alerts,
          exact: true,
        },
        { path: "/notifications/alerts", name: "Alerts", element: Alerts },
        { path: "/notifications/badges", name: "Badges", element: Badges },
        { path: "/notifications/modals", name: "Modals", element: Modals },
        { path: "/notifications/toasts", name: "Toasts", element: Toasts },
        { path: "/banks", name: "Банк", element: BanksPage },
        { path: "/widgets", name: "Widgets", element: Widgets },

        //settings
        { path: "/settings", name: "Тохиргоо", element: Settings },
        { path: "/settings/branch", name: "Салбарууд", element: Branch },
        { path: "/settings/terminal", name: "Төхөөрөмжүүд", element: Terminal },

        //registration
        {
          path: "/registration/productList",
          name: "Бүртгэл",
          element: productList,
        },
        {
          path: "/registration/customer",
          name: "Харилцагч",
          element: customer,
        },
      ]),
];

export default routes;
