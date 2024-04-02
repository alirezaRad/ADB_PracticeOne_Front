import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [domain, setDomain] = useState('');
    const [ip, setIp] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchDomain = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/api/domains/${id}`);
                const { domain, ip } = response.data;
                setDomain(domain);
                setIp(ip);
            } catch (error) {
                console.error('Error fetching domain:', error);
            }
        };

        fetchDomain();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Domain name validation
        const domainPattern = /^(?:(?:(?:https?|ftp):)?\/\/)?(?:[\w-]+\.)+[a-z]{2,6}$/i;
        if (!domainPattern.test(domain)) {
            setMessage('Error : Invalid domain name. Please enter a valid domain.');
            return;
        }

        // IP address validation
        const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        if (!ipPattern.test(ip)) {
            setMessage('Error : Invalid IP address. Please enter a valid IP address.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3002/api/domains/update/${id}`, { domain, ip });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error : " + error.response.data.message);
            console.error('Error updating domain and IP:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Domain</h2>
            {message && <div className={`alert ${message.startsWith('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="domain" className="form-label">Domain:</label>
                    <input type="text" className="form-control" id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="ip" className="form-label">IP:</label>
                    <input type="text" className="form-control" id="ip" value={ip} onChange={(e) => setIp(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary m-3" onClick={() => navigate('/watch-all')}>Back to Watch All</button>
            </form>
        </div>
    );
}

export default Edit;
