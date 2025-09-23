import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ServiceRequestForm from "./components/ServiceRequestForm";
import JobStatusOverview from "./components/JobStatusOverview"; 
import "./App.css";

export default function App() {
    return (
        <Router>
            <div className="navbar">
                <h2>Service Agent by SAP</h2>
                <nav>
                    <Link to="/">Job Request Page</Link>
                    <Link to="/jobs">List of All Jobs</Link>
                </nav>
            </div>
            <Routes>
                <Route path="/" element={<ServiceRequestForm />} />
                <Route path="/jobs" element={<JobStatusOverview />} />
            </Routes>
        </Router>
    );
}
