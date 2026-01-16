import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EventCard from "../components/EventCard";
import AddEvent from "./AddEvent";
import Calendar from "../components/Calendar";

function Home() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch events from Firestore
  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, "events"));
    const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
    setEvents(data);
  };

  useEffect(() => { fetchEvents(); }, []);

  // Filter events by calendar date
  const filteredEvents = selectedDate ? events.filter(e => e.date === selectedDate) : events;

  // Delete event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteDoc(doc(db, "events", id));
      fetchEvents();
    }
  };

  // Edit event
  const handleEdit = (event) => {
    setEditingEvent(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // After save/add
  const handleSave = () => {
    setEditingEvent(null);
    fetchEvents();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Upcoming Events</h2>

      {/* Calendar */}
      <Calendar events={events} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {/* Add/Edit Event Form */}
      <AddEvent editingEvent={editingEvent} onSave={handleSave} />

      {/* Event List */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginTop: "20px" }}>
        {filteredEvents.length === 0 && <p>No events to display.</p>}
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} onEdit={() => handleEdit(event)} onDelete={() => handleDelete(event.id)} />
        ))}
      </div>
    </div>
  );
}

export default Home;

