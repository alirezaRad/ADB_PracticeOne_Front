import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WatchRecent from "./WatchRecent";
import WatchExpring from "./WatchExpring";

function WatchAll() {
    const [message, setMessage] = useState('');
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();
    const fetchData = () => {

        axios.get('http://localhost:3002/api/owners')
            .then(response => {
                setOwners(response.data);
            })
            .catch(error => {
                console.error('Error fetching owners:', error);
            });
    }
    
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="col-6">
            <h3 className="py-2 mt-2 fw-bold text-black text-center border ">Domain Per Owners</h3>
            <table className="table border">
                <thead>
                <tr>
                    <th scope="col" className="text-center">Owner</th>
                    <th scope="col" className="text-center">Count</th>
                </tr>
                </thead>
                <tbody>
                {owners.map(owner => (
                    <tr key={owner.owner}>
                        <td className="text-center">{owner.owner}</td>
                        <td className="text-center">{owner.count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default WatchAll;
