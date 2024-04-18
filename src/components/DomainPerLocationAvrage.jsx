import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WatchRecent from "./WatchRecent";
import WatchExpring from "./WatchExpring";

function WatchAll() {
    const [message, setMessage] = useState('');
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();
    const fetchData = () => {

        axios.get('http://localhost:3002/api/locations-avrage')
            .then(response => {
                setLocations(response.data);
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
            <h3 className="py-2 mt-2 fw-bold text-black text-center border ">Location - Duration</h3>
            <table className="table border">
                <thead>
                <tr>
                    <th scope="col" className="text-center">Location</th>
                    <th scope="col" className="text-center">AverageDuration</th>
                    <th scope="col" className="text-center">TotalDuration</th>
                </tr>
                </thead>
                <tbody>
                {locations.map(location => (
                    <tr key={location.location}>
                        <td className="text-center">{location.location}</td>
                        <td className="text-center">{location.avgDuration}</td>
                        <td className="text-center">{location.totalDuration}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default WatchAll;
