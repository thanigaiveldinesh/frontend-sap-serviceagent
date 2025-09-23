import React, { useState, useEffect } from "react";

export default function JobStatusOverview() {
    const [jobList, setJobList] = useState([]); 
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [error, setError] = useState(null); 

    const fetchJobs = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/jobs");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setJobList(data);
        } catch (err) {
            setError(err.message); 
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJobs();
        const interval = setInterval(fetchJobs, 5000);
        return () => clearInterval(interval);
    }, []);

    const toggleFavorite = (jobId) => {
        if (favorites.includes(jobId)) {
            setFavorites(favorites.filter((id) => id !== jobId));
        } else {
            setFavorites([...favorites, jobId]);
        }
    };

    const displayedJobs = showFavorites
        ? jobList.filter((job) => favorites.includes(job.id))
        : jobList;

    return (
        <div className="card" style={{ padding: "20px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0, flex: 1, textAlign: "center" }}>List of All Jobs</h3>
                <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <input
                        type="checkbox"
                        checked={showFavorites}
                        onChange={() => setShowFavorites(!showFavorites)}
                    />
                    Show Favorites Only
                </label>
            </div>

            {/* Error */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Job Table */}
            {displayedJobs.length === 0 ? (
                <p>No jobs found</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Scheduled Time</th>
                            <th>Favorite</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedJobs.map((job) => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.name}</td>
                                <td>{job.status}</td>
                                <td>{job.scheduledTime ? new Date(job.scheduledTime).toLocaleString() : "-"}</td>
                                <td>
                                    <button
                                        className={`favorite-button ${favorites.includes(job.id) ? 'active' : ''}`}
                                        onClick={() => toggleFavorite(job.id)}
                                        style={{
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            backgroundColor: favorites.includes(job.id) ? "gold" : "lightgray",
                                            color: favorites.includes(job.id) ? "white" : "black",
                                            border: "none",
                                        }}
                                    >
                                        ★
                                    </button>
                                </td>
                                <td>
                                    <button
                                        style={{ padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                        onClick={() => alert(JSON.stringify(job, null, 2))}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
