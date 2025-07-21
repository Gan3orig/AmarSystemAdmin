import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CFormInput,
  CFormSelect,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CBadge,
  CTooltip,
  CSpinner,
  CProgress,
  CAlert,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import {
  IoEye,
  IoCheckmarkDone,
  IoWarning,
  IoTime,
  IoList,
  IoSync,
  IoCalendarOutline,
  IoPersonOutline,
  IoFlagOutline,
} from "react-icons/io5";
import { MdEdit, MdDelete, MdAccessTime } from "react-icons/md";
import { FaPlus, FaCalendarAlt, FaFilter, FaSearch } from "react-icons/fa";

const columnTitles = [
  {
    key: "todo",
    title: "Хийх",
    bg: "#E3F2FD",
    color: "#1976D2",
    icon: <IoList />,
  },
  {
    key: "doing",
    title: "Хийж байгаа",
    bg: "#FFF3E0",
    color: "#F57C00",
    icon: <IoSync />,
  },
  {
    key: "done",
    title: "Хийсэн",
    bg: "#E8F5E9",
    color: "#388E3C",
    icon: <IoCheckmarkDone />,
  },
  {
    key: "error",
    title: "Алдаа",
    bg: "#FFEBEE",
    color: "#D32F2F",
    icon: <IoWarning />,
  },
];

const priorityColors = {
  high: "#ef5350",
  medium: "#ffa726",
  low: "#66bb6a",
};

const TasksBoard = () => {
  const defaultColumns = { todo: [], doing: [], done: [], error: [] };

  const [projects, setProjects] = useState([
    { id: "project-1", name: "Төсөл 1", description: "Төслийн тайлбар" },
  ]);

  const [selectedProject, setSelectedProject] = useState("project-1");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [tasks, setTasks] = useState({
    "project-1": { ...defaultColumns },
  });

  const [inputs, setInputs] = useState({
    todo: "",
    doing: "",
    done: "",
    error: "",
  });

  const [dueDates, setDueDates] = useState({
    todo: "",
    doing: "",
    done: "",
    error: "",
  });

  const [projectModalVisible, setProjectModalVisible] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleInputChange = (columnKey, value) => {
    setInputs((prev) => ({ ...prev, [columnKey]: value }));
  };

  const handleDueDateChange = (columnKey, value) => {
    setDueDates((prev) => ({ ...prev, [columnKey]: value }));
  };

  const handleAddTask = async (columnKey) => {
    const value = inputs[columnKey].trim();
    if (value === "") {
      showNotificationMessage("Даалгаврын нэр оруулна уу!");
      return;
    }

    setLoading(true);
    try {
      const newTask = {
        id: `${Date.now()}-${Math.random()}`,
        content: value,
        createdAt: new Date().toISOString(),
        dueDate: dueDates[columnKey] || null,
        priority: "medium",
        assignee: null,
        description: "",
        attachments: [],
        comments: [],
        progress: 0,
      };

      setTasks((prev) => {
        const projectTasks = prev[selectedProject] ?? { ...defaultColumns };
        return {
          ...prev,
          [selectedProject]: {
            ...projectTasks,
            [columnKey]: [...projectTasks[columnKey], newTask],
          },
        };
      });

      setInputs((prev) => ({ ...prev, [columnKey]: "" }));
      setDueDates((prev) => ({ ...prev, [columnKey]: "" }));
      showNotificationMessage("Даалгавар амжилттай нэмэгдлээ!");
    } catch (error) {
      console.error("Failed to add task:", error);
      showNotificationMessage("Алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (columnKey, taskId) => {
    if (!window.confirm("Энэ даалгаврыг устгахдаа итгэлтэй байна уу?")) return;

    setLoading(true);
    try {
      setTasks((prev) => {
        const projectTasks = prev[selectedProject] ?? { ...defaultColumns };
        return {
          ...prev,
          [selectedProject]: {
            ...projectTasks,
            [columnKey]: projectTasks[columnKey].filter((t) => t.id !== taskId),
          },
        };
      });
      showNotificationMessage("Даалгавар амжилттай устгагдлаа!");
    } catch (error) {
      console.error("Failed to delete task:", error);
      showNotificationMessage("Алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setTasks((prev) => {
      const projectTasks = { ...prev[selectedProject] };
      const sourceTasks = Array.from(projectTasks[source.droppableId]);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceTasks.splice(destination.index, 0, movedTask);
        projectTasks[source.droppableId] = sourceTasks;
      } else {
        const destTasks = Array.from(projectTasks[destination.droppableId]);
        destTasks.splice(destination.index, 0, movedTask);
        projectTasks[source.droppableId] = sourceTasks;
        projectTasks[destination.droppableId] = destTasks;
      }

      return { ...prev, [selectedProject]: projectTasks };
    });
  };

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setVisible(true);
  };

  const handleCreateProject = async () => {
    const name = newProjectName.trim();
    if (name === "") {
      showNotificationMessage("Төслийн нэр оруулна уу!");
      return;
    }

    setLoading(true);
    try {
      const newId = `project-${Date.now()}`;
      setProjects((prev) => [
        ...prev,
        {
          id: newId,
          name,
          description: newProjectDescription,
          createdAt: new Date().toISOString(),
        },
      ]);
      setTasks((prev) => ({ ...prev, [newId]: { ...defaultColumns } }));
      setSelectedProject(newId);
      setNewProjectName("");
      setNewProjectDescription("");
      setProjectModalVisible(false);
      showNotificationMessage("Төсөл амжилттай үүслээ!");
    } catch (error) {
      console.error("Failed to create project:", error);
      showNotificationMessage("Алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  const currentTasks = tasks[selectedProject] ?? defaultColumns;

  const now = new Date();
  const twoDaysMs = 1000 * 60 * 60 * 24 * 2;
  const pendingCount = currentTasks.todo.length;
  const inProgressCount = currentTasks.doing.length;
  const doneCount = currentTasks.done.length;

  let dueSoonCount = 2;
  let overdueCount = 10;
  ["todo", "doing"].forEach((col) => {
    currentTasks[col].forEach((task) => {
      if (!task.dueDate) return;
      const due = new Date(task.dueDate);
      const diff = due - now;
      if (diff < 0) {
        overdueCount += 1;
      } else if (diff <= twoDaysMs) {
        dueSoonCount += 1;
      }
    });
  });

  const filteredTasks = (columnKey) => {
    return currentTasks[columnKey].filter((task) => {
      const matchesSearch = task.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPriority =
        filterPriority === "all" || task.priority === filterPriority;

      const due = task.dueDate ? new Date(task.dueDate) : null;
      const matchesStart =
        !filterStartDate || (due && due >= new Date(filterStartDate));
      const matchesEnd =
        !filterEndDate || (due && due <= new Date(filterEndDate));

      return matchesSearch && matchesPriority && matchesStart && matchesEnd;
    });
  };

  return (
    <div className="p-4">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CSpinner color="light" />
        </div>
      )}

      {showNotification && (
        <CAlert color="info" className="position-fixed top-0 end-0 m-3 z-50">
          {notificationMessage}
        </CAlert>
      )}

      {/* Project selector & controls */}
      <CRow className="mb-4 align-items-end g-3">
        <CCol xs={12} md={4}>
          <CFormSelect
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="shadow-sm"
          >
            {projects.map((p) => (
              <option value={p.id} key={p.id}>
                {p.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>

        <CCol xs={12} md={3}>
          <div className="position-relative">
            <CFormInput
              placeholder="Хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-sm ps-4"
            />
            <FaSearch className="position-absolute top-50 translate-middle-y ms-2 text-muted" />
          </div>
        </CCol>

        <CCol xs={12} md={3}>
          <div className="position-relative">
            <CFormSelect
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="shadow-sm ps-4"
            >
              <option value="all">Төлөв сонгох</option>
              <option value="todo">Хүлээгдэж байгаа</option>
              <option value="doing">Хийгдэж байгаа</option>
              <option value="done">Дууссан</option>
              <option value="error">Дуусах хугацаа дөхсөн</option>
              <option value="overdue">Хугацаа хэтэрсэн</option>
            </CFormSelect>
            <FaFilter className="position-absolute top-50 translate-middle-y ms-2 text-muted" />
          </div>
        </CCol>

        <CCol xs={12} md={6}>
          <CInputGroup className="shadow-sm w-100 flex flex-nowrap">
            <CInputGroupText className=" text-muted border-end-0">
              <FaCalendarAlt className="me-2" /> Хугацаа:
            </CInputGroupText>
            <CFormInput
              type="date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
              placeholder="Эхлэх"
              className="border-start-0 border-end-0 w-50"
            />
            <CInputGroupText className=" border-start-0 border-end-0">
              -
            </CInputGroupText>
            <CFormInput
              type="date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
              placeholder="Дуусах"
              className="border-start-0 w-50"
            />
          </CInputGroup>
        </CCol>

        <CCol xs={12} md={2} className="d-flex justify-content-end">
          <CButton
            color="success"
            onClick={() => setProjectModalVisible(true)}
            className="shadow-sm w-100"
          >
            <FaPlus size={14} className="me-2" /> Төсөл нэмэх
          </CButton>
        </CCol>
      </CRow>

      {/* Status summary cards */}
      <CRow className="mb-4 text-center g-3">
        {[
          {
            label: "Хүлээгдэж байгаа",
            count: pendingCount,
            color: "primary",
            value: "pending",
            icon: <IoList />,
          },
          {
            label: "Хийгдэж байгаа",
            count: inProgressCount,
            value: "inProgress",
            color: "warning",
            icon: <IoSync />,
          },
          {
            label: "Дууссан",
            count: doneCount,
            value: "completed",
            color: "success",
            icon: <IoCheckmarkDone />,
          },
          {
            label: "Дуусах хугацаа дөхсөн",
            count: dueSoonCount,
            value: "dueClose",
            color: "info",
            icon: <IoTime />,
          },
          {
            label: "Хугацаа хэтэрсэн",
            count: overdueCount,
            value: "overdue",
            color: "danger",
            icon: <IoWarning />,
          },
        ].map(({ label, count, color, icon }, idx) => (
          <CCol xs={6} md={2} key={idx}>
            <CCard className="shadow-sm h-100 border-0 hover:shadow-lg transition-all">
              <CCardBody className="d-flex flex-column align-items-center justify-content-center p-4">
                <div
                  className={`mb-3 text-${color} transition-all hover:scale-110`}
                  style={{ fontSize: "32px" }}
                >
                  {icon}
                </div>
                <h2 className={`text-${color} mb-2 font-bold`}>{count}</h2>
                <p className="m-0 text-sm text-gray-600 text-center">{label}</p>
                <div
                  className={`mt-3 w-100 bg-${color} bg-opacity-10 rounded-pill py-1`}
                >
                  <CProgress
                    value={count}
                    color={color}
                    height={4}
                    className="rounded-pill"
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <DragDropContext onDragEnd={onDragEnd}>
        <CRow className="g-4">
          {columnTitles.map(({ key, title, bg, color, icon }) => (
            <CCol md={3} sm={6} xs={12} key={key}>
              <CCard className="h-100 shadow-sm border-0 hover:shadow-lg transition-all">
                <CCardHeader
                  style={{ backgroundColor: bg, color: color }}
                  className="d-flex justify-content-between align-items-center py-3"
                >
                  <span className="fw-bold d-flex align-items-center">
                    {icon} <span className="ms-2">{title}</span>
                  </span>
                  <CBadge color="light" className="px-2 shadow-sm">
                    {filteredTasks(key).length}
                  </CBadge>
                </CCardHeader>
                <CCardBody className="p-3">
                  <Droppable droppableId={key}>
                    {(providedDroppable) => (
                      <CListGroup
                        className="mb-3 min-h-[100px]"
                        ref={providedDroppable.innerRef}
                        {...providedDroppable.droppableProps}
                      >
                        {filteredTasks(key).map((task, idx) => (
                          <Draggable
                            draggableId={task.id}
                            index={idx}
                            key={task.id}
                          >
                            {(providedDraggable) => (
                              <div
                                ref={providedDraggable.innerRef}
                                {...providedDraggable.draggableProps}
                                {...providedDraggable.dragHandleProps}
                                className="mb-2"
                              >
                                <CListGroupItem className="shadow-sm hover:shadow-md transition-all border-0 p-3">
                                  <div className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                      <p className="m-0 flex-grow-1 fw-semibold">
                                        {task.content}
                                      </p>
                                      <div className="d-flex gap-2 align-items-center">
                                        <CTooltip content="Дэлгэрэнгүй">
                                          <IoEye
                                            size={18}
                                            onClick={() =>
                                              handleOpenModal(task)
                                            }
                                            className="cursor-pointer text-primary hover:opacity-80"
                                          />
                                        </CTooltip>
                                        <CTooltip content="Засах">
                                          <MdEdit
                                            size={18}
                                            className="cursor-pointer text-warning hover:opacity-80"
                                          />
                                        </CTooltip>
                                        <CTooltip content="Устгах">
                                          <MdDelete
                                            size={18}
                                            onClick={() =>
                                              handleDeleteTask(key, task.id)
                                            }
                                            className="cursor-pointer text-danger hover:opacity-80"
                                          />
                                        </CTooltip>
                                      </div>
                                    </div>
                                    <CProgress
                                      value={task.progress}
                                      className="mb-2"
                                    />
                                    <div className="d-flex justify-content-between align-items-center">
                                      {task.dueDate && (
                                        <div className="d-flex align-items-center small text-muted">
                                          <MdAccessTime
                                            size={14}
                                            className="me-1"
                                          />
                                          {new Date(
                                            task.dueDate,
                                          ).toLocaleDateString()}
                                        </div>
                                      )}
                                      <CBadge
                                        color={
                                          task.priority === "high"
                                            ? "danger"
                                            : task.priority === "medium"
                                              ? "warning"
                                              : "success"
                                        }
                                        className="ms-2"
                                      >
                                        {task.priority}
                                      </CBadge>
                                    </div>
                                  </div>
                                </CListGroupItem>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {providedDroppable.placeholder}
                      </CListGroup>
                    )}
                  </Droppable>

                  <div className="mt-3">
                    <div className="position-relative mb-2">
                      <CFormInput
                        placeholder="Шинэ ажил нэмэх..."
                        value={inputs[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTask(key);
                          }
                        }}
                        className="shadow-sm"
                      />
                    </div>
                    <div className="position-relative mb-2">
                      <CFormInput
                        type="date"
                        value={dueDates[key]}
                        onChange={(e) =>
                          handleDueDateChange(key, e.target.value)
                        }
                        className="shadow-sm"
                      />
                      <FaCalendarAlt className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted" />
                    </div>
                    <CButton
                      color="primary"
                      variant="outline"
                      className="w-100 shadow-sm hover:shadow-md transition-all"
                      onClick={() => handleAddTask(key)}
                    >
                      <FaPlus size={14} className="me-2" />
                      Нэмэх
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </DragDropContext>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        alignment="center"
        className="shadow"
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Даалгаврын дэлгэрэнгүй</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="mb-4">
            <strong className="d-block mb-2">Агуулга:</strong>
            {editMode ? (
              <CFormInput
                value={selectedTask?.content}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, content: e.target.value })
                }
                className="mb-3"
              />
            ) : (
              <p className="bg-light p-3 rounded">{selectedTask?.content}</p>
            )}
          </div>
          <div className="mb-4">
            <strong className="d-block mb-2">Тайлбар:</strong>
            {editMode ? (
              <CFormInput
                as="textarea"
                rows={3}
                value={selectedTask?.description}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
                className="mb-3"
              />
            ) : (
              <p className="bg-light p-3 rounded">
                {selectedTask?.description || "Тайлбар байхгүй"}
              </p>
            )}
          </div>
          <div className="mb-4">
            <strong className="d-block mb-2">Явц:</strong>
            <CProgress value={selectedTask?.progress || 0} className="mb-2" />
            {editMode && (
              <CFormInput
                type="range"
                min="0"
                max="100"
                value={selectedTask?.progress || 0}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    progress: parseInt(e.target.value),
                  })
                }
              />
            )}
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <strong className="d-block mb-2">Үүсгэсэн огноо:</strong>
              <p className="bg-light p-3 rounded">
                {selectedTask?.createdAt
                  ? new Date(selectedTask.createdAt).toLocaleString("mn-MN")
                  : ""}
              </p>
            </div>
            <div className="col-md-6">
              <strong className="d-block mb-2">Дуусах хугацаа:</strong>
              {editMode ? (
                <CFormInput
                  type="date"
                  value={selectedTask?.dueDate}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      dueDate: e.target.value,
                    })
                  }
                />
              ) : (
                <p className="bg-light p-3 rounded">
                  {selectedTask?.dueDate
                    ? new Date(selectedTask.dueDate).toLocaleDateString("mn-MN")
                    : "Тодорхойгүй"}
                </p>
              )}
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color={editMode ? "success" : "warning"}
            onClick={() => setEditMode(!editMode)}
            className="me-2"
          >
            {editMode ? "Хадгалах" : "Засах"}
          </CButton>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false);
              setEditMode(false);
            }}
          >
            Хаах
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Project create modal */}
      <CModal
        visible={projectModalVisible}
        onClose={() => setProjectModalVisible(false)}
        alignment="center"
        className="shadow"
      >
        <CModalHeader>
          <CModalTitle>Шинэ төсөл нэмэх</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <label className="form-label">Төслийн нэр</label>
            <CFormInput
              placeholder="Төслийн нэр"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="shadow-sm"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Тайлбар</label>
            <CFormInput
              as="textarea"
              rows={3}
              placeholder="Төслийн тайлбар"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              className="shadow-sm"
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setProjectModalVisible(false)}
          >
            Болих
          </CButton>
          <CButton color="primary" onClick={handleCreateProject}>
            Нэмэх
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default TasksBoard;
