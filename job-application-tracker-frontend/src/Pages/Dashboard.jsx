import React, { useState } from "react";
import JobForm from "./jobForm";
import JobList from "./jobList";
import JobStats from "./jobStats";

function Dashboard({ token }) {
  const [activeTab, setActiveTab] = useState("form");

  const renderTab = () => {
    switch (activeTab) {
      case "form":
        return <JobForm token={token} />;
      case "list":
        return <JobList token={token} />;
      case "stats":
        return <JobStats token={token} />;
      default:
        return <JobForm token={token} />;
    }
    console.log("Dashboard token:", token);

  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Your Job Application Dashboard</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("form")}>📝 Add/Edit Job</button>
        <button onClick={() => setActiveTab("list")}>📂 Saved Jobs</button>
        <button onClick={() => setActiveTab("stats")}>📊 Job Insights</button>
      </div>

      <div>{renderTab()}</div>
    </div>
  );
}

export default Dashboard;
