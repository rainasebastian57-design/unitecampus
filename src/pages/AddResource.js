import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function AddResource({ onSave }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("All");
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !url || !department) {
      setError("Title, URL, and Department are required.");
      return;
    }

    try {
      await addDoc(collection(db, "resources"), {
        title,
        url,
        department,
        semester,
        type: "notes",
      });
      setTitle("");
      setUrl("");
      setDepartment("");
      setSemester("All");
      if (onSave) onSave(); // refresh parent list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={formContainer}>
      <h3>Add New Resource</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={input}
        />
        <input
          placeholder="Resource URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          style={input}
        />
        <select value={department} onChange={e => setDepartment(e.target.value)} style={input}>
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="ME">ME</option>
        </select>
        <select value={semester} onChange={e => setSemester(e.target.value)} style={input}>
          <option value="All">All Semesters</option>
          <option value="1">Sem 1</option>
          <option value="2">Sem 2</option>
          <option value="3">Sem 3</option>
          <option value="4">Sem 4</option>
          <option value="5">Sem 5</option>
          <option value="6">Sem 6</option>
          <option value="7">Sem 7</option>
          <option value="8">Sem 8</option>
        </select>
        <button type="submit" style={btn}>Add Resource</button>
      </form>
    </div>
  );
}

/* ---------- STYLES ---------- */
const formContainer = { background: "#fff", padding: "20px", borderRadius: "12px", marginBottom: "20px", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" };
const input = { padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" };
const btn = { padding: "10px 16px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" };

export default AddResource;
