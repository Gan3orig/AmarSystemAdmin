import React, { useState, useEffect } from "react";
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
import axios from "axios";

const columnTitles = [
  {
    key: "pending",
    backendStatus: 0,
    title: "Хийх",
    bg: "#E3F2FD",
    color: "#1976D2",
    icon: <IoList />,
  },
  {
    key: "inProgress",
    backendStatus: 1,
    title: "Хийж байгаа",
    bg: "#FFF3E0",
    color: "#F57C00",
    icon: <IoSync />,
  },
  {
    key: "completed",
    backendStatus: 2,
    title: "Хийсэн",
    bg: "#E8F5E9",
    color: "#388E3C",
    icon: <IoCheckmarkDone />,
  },
  {
    key: "dueClose",
    backendStatus: 3,
    title: "Хугацаа дуусах дөхсөн",
    bg: "#FFEBEE",
    color: "#D32F2F",
    icon: <IoWarning />,
  },
  {
    key: "overdue",
    backendStatus: 4,
    title: "Хугацаа дууссан",
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
  const defaultColumns = {
    pending: [],
    inProgress: [],
    completed: [],
    dueClose: [],
    overdue: [],
  };

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [tasks, setTasks] = useState({});

  const [inputs, setInputs] = useState({
    pending: "",
    inProgress: "",
    completed: "",
    dueClose: "",
    overdue: "",
  });

  const [dueDates, setDueDates] = useState({
    pending: "",
    inProgress: "",
    completed: "",
    dueClose: "",
    overdue: "",
  });

  const [projectModalVisible, setProjectModalVisible] = useState(false);
  const [editProjectModalVisible, setEditProjectModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectStartDate, setNewProjectStartDate] = useState("");
  const [newProjectEndDate, setNewProjectEndDate] = useState("");

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
    // if (value === "") {
    //   showNotificationMessage("Даалгаврын нэр оруулна уу!");
    //   return;
    // }

    // if (!dueDates[columnKey]) {
    //   showNotificationMessage("Дуусах хугацаа оруулна уу!");
    //   return;
    // }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Төлөвийг тодорхойлох (string статус)
      let taskStatus = "pending";
      switch (columnKey) {
        case "pending":
          taskStatus = "pending";
          break;
        case "inProgress":
          taskStatus = "inProgress";
          break;
        case "completed":
          taskStatus = "completed";
          break;
        case "dueClose":
          taskStatus = "dueClose";
          break;
        case "overdue":
          taskStatus = "overdue";
          break;
        default:
          taskStatus = "pending";
      }

      const payload = {
        taskId: 0,
        projectId: selectedProject,
        orderId: 0,
        taskName: value,
        // taskStatus: "pending",
        endDate: "2025-07-29T07:55:16.350Z",
        // endDate: (() => {
        //   let dt = dueDates[columnKey];
        //   if (dt.length === 16) {
        //     // yyyy-MM-ddTHH:mm форматад секунд алга → :00 нэмж ISO болгоно
        //     dt += ":00";
        //   }
        //   return new Date(dt).toISOString();
        // })(),
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      };

      const response = await axios({
        method: "POST",
        url: "https://api.majorsoft.mn/api/task",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      });

      if (!response.data) {
        throw new Error("Даалгавар нэмэхэд алдаа гарлаа");
      }

      const newTask = {
        id: String(response.data.taskId),
        content: value,
        dueDate: dueDates[columnKey],
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
      showNotificationMessage(error.message || "Алдаа гарлаа!");
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

        // Backend update only when column changes
        const newStatus = statusCodeMap[destination.droppableId] ?? 0;
        updateTaskStatusBackend(movedTask, newStatus, destination.index);
      }

      return { ...prev, [selectedProject]: projectTasks };
    });
  };

  const updateTaskStatusBackend = async (task, statusCode, orderIdx) => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        taskId: Number(task.id),
        projectId: selectedProject,
        orderId: orderIdx,
        taskName: task.content,
        taskStatus: statusCode,
        endDate: task.dueDate || new Date().toISOString(),
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      };

      await axios({
        method: "PUT",
        url: "https://api.majorsoft.mn/api/task",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      });
    } catch (err) {
      console.error("Error updating task status:", err);
      showNotificationMessage("Даалгаврын статус шинэчлэхэд алдаа гарлаа!");
    }
  };

  const handleOpenModal = async (task) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://api.majorsoft.mn/api/task/getTask?taskId=${task.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Таалагдсан өгөгдөл татаж чадсангүй");

      const detail = await res.json();
      const full =
        Array.isArray(detail.data) && detail.data.length
          ? detail.data[0]
          : null;

      const merged = {
        ...task,
        description: full?.description ?? "",
        progress: full?.progress ?? 0,
        createdAt: full?.createDate ?? task.createdAt,
        dueDate: full?.endDate ?? task.dueDate,
        priority: full?.priority ?? task.priority ?? "medium",
      };
      setSelectedTask(merged);
      setVisible(true);
    } catch (err) {
      console.error("Error fetching task detail:", err);
      showNotificationMessage("Даалгаврын дэлгэрэнгүй ачаалахад алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  // Төслүүдийг API-аас дуудах
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://api.majorsoft.mn/api/task/listProject",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const dataObj = await response.json();
      const projectList = Array.isArray(dataObj.data) ? dataObj.data : [];
      setProjects(projectList);

      // Анхны төслийг сонгох
      if (projectList.length > 0 && !selectedProject) {
        const firstId = projectList[0].projectId;
        setSelectedProject(firstId);
        // Анхны төслийн tasks-ийг хоосон array-аар эхлүүлэх
        setTasks((prev) => ({
          ...prev,
          [firstId]: { ...defaultColumns },
        }));
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      showNotificationMessage("Төслийн жагсаалт ачаалахад алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  // Component mount хийхэд төслүүдийг дуудах
  useEffect(() => {
    fetchProjects();
  }, []);

  // Даалгаврын жагсаалтыг API-аас дуудах
  const fetchTasks = async (projectId) => {
    if (!projectId) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://api.majorsoft.mn/api/task?projectId=${projectId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const resJson = await response.json();
      const data = Array.isArray(resJson.data) ? resJson.data : [];

      // Даалгавруудыг төлөв бүрээр ангилах
      const groupedTasks = {
        pending: [],
        inProgress: [],
        completed: [],
        dueClose: [],
        overdue: [],
      };

      data.forEach((task) => {
        const taskItem = {
          id: String(task.taskId),
          content: task.taskName,
          dueDate: task.endDate,
          progress: 0,
        };

        const status = task.taskStatus;

        if (status === 0 || status === "pending") {
          groupedTasks.pending.push(taskItem);
        } else if (
          status === 1 ||
          status === "inProgress" ||
          status === "doing"
        ) {
          groupedTasks.inProgress.push(taskItem);
        } else if (
          status === 2 ||
          status === "completed" ||
          status === "done"
        ) {
          groupedTasks.completed.push(taskItem);
        } else if (status === 3 || status === "dueClose") {
          groupedTasks.dueClose.push(taskItem);
        } else if (status === 4 || status === "overdue" || status === "error") {
          groupedTasks.overdue.push(taskItem);
        } else {
          groupedTasks.pending.push(taskItem);
        }
      });

      setTasks((prev) => ({
        ...prev,
        [projectId]: groupedTasks,
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      showNotificationMessage("Даалгаврын жагсаалт ачаалахад алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  // Төсөл сонгогдох үед даалгавруудыг дуудах
  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject);
    }
  }, [selectedProject]);

  const ProjectStatus = {
    DOING: "Doing",
    PENDING: "pending",
    DONE: "Done",
    CANCELLED: "Cancelled",
  };

  const getStatusColor = (status) => {
    switch (status) {
      case ProjectStatus.DOING:
        return "primary";
      case ProjectStatus.PENDING:
        return "warning";
      case ProjectStatus.DONE:
        return "success";
      case ProjectStatus.CANCELLED:
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case ProjectStatus.DOING:
        return "Хийгдэж байгаа";
      case ProjectStatus.PENDING:
        return "Хүлээгдэж байгаа";
      case ProjectStatus.DONE:
        return "Дууссан";
      case ProjectStatus.CANCELLED:
        return "Цуцлагдсан";
      default:
        return "Тодорхойгүй";
    }
  };

  const handleCreateProject = async () => {
    const name = newProjectName.trim();
    if (name === "") {
      showNotificationMessage("Төслийн нэр оруулна уу!");
      return;
    }

    if (!newProjectStartDate) {
      showNotificationMessage("Эхлэх огноо оруулна уу!");
      return;
    }

    if (!newProjectEndDate) {
      showNotificationMessage("Дуусах огноо оруулна уу!");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const payload = {
        projectName: name,
        projectStatus: ProjectStatus.PENDING,
        begDate: new Date(newProjectStartDate).toISOString(),
        endDate: new Date(newProjectEndDate).toISOString(),
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      };

      const response = await fetch(
        "https://api.majorsoft.mn/api/task/addProject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors?.projectName) {
          throw new Error("Төслийн нэр оруулна уу!");
        }
        throw new Error(errorData.title || "Failed to create project");
      }

      await fetchProjects();
      setNewProjectName("");
      setNewProjectDescription("");
      setNewProjectStartDate("");
      setNewProjectEndDate("");
      setProjectModalVisible(false);
      showNotificationMessage("Төсөл амжилттай үүслээ!");
    } catch (error) {
      console.error("Failed to create project:", error);
      showNotificationMessage(error.message || "Алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setEditProjectModalVisible(true);
  };

  const handleUpdateProject = async (event) => {
    event.preventDefault();
    if (!editingProject) return;

    if (!editingProject.projectName?.trim()) {
      showNotificationMessage("Төслийн нэр оруулна уу!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        projectId: editingProject.projectId,
        projectName: editingProject.projectName.trim(),
        projectStatus: 1,
        begDate: new Date(editingProject.begDate).toISOString(),
        endDate: new Date(editingProject.endDate).toISOString(),
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      };

      const response = await fetch(
        "https://api.majorsoft.mn/api/task/updateProject",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors?.projectName) {
          throw new Error("Төслийн нэр оруулна уу!");
        }
        throw new Error(errorData.title || "Failed to update project");
      }

      await fetchProjects();
      setEditProjectModalVisible(false);
      setEditingProject(null);
      showNotificationMessage("Төсөл амжилттай шинэчлэгдлээ!");
    } catch (error) {
      console.error("Error updating project:", error);
      showNotificationMessage(
        error.message || "Төсөл шинэчлэхэд алдаа гарлаа!",
      );
    } finally {
      setLoading(false);
    }
  };

  const currentTasks = tasks[selectedProject] ?? defaultColumns;

  const now = new Date();
  const twoDaysMs = 1000 * 60 * 60 * 24 * 2;
  const pendingCount = currentTasks.pending.length;
  const inProgressCount = currentTasks.inProgress.length;
  const doneCount = currentTasks.completed.length;
  const dueCloseCount = currentTasks.dueClose.length;
  const overdueCountB = currentTasks.overdue.length;

  let dueSoonCount = 2;
  let overdueCount = 10;
  ["pending", "inProgress"].forEach((col) => {
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

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Энэ төслийг устгахдаа итгэлтэй байна уу?")) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://api.majorsoft.mn/api/task/removeProject",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            projectId: projectId,
            userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      await fetchProjects();
      showNotificationMessage("Төсөл амжилттай устгагдлаа!");
    } catch (error) {
      console.error("Error deleting project:", error);
      showNotificationMessage("Төсөл устгахад алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  const statusCodeMap = {
    pending: 0,
    inProgress: 1,
    completed: 2,
    dueClose: 3,
    overdue: 4,
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
              <option value={p.projectId} key={p.projectId}>
                {p.projectName}
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
              <option value="pending">Хүлээгдэж байгаа</option>
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
            count: dueCloseCount,
            value: "dueClose",
            color: "info",
            icon: <IoTime />,
          },
          {
            label: "Хугацаа хэтэрсэн",
            count: overdueCountB,
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
                            draggableId={task.id.toString()}
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
                        type="datetime-local"
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

      {/* Projects Table */}
      <CCard className="mt-4 shadow-sm border-0">
        <CCardHeader className="bg-light border-0">
          <h5 className="mb-0 text-black">Төслийн жагсаалт</h5>
        </CCardHeader>
        <CCardBody className="p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0">№</th>
                  <th className="border-0">Нэр</th>
                  <th className="border-0">Эхлэх огноо</th>
                  <th className="border-0">Дуусах огноо</th>
                  <th className="border-0">Төлөв</th>
                  <th className="border-0">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={project.projectId}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          <h6 className="mb-0">{project.projectName}</h6>
                          {project.description && (
                            <small className="text-muted">
                              {project.description}
                            </small>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      {new Date(project.begDate).toLocaleDateString("mn-MN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      {new Date(project.endDate).toLocaleDateString("mn-MN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <CBadge
                        color={getStatusColor(project.projectStatus)}
                        className="px-2 py-1"
                      >
                        {getStatusText(project.projectStatus)}
                      </CBadge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <CTooltip content="Засах">
                          <CButton
                            color="warning"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProject(project)}
                          >
                            <MdEdit />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Устгах">
                          <CButton
                            color="danger"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDeleteProject(project.projectId)
                            }
                          >
                            <MdDelete />
                          </CButton>
                        </CTooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>

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

      {/* Project edit modal */}
      <CModal
        visible={editProjectModalVisible}
        onClose={() => {
          setEditProjectModalVisible(false);
          setEditingProject(null);
        }}
        alignment="center"
        className="shadow"
      >
        <CModalHeader>
          <CModalTitle>Төсөл засах</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <label className="form-label">Төслийн нэр</label>
            <CFormInput
              placeholder="Төслийн нэр"
              value={editingProject?.projectName || ""}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  projectName: e.target.value,
                })
              }
              className="shadow-sm"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Төлөв</label>
            <CFormSelect
              value={editingProject?.projectStatus || ProjectStatus.PENDING}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  projectStatus: e.target.value,
                })
              }
              className="shadow-sm"
            >
              <option value={ProjectStatus.DOING}>Хийгдэж байгаа</option>
              <option value={ProjectStatus.PENDING}>Хүлээгдэж байгаа</option>
              <option value={ProjectStatus.DONE}>Дууссан</option>
              <option value={ProjectStatus.CANCELLED}>Цуцлагдсан</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <label className="form-label">Эхлэх огноо</label>
            <CFormInput
              type="datetime-local"
              value={
                editingProject?.begDate
                  ? new Date(editingProject.begDate).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  begDate: e.target.value,
                })
              }
              className="shadow-sm"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Дуусах огноо</label>
            <CFormInput
              type="datetime-local"
              value={
                editingProject?.endDate
                  ? new Date(editingProject.endDate).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  endDate: e.target.value,
                })
              }
              className="shadow-sm"
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setEditProjectModalVisible(false);
              setEditingProject(null);
            }}
          >
            Болих
          </CButton>
          <CButton color="primary" onClick={handleUpdateProject}>
            Хадгалах
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
          <div className="mb-3">
            <label className="form-label">Эхлэх огноо</label>
            <CFormInput
              type="datetime-local"
              value={newProjectStartDate}
              onChange={(e) => setNewProjectStartDate(e.target.value)}
              className="shadow-sm"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Дуусах огноо</label>
            <CFormInput
              type="datetime-local"
              value={newProjectEndDate}
              onChange={(e) => setNewProjectEndDate(e.target.value)}
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
