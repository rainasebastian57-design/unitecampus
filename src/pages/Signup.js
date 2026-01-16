import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup({ onSignup, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // store error messages

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      onSignup(userCred.user); // pass logged-in user to App.js
    } catch (err) {
      // Friendly error messages
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Use at least 6 characters.");
          break;
        default:
          setError(err.message);
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "350px" }}>
      <h2>Create Account</h2>

      {/* Error message */}
      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
      )}

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Sign Up
        </button>
      </form>

      <p
        onClick={onSwitch}
        style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
      >
        Already have an account? Login
      </p>
    </div>
  );
}


