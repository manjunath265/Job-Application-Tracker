import React, { useState } from "react";
import axios from "axios";

function JobForm() {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    appliedDate: "",
    platform: "",
    status: "Applied",
    notes: "",
    resume: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token before request
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ You are not logged in.");
      return;
    }

    // Build FormData
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    try {
      const res = await axios.post("http://localhost:5000/api/jobs", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Job added successfully!");
      setMessage("");

      // Reset form
      setFormData({
        company: "",
        position: "",
        appliedDate: "",
        platform: "",
        status: "Applied",
        notes: "",
        resume: null,
      });
    } catch (err) {
      console.error("Error submitting job:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to submit job.";

      setMessage(`❌ ${errorMessage}`);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Submit New Job Application</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: 10 }}>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Date Applied:</label>
          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Platform (Optional):</label>
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offered</option>
            <option>Rejected</option>
          </select>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Resume (PDF Only):</label>
          <input type="file" onChange={handleFileChange} accept=".pdf" />
        </div>

        <button type="submit" style={{ marginTop: 10 }}>
          📤 Submit Job
        </button>
      </form>
    </div>
  );
}

export default JobForm;