import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ResourceHub from "./pages/ResourceHub";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  if (!user) {
    return showSignup ? (
      <Signup onSwitch={() => setShowSignup(false)} />
    ) : (
      <Login onSwitch={() => setShowSignup(true)} />
    );
  }

  return (
    <Router>
      {/* Navbar */}
      <nav style={nav}>
        <h2 style={{ margin: 0 }}>🎓 UnifyCampus</h2>

        <div style={{ display: "flex", gap: "16px" }}>
          <Link to="/" style={navLink}>Home</Link>
          <Link to="/resources" style={navLink}>Resources</Link>
          <button onClick={() => signOut(auth)} style={logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<ResourceHub />} />
      </Routes>
    </Router>
  );
}

/* ---------- STYLES ---------- */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 24px",
  background: "#0f172a",
  color: "#fff"
};

const navLink = {
  color: "#e5e7eb",
  textDecoration: "none",
  fontWeight: "500"
};

const logoutBtn = {
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  background: "#ef4444",
  color: "#fff",
  cursor: "pointer"
};

export default App;

