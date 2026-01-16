import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";

function ResourceHub() {
  const [resources, setResources] = useState([]);
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [editingResource, setEditingResource] = useState(null);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("notes");
  const [message, setMessage] = useState("");

  // Fetch resources
  const fetchResources = async () => {
    const snapshot = await getDocs(collection(db, "resources"));
    const data = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    setResources(data);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Filtered resources
  const filteredResources = resources.filter(res => {
    const deptMatch = department ? res.department === department : true;
    const semMatch = semester ? res.semester === semester || res.semester === "All" : true;
    return deptMatch && semMatch;
  });

  // Add or Update Resource
  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !url || !department) {
      setMessage("Title, URL and Department are required.");
      return;
    }

    try {
      if (editingResource) {
        // Update
        await updateDoc(doc(db, "resources", editingResource.id), {
          title,
          url,
          department,
          semester,
          type
        });
        setMessage("Resource updated successfully!");
      } else {
        // Add new
        await addDoc(collection(db, "resources"), {
          title,
          url,
          department,
          semester,
          type
        });
        setMessage("Resource added successfully!");
      }
      setTitle("");
      setUrl("");
      setDepartment("");
      setSemester("All");
      setType("notes");
      setEditingResource(null);
      fetchResources();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  // Edit
  const handleEdit = (res) => {
    setEditingResource(res);
    setTitle(res.title);
    setUrl(res.url);
    setDepartment(res.department);
    setSemester(res.semester || "All");
    setType(res.type || "notes");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  


  return (
    <div style={page}>
      <div style={container}>
        <h1 style={titleStyle}>📚 Resource Hub</h1>
        <p style={subtitle}>
          Access notes, question papers, syllabus, and important links
        </p>

        {/* Add / Edit Form */}
        <div style={formContainer}>
          <h3>{editingResource ? "Edit Resource" : "Add New Resource"}</h3>
          {message && <p style={{ color: "green" }}>{message}</p>}

          <form onSubmit={handleSave} style={formStyle}>
            <input
              style={input}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              style={input}
              placeholder="Resource URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <select
              style={input}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="ERE">ERE</option>
              <option value="CE">CE</option>
            </select>
            <select
              style={input}
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
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
            <select
              style={input}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="notes">Notes</option>
              <option value="question-paper">Question Paper</option>
              <option value="syllabus">Syllabus</option>
            </select>
            <button type="submit" style={btn}>
              {editingResource ? "Update Resource" : "Add Resource"}
            </button>
          </form>
        </div>

        {/* Filters */}
        <div style={filterBar}>
          <select
            style={select}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ERE">ERE</option>
            <option value="CE">CE</option>
          </select>

          <select
            style={select}
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">All Semesters</option>
            <option value="1">Sem 1</option>
            <option value="2">Sem 2</option>
            <option value="3">Sem 3</option>
            <option value="4">Sem 4</option>
            <option value="5">Sem 5</option>
            <option value="6">Sem 6</option>
            <option value="7">Sem 7</option>
            <option value="8">Sem 8</option>
          </select>
        </div>

        {/* Resource Cards */}
        {filteredResources.length === 0 && (
          <p style={{ color: "#64748b" }}>No resources found</p>
        )}
        <div style={grid}>
          {filteredResources.map((res) => (
            <div key={res.id} style={card}>
              <h3 style={cardTitle}>{res.title}</h3>
              <p style={meta}>
                {res.department} • Semester {res.semester || "All"} • {res.type}
              </p>
              <a href={res.url} target="_blank" rel="noreferrer" style={link}>
                Open Resource →
              </a>
              <div style={actionBar}>
                <button style={editBtn} onClick={() => handleEdit(res)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
const page = { background: "#f1f5f9", minHeight: "100vh", padding: "40px 16px" };
const container = { maxWidth: "1100px", margin: "auto" };
const titleStyle = { fontSize: "28px", fontWeight: "700" };
const subtitle = { color: "#64748b", marginBottom: "24px" };
const formContainer = { background: "#fff", padding: "20px", borderRadius: "12px", marginBottom: "24px", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" };
const formStyle = { display: "flex", flexDirection: "column", gap: "10px" };
const input = { padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" };
const btn = { padding: "10px 16px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" };
const filterBar = { display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" };
const select = { padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", background: "#fff", minWidth: "160px" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" };
const card = { background: "#fff", borderRadius: "14px", padding: "18px", boxShadow: "0 10px 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" };
const cardTitle = { fontSize: "16px", fontWeight: "600", marginBottom: "6px" };
const meta = { fontSize: "13px", color: "#64748b", marginBottom: "14px" };
const link = { color: "#2563eb", fontWeight: "600", textDecoration: "none", fontSize: "14px" };
const actionBar = { display: "flex", gap: "8px", marginTop: "10px" };
const editBtn = { flex: 1, padding: "6px 8px", background: "#facc15", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };


export default ResourceHub;

