import React from "react";

export default function EventCard({ event, onEdit, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        width: "250px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {/* Event Poster */}
      {event.posterUrl && (
        <img
          src={event.posterUrl}
          alt={event.title}
          style={{
            width: "100%",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
      )}

      {/* Event Title */}
      <h3 style={{ margin: "5px 0", textAlign: "center" }}>{event.title}</h3>

      {/* Event Category */}
      <p style={{ margin: "3px 0", color: "#555" }}>
        <strong>Category:</strong> {event.category}
      </p>

      {/* Event Date */}
      <p style={{ margin: "3px 0", color: "#555" }}>
        <strong>Date:</strong> {event.date}
      </p>

      {/* Registration Link */}
      {event.registrationLink && (
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "10px",
            padding: "6px 12px",
            backgroundColor: "#007BFF",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          Register
        </a>
      )}

      {/* Edit/Delete Buttons */}
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button
          onClick={onEdit}
          style={{
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: "5px 10px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}








