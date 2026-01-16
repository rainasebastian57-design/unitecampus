import React from "react";

export default function EventCard({ event, onEdit, onDelete }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Poster */}
      {event.posterUrl && (
        <img
          src={event.posterUrl}
          alt="Event Poster"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
          }}
        />
      )}

      <div style={{ padding: "15px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Title */}
        <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem", color: "#333" }}>
          {event.title}
        </h3>

        {/* Category & Date */}
        <p style={{ margin: "0 0 5px 0", fontSize: "0.9rem", color: "#666" }}>
          <strong>Category:</strong> {event.category || "N/A"}
        </p>
        <p style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "#666" }}>
          <strong>Date:</strong> {event.date}
        </p>

        {/* Buttons */}
        <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={onEdit}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#E74C3C",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E74C3C")}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}




