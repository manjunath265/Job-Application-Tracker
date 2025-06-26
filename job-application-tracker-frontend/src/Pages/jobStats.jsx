import React, { useEffect, useState } from "react";
import axios from "axios";

function JobStats({ token }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    total: 0,
    applied: 0,
    interviewing: 0,
    offered: 0,
    rejected: 0
  });

  const fetchStats = async () => {
    console.log("📊 Fetching stats with token:", token ? "✅" : "❌ Missing");

    if (!token) {
      console.error("🚫 No token provided");
      alert("Please log in again.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setJobs(res.data);
      calculateStats(res.data);
    } catch (err) {
      console.error("🚨 Stats fetch error:", err.response?.data || err.message);
      alert("Failed to load stats. Please check your connection or log in again.");
    } finally {
      setLoading(false);
    }
  };

const calculateStats = (jobs) => {
  const statusMap = {
    applied: 0,
    interviewing: 0,
    offered: 0,
    rejected: 0
  };

  jobs.forEach((job) => {
    const statusKey = job.status?.toLowerCase().trim();
    if (statusMap.hasOwnProperty(statusKey)) {
      statusMap[statusKey]++;
    }
  });

  setCounts({
    total: jobs.length,
    applied: statusMap.applied,
    interviewing: statusMap.interviewing,
    offered: statusMap.offered,
    rejected: statusMap.rejected
  });
};


useEffect(() => {
  if (token) {
    fetchStats();
  } else {
    console.warn("No token found. Skipping stats fetch.");
  }
}, [token]);


  if (loading) return <p>Loading job insights...</p>;

  return (
    <div>
      <h3>📊 Application Insights</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li>📌 Total Jobs Applied: <strong>{counts.total}</strong></li>
        <li>🟡 Applied: <strong>{counts.applied}</strong></li>
        <li>🟠 Interviewing: <strong>{counts.interviewing}</strong></li>
        <li>🟢 Offered: <strong>{counts.offered}</strong></li>
        <li>🔴 Rejected: <strong>{counts.rejected}</strong></li>
      </ul>
    </div>
  );
}

export default JobStats;