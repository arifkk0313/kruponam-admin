import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BankDetails() {
    const [qrImage, setQrImage] = useState(null); // State for storing fetched QR image
    const [selectedFile, setSelectedFile] = useState(null); // State for storing the selected file
    const [status, setStatus] = useState(false); // State for storing the status

    // Fetch the existing QR code image and status on component mount
    useEffect(() => {
        const fetchQrImage = async () => {
            try {
                const response = await axios.get('https://arrif-api.moshimoshi.cloud/api/v2/kruponam/bank-qr');
                if (response.data && response.data.data.image) {
                    setQrImage(response.data.data.image); // Set the fetched QR image URL
                }
            } catch (error) {
                console.error('Error fetching QR image:', error);
            }
        };

        const fetchStatus = async () => {
            try {
                const response = await axios.get('https://arrif-api.moshimoshi.cloud/api/v2/kruponam/bank-qr');
                if (response.data && response.data.data.status) {
                    setStatus(response.data.data.status); // Set the current status
                }
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        fetchQrImage();
        fetchStatus();
    }, []);

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Update the selected file
    };

    // Handle form submission for QR code upload
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile); // Append the selected file to FormData

        try {
            const response = await axios.post('https://arrif-api.moshimoshi.cloud/api/v2/kruponam/updateBankQr', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert('Image uploaded successfully.');
                setQrImage(response.data.image); // Update the displayed image after upload
            } else {
                alert('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading the image:', error);
        }
    };

    // Handle status toggle
    const handleStatusToggle = async () => {
        try {
            const newStatus = !status; // Toggle status value
            const response = await axios.post('https://arrif-api.moshimoshi.cloud/api/v2/kruponam/blockStatusAdmin', { status: newStatus });

            if (response.status === 200) {
                alert('Status updated successfully.');
                setStatus(newStatus); // Update the status state
            } else {
                alert('Failed to update status.');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div>
            <h2>Bank Details</h2>

            {/* Display the current QR code image */}
            {qrImage ? (
                <div>
                    <img src={qrImage} alt="Bank QR Code" style={{ width: '200px', height: '200px' }} />
                </div>
            ) : (
                <p>No QR code available</p>
            )}

            {/* Form for uploading a new QR code image */}
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Upload QR Code</button>
            </form>

            {/* Toggle for status update */}
            <div style={{ marginTop: '20px' }}>
                <label>
                    <input type="checkbox" checked={status} onChange={handleStatusToggle} />
                    Status: {status ? 'Active' : 'Inactive'}
                </label>
            </div>
        </div>
    );
}

export default BankDetails;
