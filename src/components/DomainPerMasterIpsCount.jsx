import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WatchRecent from "./WatchRecent";
import WatchExpring from "./WatchExpring";

function WatchAll() {
    const [message, setMessage] = useState('');
    const [ips, setIps] = useState([]);
    const navigate = useNavigate();
    const fetchData = () => {

        axios.get('http://localhost:3002/api/master-ips')
            .then(response => {
                setIps(response.data);
            })
            .catch(error => {
                console.error('Error fetching Locations:', error);
            });
    }
    
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="col-6 mt-3">
            <h3 className="py-2 mt-2 fw-bold text-black text-center border ">FirstIPNumber - Count</h3>
            <table className="table border">
                <thead>
                <tr>
                    <th scope="col" className="text-center">FirstIPNumber</th>
                    <th scope="col" className="text-center">Count</th>
                </tr>
                </thead>
                <tbody>
                {ips.map(ip => (
                    <tr key={ip.firstIPNumber}>
                        <td className="text-center">{ip.firstIPNumber}</td>
                        <td className="text-center">{ip.count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default WatchAll;
