import React, { useState, useCallback } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ScanQr() {
    const [isScanning, setIsScanning] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const [scannedId, setScannedId] = useState(null);

    const showToast = (type, message) => {
        toast[type](message, {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => {
                setIsScanning(true);
            }
        });
    };

    const handleScan = useCallback(async (result) => {
        if (!isScanning) return;

        setIsScanning(false);
        const scannedUrl = result[0].rawValue;        
        const id = scannedUrl.split('/').pop();
        setScannedId(id);

        try {
            const response = await axios.post(`https://arrif-api.moshimoshi.cloud/api/v2/kruponam/verify-ticket/${id}`);
            switch (response.status) {
                case 200:
                    showToast('success', 'Success: Ticket is valid');
                    setResponseData(response?.data?.data);
                    break;
                case 404:
                    showToast('error', 'Error: Ticket is not available');
                    setResponseData(null);
                    break;
                case 400:
                    showToast('error', 'Error: Ticket is already entered');
                    setResponseData(response?.data?.data);
                    break;
                default:
                    showToast('warn', 'Unexpected status code');
                    setResponseData(null);
                    break;
            }
        } catch (error) {
            if (error.response) {
                showToast('error', `Error ${error.response.status}: ${error.response.data.message}`);
                if (error.response.status === 400) {
                    setResponseData(error.response.data.data);
                } else {
                    setResponseData(null);
                }
            } else if (error.request) {
                showToast('error', 'Error: No response received from server');
                setResponseData(null);
            } else {
                showToast('error', 'Error: ' + error.message);
                setResponseData(null);
            }
        }
    }, [isScanning]);

    const handleEntrance = async () => {
        try {
            const response = await axios.post(`https://arrif-api.moshimoshi.cloud/api/v2/kruponam/update-entrance/${scannedId}`);
            if (response.status === 200) {
                showToast('success', 'Entrance recorded successfully');
                setResponseData(response.data.data);
            }
        } catch (error) {
            showToast('error', 'Failed to record entrance');
        }
    };

    const renderResponseData = () => {
        if (!responseData) return null;

        return (
            <div className="ticket-info-card">
                <h2 className="ticket-info-title">Ticket Information</h2>
                <div className="info-items">
                    <InfoItem label="Name" value={responseData.name} />
                    <InfoItem label="Phone" value={responseData.phone} />
                    <InfoItem label="Department" value={responseData.department} />
                    <InfoItem label="Year" value={responseData.year} />
                    <InfoItem label="Transaction ID" value={responseData.transactionId} />
                    <InfoItem label="Booking ID" value={responseData.bookingId} />
                    <InfoItem label="Entrance" value={responseData.entrance ? 'Yes' : 'No'} />
                </div>
                {!responseData.entrance && (
                    <button className="entrance-button" onClick={handleEntrance}>
                        Record Entrance
                    </button>
                )}
            </div>
        );
    };

    const InfoItem = ({ label, value }) => (
        <div className="info-item">
            <span className="info-label">{label}:</span>
            <span className="info-value">{value}</span>
        </div>
    );

    return (
        <div className="scan-qr-container">
            <style jsx>{`
                .scan-qr-container {
                    padding: 1rem;
                }
                .ticket-info-card {
                    background-color: white;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 2rem;
                    max-width: 28rem;
                    margin-left: auto;
                    margin-right: auto;
                }
                .ticket-info-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    color: #2d3748;
                }
                .info-items {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                .info-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 0.5rem;
                }
                .info-label {
                    font-weight: 500;
                    color: #4a5568;
                }
                .info-value {
                    color: #2d3748;
                }
                .entrance-button {
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background-color: #4299e1;
                    color: white;
                    border: none;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    font-weight: 500;
                }
                .entrance-button:hover {
                    background-color: #3182ce;
                }
            `}</style>
            <Scanner onScan={handleScan} />
            <ToastContainer />
            {renderResponseData()}
        </div>
    );
}

export default ScanQr;