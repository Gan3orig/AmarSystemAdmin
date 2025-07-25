import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CTooltip,
  CProgress,
  CSpinner,
} from "@coreui/react";
import { cilInfo } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import axios from "axios";

const WidgetsDropdown = (props) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    const token = localStorage.getItem("token");
    try {
      setRefreshing(true);
      const response = await axios.get(
        "https://api.majorsoft.mn/api/adminReports/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data?.data) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setError("Мэдээлэл татахад алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // 5 минут тутамд автоматаар шинэчилнэ
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  const colors = [
    "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)",
    "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
    "linear-gradient(90deg, #f7971e 0%, #ffd200 100%)",
    "linear-gradient(90deg, #e53935 0%, #e35d5b 100%)",
    "linear-gradient(90deg, #11998e 0%, #38ef7d 100%)",
  ];

  if (loading) {
    return (
      <CCard className="h-100 shadow-lg border-0 rounded-4">
        <CCardBody className="d-flex justify-content-center align-items-center py-5">
          <CSpinner color="primary" variant="grow" />
          <span className="ms-3 fw-semibold">Мэдээлэл ачаалж байна...</span>
        </CCardBody>
      </CCard>
    );
  }

  if (error) {
    return (
      <CCard className="h-100 shadow-lg border-danger rounded-4">
        <CCardBody className="text-center p-4">
          <div className="text-danger mb-3">
            <CIcon icon={cilInfo} size="xl" />
          </div>
          <p className="text-danger mb-3">{error}</p>
          <button
            className="btn btn-outline-danger"
            onClick={fetchStats}
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Дахин ачаалж байна...
              </>
            ) : (
              "Дахин оролдох"
            )}
          </button>
        </CCardBody>
      </CCard>
    );
  }

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      {stats.map((item, index) => (
        <CCol sm={6} xl={4} xxl={3} key={index}>
          <CCard
            className="shadow-lg border-0 rounded-4 position-relative overflow-hidden h-100 widget-card"
            style={{
              background: colors[index % colors.length],
              color: "#fff",
              minHeight: 180,
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow:
                "0 4px 24px 0 rgba(30, 34, 90, 0.12), 0 1.5px 4px 0 rgba(30, 34, 90, 0.08)",
            }}
          >
            <CCardBody className="d-flex flex-column justify-content-between h-100 p-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="fs-6 fw-semibold text-white text-shadow">
                  {item.Descr}
                  <CTooltip content="Дэлгэрэнгүй мэдээлэл">
                    <CIcon
                      icon={cilInfo}
                      size="sm"
                      className="ms-2 text-white-50"
                    />
                  </CTooltip>
                </div>
              </div>
              <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <h2
                  className="display-5 fw-bold mb-0 text-white text-shadow"
                  style={{
                    letterSpacing: "1px",
                    textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {item.total.toLocaleString()}
                </h2>
              </div>
              <div className="mt-3">
                <CProgress
                  thin
                  value={Math.min(Math.abs(item.trend) * 2, 100)}
                  color={item.trend > 0 ? "success" : "danger"}
                  style={{
                    background: "rgba(255,255,255,0.25)",
                    height: "6px",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  );
};

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
};

export default WidgetsDropdown;
