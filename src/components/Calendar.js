import React, { useState } from "react";

export default function Calendar({ events, selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Helper: get number of days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper: get first day of month (0=Sun, 1=Mon,...)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Event dates map for quick lookup
  const eventDatesSet = new Set(events.map((e) => e.date));

  // Format date as YYYY-MM-DD
  const formatDate = (day) => {
    const m = month + 1 < 10 ? `0${month + 1}` : month + 1;
    const d = day < 10 ? `0${day}` : day;
    return `${year}-${m}-${d}`;
  };

  // Handle click on a day
  const handleDateClick = (day) => {
    setSelectedDate(formatDate(day));
  };

  // Navigate months
  const prevMonth = () => setCurrentMonth(new Date(year, month - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1));

  // Build calendar cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = formatDate(day);
    const hasEvent = eventDatesSet.has(fullDate);
    const isSelected = selectedDate === fullDate;

    cells.push(
      <div
        key={fullDate}
        onClick={() => handleDateClick(day)}
        style={{
          padding: "10px",
          margin: "2px",
          borderRadius: "6px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isSelected ? "#4CAF50" : hasEvent ? "#e0f7fa" : "#fff",
          color: isSelected ? "#fff" : "#333",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "all 0.2s",
        }}
      >
        {day}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Month navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <button onClick={prevMonth} style={{ padding: "5px 10px" }}>◀</button>
        <h3 style={{ margin: 0 }}>{currentMonth.toLocaleString("default", { month: "long" })} {year}</h3>
        <button onClick={nextMonth} style={{ padding: "5px 10px" }}>▶</button>
      </div>

      {/* Weekday headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", fontWeight: "600", marginBottom: "5px" }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d}>{d}</div>)}
      </div>

      {/* Days */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {cells}
      </div>

      {/* Clear selection */}
      {selectedDate && (
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => setSelectedDate("")}
            style={{
              padding: "5px 10px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}




