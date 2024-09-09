import React, { useState } from 'react';
// import { QrReader } from 'react-qr-reader'; // Use QrReader instead of QRReader
import axios from 'axios';

const AdminPanel = () => {
    const [scannedData, setScannedData] = useState(null);
    const [message, setMessage] = useState('');

    const handleScan = async (data) => {
        if (data) {
            setScannedData(data);

            try {
                // Send the scanned data to the server to update entrance status
                const response = await axios.post('https://arrif-api.moshimoshi.cloud//api/v2/kruponam/update-entrance', {
                    qrCode: data,
                });

                if (response.status === 200) {
                    setMessage('Entrance status updated successfully!');
                } else {
                    setMessage('Failed to update entrance status.');
                }
            } catch (error) {
                setMessage('An error occurred while updating entrance status.');
            }
        }
    };

    const handleError = (error) => {
        setMessage('Error scanning QR code.', error);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
            <h1>Admin Panel</h1>
            <div style={{ marginBottom: '20px' }}>
                {/* <QrReader
                    onResult={(result, error) => {
                        console.log(error,'pppp')
                        console.log(result,"3333")
                        if (result) {
                            handleScan(result.text);
                        }
                        if (error) {
                            handleError(error);
                        }
                    }}
                    style={{ width: '100%' }}
                /> */}
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminPanel;
