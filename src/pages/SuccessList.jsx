import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../component/Modal'; // Adjust the path as necessary

const SuccessList = () => {
    const [successfulRequests, setSuccessfulRequests] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchSuccessfulRequests();
    }, [searchQuery]); // Fetch data when searchQuery changes

    const fetchSuccessfulRequests = async () => {
        try {
            const response = await axios.get('http://localhost:3019/api/v2/kruponam/payment-request-success', {
                params: { search: searchQuery } // Pass the search query to the API
            });
            setSuccessfulRequests(response.data.data);
        } catch (error) {
            console.error('Error fetching successful payment requests:', error);
        }
    };

    const openImageModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const getEntranceStyle = (entrance) => {
        return {
            backgroundColor: entrance ? 'lightgreen' : 'lightcoral',
            color: entrance ? 'darkgreen' : 'darkred',
            padding: '8px',
            textAlign: 'center',
            fontWeight: 'bold',
        };
    };

    return (
        <div>
            <h2>Success List</h2>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name, phone, department, or year"
                style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
            />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Department</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Year</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Entrance</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Booking Id</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>QR Image</th>
                    </tr>
                </thead>
                <tbody>
                    {successfulRequests.map((request) => (
                        <tr key={request._id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{request.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{request.phone}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{request.department}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{request.year}</td>
                            <td style={getEntranceStyle(request.entrance)}>
                                {request.entrance ? 'Yes' : 'No'}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{request.bookingId}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {request.qrImage &&
                                    <img
                                        src={request.qrImage}
                                        alt="QR Code"
                                        style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                                        onClick={() => openImageModal(request.qrImage)}
                                    />
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for image */}
            <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={selectedImage} />
        </div>
    );
};

export default SuccessList;
