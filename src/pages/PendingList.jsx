import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../component/Modal'; // Adjust the path as necessary

const PendingList = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPendingRequests = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://arrif-api.moshimoshi.cloud/api/v2/kruponam/payment-request-pending', {
                    params: { search: searchQuery }
                });
                setPendingRequests(response.data.data);
            } catch (error) {
                setError('Error fetching pending payment requests.');
                console.error('Error fetching pending payment requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingRequests(); // Initial fetch

        const intervalId = setInterval(fetchPendingRequests, 5000); // Fetch every 5 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, [searchQuery]);

    const handleStatusChange = async (id, newStatus) => {
        setLoading(true);
        setError(null);
        try {
            await axios.patch(`https://arrif-api.moshimoshi.cloud/api/v2/kruponam/payment-request-update/${id}`, { status: newStatus });
            // Optimistic UI update
            setPendingRequests(prevRequests =>
                prevRequests.map(request =>
                    request._id === id ? { ...request, status: newStatus } : request
                )
            );
        } catch (error) {
            setError('Error updating payment request status.');
            console.error('Error updating payment request status:', error);
        } finally {
            setLoading(false);
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <h2>Pending List</h2>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ marginBottom: '16px', padding: '8px', width: '100%' }}
            />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Department</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Year</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingRequests?.map((request) => (
                        <tr key={request._id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{request.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{request.phone}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{request.department}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{request.year}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {request.proof && <img src={request.proof} alt="Proof" style={{ width: '100px', height: 'auto', cursor: 'pointer' }} onClick={() => openImageModal(request.proof)} />}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <select
                                    value={request.status}
                                    onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                    style={{ width: '100%' }}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={selectedImage} />
        </div>
    );
};

export default PendingList;
