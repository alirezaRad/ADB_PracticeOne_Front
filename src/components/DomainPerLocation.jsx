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

        axios.get('http://localhost:3002/api/Locations')
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
        <div className="col-6">
            <h3 className="py-2 mt-2 fw-bold text-black text-center border ">Domain Per Location</h3>
            <table className="table border">
                <thead>
                <tr>
                    <th scope="col" className="text-center">Location</th>
                    <th scope="col" className="text-center">Count</th>
                </tr>
                </thead>
                <tbody>
                {locations.map(location => (
                    <tr key={location.location}>
                        <td className="text-center">{location.location}</td>
                        <td className="text-center">{location.count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default WatchAll;
