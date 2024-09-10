import React, { useState, useCallback } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ScanQr() {
    const [isScanning, setIsScanning] = useState(true);

    const showToast = (type, message) => {
        toast[type](message, {
            autoClose: 2000, // Set toast duration to 2 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => {
                // Re-enable scanning after toast closes
                setIsScanning(true);
            }
        });
    };

    const handleScan = useCallback(async (result) => {
        if (!isScanning) return;

        setIsScanning(false); // Disable scanning immediately after a scan
        const scannedUrl = result[0].rawValue;
        console.log(scannedUrl);

        const id = scannedUrl.split('/').pop();
        console.log('Extracted ID:', id);

        try {
            const response = await axios.post(`https://arrif-api.moshimoshi.cloud/api/v2/kruponam/verify-ticket/${id}`);

            switch (response.status) {
                case 200:
                    showToast('success', 'Success: Ticket is valid');
                    break;
                case 404:
                    showToast('error', 'Error: Ticket is not available');
                    break;
                case 400:
                    showToast('error', 'Error: Ticket is already entered');
                    break;
                default:
                    showToast('warn', 'Unexpected status code');
                    break;
            }
        } catch (error) {
            if (error.response) {
                showToast('error', `Error ${error.response.status}: ${error.response.data.message}`);
            } else if (error.request) {
                showToast('error', 'Error: No response received from server');
            } else {
                showToast('error', 'Error: ' + error.message);
            }
        }
    }, [isScanning]);

    return (
        <>
            <Scanner onScan={handleScan} />
            <ToastContainer />
        </>
    );
}

export default ScanQr;
