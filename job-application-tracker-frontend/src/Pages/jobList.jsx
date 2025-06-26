import React, { useEffect, useState } from "react";
import axios from "axios";

function JobList() {
  const token = localStorage.getItem("token");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setJobs(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch jobs", error);
      alert("Failed to load jobs. Please log in again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (jobs.length === 0) return <p>No jobs found.</p>;

  return (
    <div>
      <h3>Saved Job Applications</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <strong>{job.position}</strong> @ {job.company} <br />
            📅 Applied: {new Date(job.appliedDate).toLocaleDateString()}<br />
            🔗 <a href={job.jobLink} target="_blank" rel="noopener noreferrer">{job.platform}</a><br />
            📌 Status: {job.status} <br />
            📝 Notes: {job.notes || "—"} <br />
            📄 Resume: {job.resumePath ? <a href={`http://localhost:5000/${job.resumePath}`} target="_blank">View</a> : "No file"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
