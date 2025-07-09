// import React, { useState } from "react";
// import dayjs from "dayjs";
// import PropTypes from "prop-types";
// import { MdCheckBox, MdMore } from "react-icons/md";
// import { IoClose } from "react-icons/io5";
// import {
//   CTable,
//   CTableHead,
//   CTableRow,
//   CTableHeaderCell,
//   CTableBody,
//   CTableDataCell,
// } from "@coreui/react";

// const MerchantsMobileTable = ({ users = [] }) => {
//   const [selectedUserIds, setSelectedUserIds] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(null);

//   if (users.length === 0) {
//     return (
//       <p className="text-center text-sm text-gray-500">Байгууллага олдсонгүй</p>
//     );
//   }

//   const handleCheckboxChange = (userId) => {
//     setSelectedUserIds((prev) =>
//       prev.includes(userId)
//         ? prev.filter((id) => id !== userId)
//         : [...prev, userId],
//     );
//   };

//   return (
//     <div className="w-full overflow-x-auto">
//       <div
//         id="table_selected_header"
//         className="flex justify-between items-center bg-accent p-2"
//       >
//         <p className="font-light text-sm">
//           {selectedUserIds.length === 0
//             ? "Сонгосон байгууллага байхгүй"
//             : `${selectedUserIds.length} байгууллага сонгосон байна`}
//         </p>
//       </div>

//       <CTable className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
//         <CTableHead>
//           <CTableRow className="bg-accent/60 border-b border-gray-200">
//             <CTableHeaderCell className="py-2 px-1 w-[10%] text-left font-light text-sm">
//               <MdCheckBox size={20} />
//             </CTableHeaderCell>
//             <CTableHeaderCell className="py-2 px-1 w-[10%] text-left font-light text-sm">
//               №
//             </CTableHeaderCell>
//             <CTableHeaderCell className="py-2 px-1 w-[40%] text-left font-light text-sm">
//               Нэр
//             </CTableHeaderCell>
//             <CTableHeaderCell className="py-2 px-1 w-[30%] text-left font-light text-sm">
//               И-мэйл
//             </CTableHeaderCell>
//             <CTableHeaderCell className="py-2 px-1 w-[10%] text-left font-light text-sm">
//               ...
//             </CTableHeaderCell>
//           </CTableRow>
//         </CTableHead>
//         <CTableBody>
//           {users.map((user, index) => (
//             <React.Fragment key={user.id || index}>
//               <CTableRow className="border-b border-gray-100 hover:bg-accent/20 transition">
//                 <CTableDataCell className="py-2 px-1 align-middle text-center">
//                   {selectedUserIds.includes(user.id) ? (
//                     <MdCheckBox
//                       size={20}
//                       color="blue"
//                       className="cursor-pointer inline"
//                       onClick={() => handleCheckboxChange(user.id)}
//                     />
//                   ) : (
//                     <MdCheckBox
//                       size={20}
//                       className="cursor-pointer inline"
//                       onClick={() => handleCheckboxChange(user.id)}
//                     />
//                   )}
//                 </CTableDataCell>
//                 <CTableDataCell className="py-2 px-1 align-middle text-center text-sm font-light">
//                   {index + 1}
//                 </CTableDataCell>
//                 <CTableDataCell className="py-2 px-1 align-middle text-sm font-light truncate">
//                   {user.merchantName || "-"}
//                 </CTableDataCell>
//                 <CTableDataCell className="py-2 px-1 align-middle text-sm font-light truncate">
//                   {user.email || "-"}
//                 </CTableDataCell>
//                 <CTableDataCell className="py-2 px-1 align-middle text-center">
//                   {index !== selectedIndex ? (
//                     <MdMore
//                       size={20}
//                       className="cursor-pointer inline"
//                       onClick={() => setSelectedIndex(index)}
//                     />
//                   ) : (
//                     <IoClose
//                       size={20}
//                       className="cursor-pointer inline"
//                       onClick={() => setSelectedIndex(null)}
//                     />
//                   )}
//                 </CTableDataCell>
//               </CTableRow>
//               {index === selectedIndex && (
//                 <CTableRow className="bg-accent/40 border-b border-gray-200 transition">
//                   <CTableDataCell colSpan={5} className="p-2">
//                     <div className="space-y-2 text-sm font-light">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Утас:</span>
//                         <span className="text-gray-800 break-all">
//                           {user.phone || "-"}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">
//                           Бүртгүүлсэн огноо:
//                         </span>
//                         <span className="text-gray-800">
//                           {user.createDate
//                             ? dayjs(user.createDate).format("YYYY-MM-DD")
//                             : "-"}
//                         </span>
//                       </div>
//                     </div>
//                   </CTableDataCell>
//                 </CTableRow>
//               )}
//             </React.Fragment>
//           ))}
//         </CTableBody>
//       </CTable>
//     </div>
//   );
// };

// MerchantsMobileTable.propTypes = {
//   users: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       merchantName: PropTypes.string,
//       email: PropTypes.string,
//       phone: PropTypes.string,
//       createDate: PropTypes.any,
//     }),
//   ),
// };

// export default MerchantsMobileTable;
