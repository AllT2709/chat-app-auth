import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import Chat from "./pages/Chat";

import { UserContext } from "./context/UserContext";

export default function App() {
  const { token, user } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={!user ? <Navigate to="/login" /> : <Chat />}
        />
        <Route
          exact
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}
