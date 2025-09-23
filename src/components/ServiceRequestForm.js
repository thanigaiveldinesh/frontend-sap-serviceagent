import React, { useState, useEffect } from "react";

export default function ServiceRequestForm() {
    const [name, setName] = useState("");
    const [endpoint, setEndpoint] = useState("http://localhost:8080/api/jobs");
    const [method, setMethod] = useState("POST");
    const [bodyFields, setBodyFields] = useState({ task: "runTest" });
    const [headers, setHeaders] = useState([{ key: "", value: "" }]);
    const [executionType, setExecutionType] = useState("execute");
    const [scheduleDate, setScheduleDate] = useState("");
    const [response, setResponse] = useState("");
    const [jsonBody, setJsonBody] = useState("{}");
    const [jobId, setJobId] = useState("");

    useEffect(() => {
        const job = {
            name,
            endpoint,
            method,
            headers: headers.filter((h) => h.key || h.value),
            body: bodyFields,
            scheduledTime: executionType === "schedule" && scheduleDate ? new Date(scheduleDate).toISOString() : null,
        };
        setJsonBody(JSON.stringify(job, null, 2));
    }, [name, endpoint, method, headers, bodyFields, executionType, scheduleDate]);

    const addHeaderRow = () => setHeaders([...headers, { key: "", value: "" }]);
    const removeHeaderRow = (index) => setHeaders(headers.filter((_, i) => i !== index));

    const submitJob = async () => {
        try {
            let url = endpoint;
            let fetchOptions = {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    endpoint,
                    method,
                    headers,
                    body: bodyFields,
                    scheduledTime: executionType === "schedule" && scheduleDate ? new Date(scheduleDate).toISOString() : null,
                }),
            };

            if ((method === "PUT" || method === "DELETE") && jobId) {
                url = `${endpoint}/${jobId}`;
                if (method === "DELETE") delete fetchOptions.body;
            }

            const res = await fetch(url, fetchOptions);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (err) {
            setResponse("Error: " + err.message);
        }
    };

    return (
        <div className="card" style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
     
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <h3>Job Request & Management</h3>
            </div>

            
            {method !== "DELETE" && (
                <div style={{ marginBottom: "10px" }}>
                    <label>Name:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Job Name"
                        style={{ width: "100%" }}
                    />
                </div>
            )}

            {/* Method and Endpoint */}
            <div className="row" style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <div style={{ flex: "1" }}>
                    <label>Method:</label>
                    <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ width: "100%" }}>
                        <option>POST</option>
                        <option>PUT</option>
                        <option>DELETE</option>
                    </select>
                </div>
                <div style={{ flex: "3" }}>
                    <label>Endpoint URL:</label>
                    <input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} style={{ width: "100%" }} />
                </div>
            </div>

            {/* Job ID */}
            {(method === "PUT" || method === "DELETE") && (
                <div style={{ marginBottom: "10px" }}>
                    <label>Job ID:</label>
                    <input
                        type="number"
                        value={jobId}
                        onChange={(e) => setJobId(e.target.value)}
                        style={{ width: "100%" }}
                    />
                </div>
            )}

            {/* Headers */}
            {method !== "DELETE" && (
                <>
                    <h4>Headers</h4>
                    {headers.map((h, i) => (
                        <div key={i} className="header-row" style={{ display: "flex", gap: "5px", alignItems: "center", marginBottom: "5px" }}>
                            <input
                                placeholder="Key"
                                value={h.key}
                                onChange={(e) => {
                                    const newHeaders = [...headers];
                                    newHeaders[i].key = e.target.value;
                                    setHeaders(newHeaders);
                                }}
                                style={{ flex: 1 }}
                            />
                            <input
                                placeholder="Value"
                                value={h.value}
                                onChange={(e) => {
                                    const newHeaders = [...headers];
                                    newHeaders[i].value = e.target.value;
                                    setHeaders(newHeaders);
                                }}
                                style={{ flex: 2 }}
                            />
                            {headers.length > 1 && (
                                <button onClick={() => removeHeaderRow(i)} style={{ width: "auto", flexShrink: 0, padding: "2px 6px", fontSize: "12px", marginLeft: "5px" }}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button onClick={addHeaderRow} style={{ marginTop: "5px" }}>
                        + Add Header
                    </button>
                </>
            )}

            {/* Body Fields */}
            {method !== "DELETE" && (
                <>
                    <h4>Body Fields</h4>
                    <textarea
                        value={JSON.stringify(bodyFields, null, 2)}
                        onChange={(e) => {
                            try {
                                setBodyFields(JSON.parse(e.target.value));
                            } catch {}
                        }}
                        style={{ width: "100%", minHeight: "80px", marginBottom: "10px" }}
                    />
                    <h4>Body JSON Preview</h4>
                    <textarea value={jsonBody} readOnly style={{ width: "100%", minHeight: "80px", marginBottom: "10px" }} />
                </>
            )}

            {/* Execution options */}
            {method !== "DELETE" && (
                <>
                    <h4>Execution</h4>
                    <div className="execution-options" style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                        <div className="execution-option">
                            <input
                                type="radio"
                                id="exec-now"
                                name="execution"
                                checked={executionType === "execute"}
                                onChange={() => setExecutionType("execute")}
                            />
                            <label htmlFor="exec-now">Execute Now</label>
                        </div>
                        <div className="execution-option">
                            <input
                                type="radio"
                                id="exec-schedule"
                                name="execution"
                                checked={executionType === "schedule"}
                                onChange={() => setExecutionType("schedule")}
                            />
                            <label htmlFor="exec-schedule">Schedule</label>
                        </div>
                    </div>
                    {executionType === "schedule" && (
                        <input
                            type="datetime-local"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            style={{ width: "100%", marginBottom: "10px" }}
                        />
                    )}
                </>
            )}

            <button onClick={submitJob} style={{ marginTop: "20px", padding: "10px 20px", width: "100%" }}>
                Submit
            </button>

            {response && (
                <div className="response-box" style={{ marginTop: "20px" }}>
                    <h4>Response</h4>
                    <pre>{response}</pre>
                </div>
            )}
        </div>
    );
}
