import React from "react";

export default function Calendar({ events, selectedDate, setSelectedDate }) {
  // Get unique dates that have events
  const eventDates = [...new Set(events.map((e) => e.date))];

  // Sort dates (optional, for nicer order)
  eventDates.sort((a, b) => new Date(a) - new Date(b));

  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      {eventDates.length === 0 && (
        <p style={{ color: "#555" }}>No events in the calendar.</p>
      )}

      {eventDates.map((date) => (
        <div
          key={date}
          onClick={() => handleDateClick(date)}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            backgroundColor: selectedDate === date ? "#4CAF50" : "#fff",
            color: selectedDate === date ? "#fff" : "#333",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            cursor: "pointer",
            minWidth: "90px",
            textAlign: "center",
            fontWeight: "600",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {date}
        </div>
      ))}

      {/* Clear selection button */}
      {selectedDate && (
        <div
          onClick={() => setSelectedDate("")}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            backgroundColor: "#f44336",
            color: "#fff",
            cursor: "pointer",
            minWidth: "90px",
            textAlign: "center",
            fontWeight: "600",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            transition: "background 0.2s",
          }}
        >
          Clear
        </div>
      )}
    </div>
  );
}



