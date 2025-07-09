import React, { useState } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CFormInput,
  CButton,
  CButtonGroup,
} from "@coreui/react";
import { FaChevronDown } from "react-icons/fa6";

const columnTitles = [
  { key: "todo", title: "Хийх", bg: "blue" },
  { key: "doing", title: "Хийж байгаа", bg: "orange" },
  { key: "done", title: "Хийсэн", bg: "green" },
  { key: "error", title: "Алдаа", bg: "red" },
];

const TasksBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    done: [],
    error: [],
  });

  const [inputs, setInputs] = useState({
    todo: "",
    doing: "",
    done: "",
    error: "",
  });

  const handleInputChange = (columnKey, value) => {
    setInputs((prev) => ({ ...prev, [columnKey]: value }));
  };

  const handleAddTask = (columnKey) => {
    const value = inputs[columnKey].trim();
    if (value === "") return;
    setTasks((prev) => ({
      ...prev,
      [columnKey]: [...prev[columnKey], value],
    }));
    setInputs((prev) => ({ ...prev, [columnKey]: "" }));
  };

  return (
    <div>
      <CRow className="g-4">
        {columnTitles.map(({ key, title, bg }) => (
          <CCol md={3} sm={6} xs={12} key={key}>
            <CCard className={`h-100`}>
              <CCardHeader
                style={{ backgroundColor: bg }}
                className="text-center fw-bold"
              >
                {title}
              </CCardHeader>
              <CCardBody>
                <CListGroup className="mb-3">
                  {tasks[key].map((task, idx) => (
                    <CListGroupItem key={`${key}-${idx}`}>
                      {task}
                      <FaChevronDown
                        onClick={() => console.log("open modal")}
                        className="float-end"
                      />
                    </CListGroupItem>
                  ))}
                </CListGroup>
                <CFormInput
                  placeholder="Шинэ ажил..."
                  value={inputs[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTask(key);
                    }
                  }}
                />
                <CButtonGroup className="mt-2 d-flex justify-content-end">
                  <CButton
                    color="primary"
                    size="sm"
                    onClick={() => handleAddTask(key)}
                  >
                    Нэмэх
                  </CButton>
                </CButtonGroup>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default TasksBoard;
