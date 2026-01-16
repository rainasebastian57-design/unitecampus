import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export default function AddEvent({ editingEvent, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");

  // Load event data if editing
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title || "");
      setDate(editingEvent.date || "");
      setCategory(editingEvent.category || "");
      setPosterUrl(editingEvent.posterUrl || "");
      setRegistrationLink(editingEvent.registrationLink || "");
    } else {
      setTitle("");
      setDate("");
      setCategory("");
      setPosterUrl("");
      setRegistrationLink("");
    }
  }, [editingEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = { title, date, category, posterUrl, registrationLink };

    try {
      if (editingEvent) {
        const eventRef = doc(db, "events", editingEvent.id);
        await updateDoc(eventRef, eventData);
      } else {
        await addDoc(collection(db, "events"), eventData);
      }

      // Clear form
      setTitle(""); setDate(""); setCategory(""); setPosterUrl(""); setRegistrationLink("");
      onSave();
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", backgroundColor: "#f9f9f9", marginBottom: "20px" }}>
      <h3>{editingEvent ? "Edit Event" : "Add Event"}</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Event Title" value={title} required onChange={(e) => setTitle(e.target.value)} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="date" placeholder="Event Date" value={date} required onChange={(e) => setDate(e.target.value)} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" placeholder="Category (e.g., Cultural, Technical)" value={category} required onChange={(e) => setCategory(e.target.value)} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" placeholder="Poster URL" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" placeholder="Registration Link (Optional)" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          {editingEvent ? "Update Event" : "Add Event"}
        </button>
      </form>
    </div>
  );
}
