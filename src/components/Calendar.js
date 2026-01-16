function Calendar({ events, onSelectDate }) {
  const datesWithEvents = events.map(e => e.date);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>📅 Event Calendar</h3>

      <input
        type="date"
        onChange={(e) => onSelectDate(e.target.value)}
      />

      <p style={{ fontSize: "12px", color: "#666" }}>
        Dates with events: {datesWithEvents.join(", ")}
      </p>
    </div>
  );
}

export default Calendar;

