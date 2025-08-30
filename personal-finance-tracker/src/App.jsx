import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import DashBoard from "./pages/DashBoard";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Signup />} /> {/* default route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
