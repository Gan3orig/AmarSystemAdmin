import React, { useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { MdCheckBox, MdMore } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";

const BranchMobileTable = ({ branches = [] }) => {
  const [selectedBranchCodes, setSelectedBranchCodes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (branches.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500">Салбар олдсонгүй</p>
    );
  }

  const handleCheckboxChange = (branchCode) => {
    setSelectedBranchCodes((prev) =>
      prev.includes(branchCode)
        ? prev.filter((code) => code !== branchCode)
        : [...prev, branchCode],
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <div
        id="table_selected_header"
        className="flex justify-between items-center bg-accent p-2"
      >
        <p className="font-light text-sm">
          {selectedBranchCodes.length === 0
            ? "Сонгосон салбар байхгүй"
            : `${selectedBranchCodes.length} салбар сонгосон байна`}
        </p>
      </div>

      <CTable className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
        <CTableHead>
          <CTableRow className="bg-accent/60 border-b border-gray-200">
            <CTableHeaderCell className="py-2 px-1 w-[10%] text-left font-light text-sm">
              <MdCheckBox size={20} />
            </CTableHeaderCell>
            <CTableHeaderCell className="py-2 px-1 w-[10%] text-left font-light text-sm">
              №
            </CTableHeaderCell>
            <CTableHeaderCell className="py-2 px-1 w-[40%] text-left font-light text-sm">
              Нэр
            </CTableHeaderCell>
            <CTableHeaderCell className="py-2 px-1 w-[30%] text-left font-light text-sm">
              Код
            </CTableHeaderCell>
            <CTableHeaderCell className="py-2 px-1 w-[10%] text-left font-light text-sm">
              ...
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {branches.map((branch, index) => (
            <React.Fragment key={branch.branchCode || index}>
              <CTableRow className="border-b border-gray-100 hover:bg-accent/20 transition">
                <CTableDataCell className="py-2 px-1 align-middle text-center">
                  {selectedBranchCodes.includes(branch.branchCode) ? (
                    <MdCheckBox
                      size={20}
                      color="blue"
                      className="cursor-pointer inline"
                      onClick={() => handleCheckboxChange(branch.branchCode)}
                    />
                  ) : (
                    <MdCheckBox
                      size={20}
                      className="cursor-pointer inline"
                      onClick={() => handleCheckboxChange(branch.branchCode)}
                    />
                  )}
                </CTableDataCell>
                <CTableDataCell className="py-2 px-1 align-middle text-center text-sm font-light">
                  {index + 1}
                </CTableDataCell>
                <CTableDataCell className="py-2 px-1 align-middle text-sm font-light truncate">
                  {branch.branchName || "-"}
                </CTableDataCell>
                <CTableDataCell className="py-2 px-1 align-middle text-sm font-light truncate">
                  {branch.branchCode || "-"}
                </CTableDataCell>
                <CTableDataCell className="py-2 px-1 align-middle text-center">
                  {index !== selectedIndex ? (
                    <MdMore
                      size={20}
                      className="cursor-pointer inline"
                      onClick={() => setSelectedIndex(index)}
                    />
                  ) : (
                    <IoClose
                      size={20}
                      className="cursor-pointer inline"
                      onClick={() => setSelectedIndex(null)}
                    />
                  )}
                </CTableDataCell>
              </CTableRow>
              {index === selectedIndex && (
                <CTableRow className="bg-accent/40 border-b border-gray-200 transition">
                  <CTableDataCell colSpan={5} className="p-2">
                    <div className="space-y-2 text-sm font-light">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Футер текст:</span>
                        <span className="text-gray-800 break-all">
                          {typeof branch.footerText === "object"
                            ? JSON.stringify(branch.footerText)
                            : branch.footerText || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Бүртгүүлсэн огноо:
                        </span>
                        <span className="text-gray-800">
                          {branch.createDate
                            ? dayjs(branch.createDate).format("YYYY-MM-DD")
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              )}
            </React.Fragment>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

BranchMobileTable.propTypes = {
  branches: PropTypes.arrayOf(
    PropTypes.shape({
      branchCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      branchName: PropTypes.string,
      footerText: PropTypes.any,
      createDate: PropTypes.any,
    }),
  ),
};

export default BranchMobileTable;
