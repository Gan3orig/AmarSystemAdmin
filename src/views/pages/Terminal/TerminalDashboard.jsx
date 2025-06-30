// import React from "react";
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CCardGroup,
// } from "@coreui/react";

// const TerminalDashboard = ({ terminalData }) => {
//   return (
//     <CCardGroup>
//       <CRow>
//         <CCol xs={12}>
//           <CCard className="mb-4">
//             <CCardHeader>
//               <strong>Терминалын мэдээлэл</strong>
//             </CCardHeader>
//             <CCardBody>
//               <CRow>
//                 <CCol md={6}>
//                   <CCard>
//                     <CCardHeader>Үндсэн мэдээлэл</CCardHeader>
//                     <CCardBody>
//                       <p>
//                         <strong>ID:</strong> {terminalData.id}
//                       </p>
//                       <p>
//                         <strong>Бүртгэлийн дугаар:</strong>{" "}
//                         {terminalData.register_number}
//                       </p>
//                       <p>
//                         <strong>Нэр:</strong> {terminalData.name}
//                       </p>
//                       <p>
//                         <strong>MCC код:</strong> {terminalData.mcc_code}
//                       </p>
//                     </CCardBody>
//                   </CCard>
//                 </CCol>
//                 <CCol md={6}>
//                   <CCard>
//                     <CCardHeader>Холбоо барих мэдээлэл</CCardHeader>
//                     <CCardBody>
//                       <p>
//                         <strong>Хот:</strong> {terminalData.city}
//                       </p>
//                       <p>
//                         <strong>Дүүрэг:</strong> {terminalData.district}
//                       </p>
//                       <p>
//                         <strong>Хаяг:</strong> {terminalData.address}
//                       </p>
//                       <p>
//                         <strong>Утас:</strong> {terminalData.phone}
//                       </p>
//                       <p>
//                         <strong>И-мэйл:</strong> {terminalData.email}
//                       </p>
//                     </CCardBody>
//                   </CCard>
//                 </CCol>
//               </CRow>
//               <CRow className="mt-4">
//                 <CCol md={6}>
//                   <CCard>
//                     <CCardHeader>Эзэмшигчийн мэдээлэл</CCardHeader>
//                     <CCardBody>
//                       <p>
//                         <strong>Эзэмшигчийн регистр:</strong>{" "}
//                         {terminalData.owner_register_no || "Мэдээлэл байхгүй"}
//                       </p>
//                       <p>
//                         <strong>Эзэмшигчийн нэр:</strong>{" "}
//                         {terminalData.owner_first_name || "Мэдээлэл байхгүй"}
//                       </p>
//                       <p>
//                         <strong>Эзэмшигчийн овог:</strong>{" "}
//                         {terminalData.owner_last_name || "Мэдээлэл байхгүй"}
//                       </p>
//                     </CCardBody>
//                   </CCard>
//                 </CCol>
//                 <CCol md={6}>
//                   <CCard>
//                     <CCardHeader>Нэмэлт мэдээлэл</CCardHeader>
//                     <CCardBody>
//                       <p>
//                         <strong>Байгууллагын нэр:</strong>{" "}
//                         {terminalData.company_name || "Мэдээлэл байхгүй"}
//                       </p>
//                       <p>
//                         <strong>Англи нэр:</strong>{" "}
//                         {terminalData.name_eng || "Мэдээлэл байхгүй"}
//                       </p>
//                       <p>
//                         <strong>Vendor ID:</strong>{" "}
//                         {terminalData.vendorId || "Мэдээлэл байхгүй"}
//                       </p>
//                       <p>
//                         <strong>Байршил (өргөрөг):</strong>{" "}
//                         {terminalData.location_lat || "Мэдээлэл байхгүй"}
//                       </p>
//                       <p>
//                         <strong>Байршил (уртраг):</strong>{" "}
//                         {terminalData.location_lng || "Мэдээлэл байхгүй"}
//                       </p>
//                     </CCardBody>
//                   </CCard>
//                 </CCol>
//               </CRow>
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </CCardGroup>
//   );
// };

// export default TerminalDashboard;
