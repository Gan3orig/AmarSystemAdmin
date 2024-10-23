/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CAlert,
} from '@coreui/react';

const DeleteBranch = ({ visible, onClose, branchId, userId, onDeleteSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`https://api.majorsoft.mn/api/branchService?branchId=${branchId}&userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token here if needed
                },
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(errorDetails);
            }

            setSuccess("Branch deleted successfully!");
            onDeleteSuccess(); // Trigger the success callback to refresh data or close modal
        } catch (err) {
            setError(err.message || "Failed to delete the branch.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader closeButton>
                <CModalTitle>Delete Branch</CModalTitle>
            </CModalHeader>
            <CModalBody>
                Are you sure you want to delete this branch?
                {error && <CAlert color="danger">{error}</CAlert>}
                {success && <CAlert color="success">{success}</CAlert>}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose} disabled={loading}>
                    Cancel
                </CButton>
                <CButton color="danger" onClick={handleDelete} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete'}
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

export default DeleteBranch;
