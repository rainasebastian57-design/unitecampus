import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      onLogin(userCred.user);
    } catch (err) {
      if (err.code === "auth/user-not-found") setError("User not found.");
      else if (err.code === "auth/wrong-password") setError("Incorrect password.");
      else if (err.code === "auth/invalid-email") setError("Invalid email format.");
      else setError(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F5F5F5",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "360px",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {/* Logo placeholder */}
        <div style={{ marginBottom: "30px" }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2rSFs8CNz3NFtHaZ1fomytxAJQX9lNukZQA&s"
            alt="Logo"
            style={{ width: "120px" }}
          />
        </div>

        <h2 style={{ marginBottom: "20px", fontWeight: "600", color: "#333" }}>
          Welcome Back
        </h2>

        {error && (
          <p style={{ color: "#E74C3C", marginBottom: "15px", fontSize: "0.9rem" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#FF5722",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <p
          onClick={onSwitch}
          style={{
            marginTop: "20px",
            fontSize: "0.9rem",
            color: "#FF5722",
            cursor: "pointer",
          }}
        >
          Don't have an account? Sign Up
        </p>
      </div>
    </div>
  );
}


