import React from "react";
import { Routes, Route } from "react-router-dom";
import NewHome from "./pages/NewHome/NewHome";
import Auth from "./pages/Auth/Auth";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}></Route>
      <Route path="/home/*" element={<NewHome />}></Route>
    </Routes>
  );
}

export default App;
