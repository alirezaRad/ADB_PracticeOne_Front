// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WatchAll from './components/WatchAll';
import Add from './components/Add';
import Edit from './components/Edit'; // Import the Edit component

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">DNS Server Simulation</Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/watch-all">Search</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add">Add</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/watch-all" element={<WatchAll />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="*" element={<WatchAll />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
