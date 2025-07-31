import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CButton,
  CAlert,
  CSpinner,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

const BASE_URL = "https://api.majorsoft.mn";

const BanksPage = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [registeredAccounts, setRegisteredAccounts] = useState([]);
  // Merchants
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchantId, setSelectedMerchantId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const token =
    localStorage.getItem("token") ||
    (() => {
      try {
        return JSON.parse(localStorage.getItem("amar_pos"))?.accessToken;
      } catch (e) {
        return null;
      }
    })();

  const axiosConfig = token
    ? {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiODg4ODMyMTQiLCJleHAiOjE3NTM5NjkxNTYsImlzcyI6Im1ham9yc29mdCIsImF1ZCI6Im1ham9yc29mdCJ9.S5IDXz-6o4vtJ_013JSGnkgrXC__tvKHHVdgoXVNFhc`,
        },
      }
    : {};

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000,
    );
  };

  // Initial load: fetch merchant list and bank list
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoading(true);
        const banksRes = await axios.get(
          `${BASE_URL}/api/QPay/banks`,
          axiosConfig,
        );
        const banksData = banksRes.data.data || [];
        setBanks(banksData);

        // Merchants
        const merchantRes = await axios.get(
          `${BASE_URL}/api/QPay/merchantList`,
          axiosConfig,
        );
        const merchantsData = merchantRes.data.data || [];
        setMerchants(merchantsData);
        if (merchantsData.length) {
          setSelectedMerchantId(merchantsData[0].id);
        }
      } catch (err) {
        console.error(err);
        showNotification("Өгөгдөл ачаалахад алдаа гарлаа", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  // Whenever merchant changes, fetch its bank accounts
  useEffect(() => {
    if (!selectedMerchantId) return;
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const accountsRes = await axios.get(
          `${BASE_URL}/api/QPay/bankAccount`,
          {
            ...axiosConfig,
            params: { qPayMerchantId: selectedMerchantId },
          },
        );

        const accounts = (accountsRes.data.data || []).map((account) => ({
          id: account.id,
          bankName:
            banks.find((b) => b.bankCode === account.account_bank_code)
              ?.descr || account.account_bank_code,
          accountNumber: account.account_number,
          accountName: account.account_name,
          isDefault: account.is_default,
        }));
        setRegisteredAccounts(accounts);
      } catch (err) {
        console.error(err);
        showNotification("Данс татахад алдаа гарлаа", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [selectedMerchantId, banks]);

  const resetForm = () => {
    setSelectedBank("");
    setAccountNumber("");
    setAccountName("");
    setIsDefault(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      id: editingId,
      merchant_id: selectedMerchantId,
      account_bank_code: selectedBank,
      account_number: accountNumber,
      account_name: accountName,
      is_default: isDefault,
    };

    try {
      if (!token) throw new Error("Token not found");

      if (isEditing) {
        await axios.put(`${BASE_URL}/api/QPay/bankAccount`, data, {
          headers: {
            ...axiosConfig.headers,
            "Content-Type": "application/json",
          },
        });

        const updatedAccounts = registeredAccounts.map((account) =>
          account.id === editingId
            ? {
                ...account,
                bankName:
                  banks.find((b) => b.bankCode === selectedBank)?.descr ||
                  selectedBank,
                accountNumber,
                accountName,
                isDefault,
                lastModified: new Date().toISOString().split("T")[0],
              }
            : account,
        );
        setRegisteredAccounts(updatedAccounts);
        showNotification("Данс амжилттай засагдлаа");
      } else {
        const res = await axios.post(`${BASE_URL}/api/QPay/bankAccount`, data, {
          headers: {
            ...axiosConfig.headers,
            "Content-Type": "application/json",
          },
        });
        showNotification("Данс амжилттай бүртгэгдлээ");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      showNotification("Алдаа гарлаа", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id) => {
    const accountToEdit = registeredAccounts.find((acc) => acc.id === id);
    if (accountToEdit) {
      setIsEditing(true);
      setEditingId(id);
      const selected = banks.find((b) => b.descr === accountToEdit.bankName);
      setSelectedBank(selected ? selected.bankCode : "");
      setAccountNumber(accountToEdit.accountNumber);
      setAccountName(accountToEdit.accountName);
      setIsDefault(accountToEdit.isDefault);
      setShowModal(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Та энэ дансыг устгахдаа итгэлтэй байна уу?")) {
      try {
        await axios.delete(
          `${BASE_URL}/api/QPay/bankAccount/${id}`,
          axiosConfig,
        );
        setRegisteredAccounts((prev) => prev.filter((acc) => acc.id !== id));
        showNotification("Данс амжилттай устгагдлаа");
      } catch (err) {
        showNotification("Устгахад алдаа гарлаа", "error");
      }
    }
  };

  const handleRowClick = (account) => {
    setSelectedAccount(account);
    setShowModal(true);
  };

  const filteredAccounts = registeredAccounts.filter(
    (account) =>
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.includes(searchTerm),
  );

  return (
    <CContainer className="py-4">
      {notification.show && (
        <CAlert
          color={notification.type === "success" ? "success" : "danger"}
          dismissible
          onClose={() => setNotification({ ...notification, show: false })}
        >
          {notification.message}
        </CAlert>
      )}

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <CSpinner color="primary" />
        </div>
      ) : (
        <CRow>
          {/* Form column */}
          <CCol md={4} className="mb-4">
            <CCard>
              <CCardBody>
                <h4 className="mb-3">
                  {isEditing ? "Дансны мэдээлэл засах" : "Шинэ данс нэмэх"}
                </h4>
                <CForm onSubmit={handleSubmit}>
                  {/* Merchant select */}
                  <div className="mb-3">
                    <CFormSelect
                      value={selectedMerchantId}
                      onChange={(e) => setSelectedMerchantId(e.target.value)}
                      required
                    >
                      <option value="">Мерчант сонгох</option>
                      {merchants.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name || m.owner_first_name}
                        </option>
                      ))}
                    </CFormSelect>
                  </div>

                  <div className="mb-3">
                    <CFormSelect
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      required
                    >
                      <option value="">Банк сонгох</option>
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.bankCode}>
                          {bank.descr}
                        </option>
                      ))}
                    </CFormSelect>
                  </div>

                  <div className="mb-3">
                    <CFormInput
                      placeholder="Дансны дугаар"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <CFormInput
                      placeholder="Данс эзэмшигчийн нэр"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <CFormCheck
                      label="Үндсэн данс болгох"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <CButton
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && <CSpinner size="sm" className="me-2" />}
                      {isEditing ? "Хадгалах" : "Бүртгэх"}
                    </CButton>
                    {isEditing && (
                      <CButton
                        type="button"
                        color="secondary"
                        variant="outline"
                        onClick={resetForm}
                      >
                        Цуцлах
                      </CButton>
                    )}
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>

          {/* Table column */}
          <CCol md={8}>
            <CCard>
              <CCardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="mb-0">Бүртгэлтэй дансны жагсаалт</h4>
                  <CFormInput
                    placeholder="Хайх..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: "250px" }}
                  />
                </div>

                <CTable hover responsive align="middle">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Банкны нэр</CTableHeaderCell>
                      <CTableHeaderCell>Дансны дугаар</CTableHeaderCell>
                      <CTableHeaderCell>Эзэмшигчийн нэр</CTableHeaderCell>
                      <CTableHeaderCell>Төлөв</CTableHeaderCell>
                      <CTableHeaderCell>Үйлдэл</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredAccounts.length === 0 ? (
                      <CTableRow>
                        <CTableDataCell colSpan={5} className="text-center">
                          Бүртгэлтэй данс олдсонгүй
                        </CTableDataCell>
                      </CTableRow>
                    ) : (
                      filteredAccounts.map((account) => (
                        <CTableRow key={account.id}>
                          <CTableDataCell>{account.bankName}</CTableDataCell>
                          <CTableDataCell>
                            {account.accountNumber}
                          </CTableDataCell>
                          <CTableDataCell>{account.accountName}</CTableDataCell>
                          <CTableDataCell>
                            {account.isDefault ? (
                              <span className="badge bg-success">Үндсэн</span>
                            ) : (
                              <span className="badge bg-secondary">Энгийн</span>
                            )}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="info"
                              size="sm"
                              className="me-1"
                              onClick={() => handleEdit(account.id)}
                            >
                              <FaEdit />
                            </CButton>
                            <CButton
                              color="danger"
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(account.id)}
                            >
                              <FaTrash />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    )}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      {/* Modal */}
      <CModal visible={showModal} onClose={() => setShowModal(false)} size="lg">
        <CModalHeader closeButton>
          <strong>Дансны дэлгэрэнгүй мэдээлэл</strong>
        </CModalHeader>
        {selectedAccount && (
          <>
            <CModalBody>
              <p>
                <strong>Банкны нэр:</strong> {selectedAccount.bankName}
              </p>
              <p>
                <strong>Дансны дугаар:</strong> {selectedAccount.accountNumber}
              </p>
              <p>
                <strong>Эзэмшигчийн нэр:</strong> {selectedAccount.accountName}
              </p>
              <p>
                <strong>Төлөв:</strong>{" "}
                {selectedAccount.isDefault ? "Үндсэн" : "Энгийн"}
              </p>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setShowModal(false)}>
                Хаах
              </CButton>
              <CButton
                color="danger"
                onClick={() => {
                  handleDelete(selectedAccount.id);
                  setShowModal(false);
                }}
              >
                Устгах
              </CButton>
              <CButton
                color="primary"
                onClick={() => handleEdit(selectedAccount.id)}
              >
                Засах
              </CButton>
            </CModalFooter>
          </>
        )}
      </CModal>
    </CContainer>
  );
};

export default BanksPage;
