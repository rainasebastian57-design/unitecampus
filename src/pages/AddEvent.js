import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

function AddEvent({ editingEvent, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title || "");
      setDate(editingEvent.date || "");
      setCategory(editingEvent.category || "");
      setPosterUrl(editingEvent.posterUrl || "");
    } else {
      setTitle("");
      setDate("");
      setCategory("");
      setPosterUrl("");
    }
  }, [editingEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date || !category) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingEvent) {
        // Update event
        const eventRef = doc(db, "events", editingEvent.id);
        await updateDoc(eventRef, { title, date, category, posterUrl });
      } else {
        // Add new event
        await addDoc(collection(db, "events"), { title, date, category, posterUrl });
      }

      // Clear form
      setTitle("");
      setDate("");
      setCategory("");
      setPosterUrl("");

      onSave(); // refresh Home.js
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ flex: "1 1 150px" }}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ flex: "1 1 120px" }}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ flex: "1 1 120px" }}
        required
      />
      <input
        type="text"
        placeholder="Poster Image URL"
        value={posterUrl}
        onChange={(e) => setPosterUrl(e.target.value)}
        style={{ flex: "1 1 200px" }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "6px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {editingEvent ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
}

export default AddEvent;



