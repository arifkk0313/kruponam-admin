import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [counts, setCounts] = useState({ totalRequest: 0, pendingRequest: 0, successRequest: 0, rejectedRequest: 0 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3019/api/v2/kruponam/payment-request-count');
            console.log(response.data)            
            setCounts({
                totalRequest: response.data.totalRequest,
                pendingRequest: response.data.pendingRequest,
                successRequest: response.data.successRequest,
                rejectedRequest: response.data.rejectedRequest,
            });
        } catch (error) {
            console.error('Error fetching payment request counts:', error);
        }
    };

    return (
        <div style={{ marginLeft: '20px' }}>
            <h2>Dashboard</h2>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ padding: '20px', backgroundColor: '#1DB954', borderRadius: '8px', color: 'white' }}>
                    <h3>Total Requests</h3>
                    <p>{counts.totalRequest}</p>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#ffa500', borderRadius: '8px', color: 'white' }}>
                    <h3>Approved Requests</h3>
                    <p>{counts.successRequest}</p>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#808080', borderRadius: '8px', color: 'white' }}>
                    <h3>Pending Requests</h3>
                    <p>{counts.pendingRequest}</p>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#e22134', borderRadius: '8px', color: 'white' }}>
                    <h3>Rejected Requests</h3>
                    <p>{counts.rejectedRequest}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
