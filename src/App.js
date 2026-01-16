import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  // If user is NOT logged in
  if (!user) {
    return isSignup ? (
      <Signup
        onSignup={setUser}
        onSwitch={() => setIsSignup(false)}
      />
    ) : (
      <Login
        onLogin={setUser}
        onSwitch={() => setIsSignup(true)}
      />
    );
  }

  // If user IS logged in
  return <Home />;
}

export default App;


