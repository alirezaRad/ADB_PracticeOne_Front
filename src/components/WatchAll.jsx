﻿import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WatchRecent from "./WatchRecent";
import WatchExpring from "./WatchExpring";
import DomainPerLocation from "./DomainPerLocation";
import DomainPerOwner from "./DomainPerOwner";
import DomainPerLocationAvrage from "./DomainPerLocationAvrage";
import DomainPerOwnerAvrage from "./DomainPerOwnerAvrage";
import DomainPerMasterIpsAvrage from "./DomainPerMasterIpsAvrage";
import DomainPerMasterIpsCount from "./DomainPerMasterIpsCount";

function WatchAll() {
    const [domains, setDomains] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const fetchData = () => {
        axios.get('http://localhost:3002/api/domains')
            .then(response => {
                setDomains(response.data);
            })
            .catch(error => {
                console.error('Error fetching domains:', error);
            });
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDomains = domains.filter(domain =>
        (domain.domain && domain.domain.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (domain.ip && domain.ip.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (domain.owner && domain.owner.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (domain.location && domain.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    

    
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/api/domains/delete/${id}`);
            // Refresh the domains list after deletion
            setMessage('Domain deleted successfully');
            fetchData();
        } catch (error) {
            console.error('Error deleting domain:', error);
            setMessage('Error deleting domain');
        }
    };
    
    const handleEdit = (id) => {
        // Navigate to the edit page with the domain ID
        navigate(`/edit/${id}`);
    };

    return (
        <div>
            <WatchRecent></WatchRecent>
            <WatchExpring></WatchExpring>
            <div className="container mt-5 mb-5 row mx-5">
                <h1 className="mt-5 mb-5">Some Reports</h1>
                <DomainPerLocation></DomainPerLocation>
                <DomainPerOwner></DomainPerOwner>
                <DomainPerLocationAvrage></DomainPerLocationAvrage>
                <DomainPerOwnerAvrage></DomainPerOwnerAvrage>
                <DomainPerMasterIpsAvrage></DomainPerMasterIpsAvrage>
                <DomainPerMasterIpsCount></DomainPerMasterIpsCount>
            </div>
            <div className="container mt-5 mx-5 mb-5">
                {message && <div className={`alert ${message.startsWith('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">{message}</div>}
                <h2>All Domains</h2>
                <h4>Search</h4>
                <input
                    type="text"
                    placeholder="Search by domain or IP"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control mb-3"
                />
                <ul className="list-group">
                    {filteredDomains.map(domain => (
                        <li key={domain._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{domain.domain}</strong> - {domain.ip}  - {domain.location} - {domain.owner} - {domain.duration}
                            </div>
                            <div>
                                <button className="btn btn-primary btn-sm m-1" onClick={() => handleEdit(domain._id)}>Edit</button>
                                <button className="btn btn-danger btn-sm m-1" onClick={() => handleDelete(domain._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default WatchAll;
