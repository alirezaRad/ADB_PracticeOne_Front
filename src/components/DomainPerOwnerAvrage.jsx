import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WatchRecent from "./WatchRecent";
import WatchExpring from "./WatchExpring";

function WatchAll() {
    const [message, setMessage] = useState('');
    const [Owners, setOwners] = useState([]);
    const navigate = useNavigate();
    const fetchData = () => {

        axios.get('http://localhost:3002/api/owner-avrage')
            .then(response => {
                setOwners(response.data);
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
            <h3 className="py-2 mt-2 fw-bold text-black text-center border ">Owner - Duration</h3>
            <table className="table border">
                <thead>
                <tr>
                    <th scope="col" className="text-center">Owner</th>
                    <th scope="col" className="text-center">AverageDuration</th>
                    <th scope="col" className="text-center">TotalDuration</th>
                </tr>
                </thead>
                <tbody>
                {Owners.map(Owner => (
                    <tr key={Owner.location}>
                        <td className="text-center">{Owner.owner}</td>
                        <td className="text-center">{Owner.avgDuration}</td>
                        <td className="text-center">{Owner.totalDuration}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default WatchAll;
