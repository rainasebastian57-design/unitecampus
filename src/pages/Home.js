import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EventCard from "../components/EventCard";
import AddEvent from "./AddEvent";
import Calendar from "../components/Calendar";

function Home() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // date clicked in calendar
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "events"));
      const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events based on selectedDate
  const filteredEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate)
    : events;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, "events", id));
        fetchEvents();
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = () => {
    setEditingEvent(null);
    fetchEvents();
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
      
      {/* Header */}
      <header
        style={{
          backgroundColor: "#4CAF50",
          padding: "20px",
          color: "#fff",
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >
        University Events
      </header>

      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px" }}>
        
        {/* Calendar */}
        <div style={{ marginBottom: "30px" }}>
          <Calendar
            events={events}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        {/* Add/Edit Event Form */}
        <div style={{
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginBottom: "40px"
        }}>
          <AddEvent editingEvent={editingEvent} onSave={handleSave} />
        </div>

        {/* Event Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px"
        }}>
          {filteredEvents.length === 0 && (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#555" }}>
              No events to display for this date.
            </p>
          )}
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => handleEdit(event)}
              onDelete={() => handleDelete(event.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;




