import React from "react";
import "./styles/tailwind.css";
import "./styles/index.css";
import Routes from "./Routes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;