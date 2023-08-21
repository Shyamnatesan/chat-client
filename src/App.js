import React from "react";
import { Routes, Route } from "react-router-dom";
import NewHome from "./pages/NewHome/NewHome";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<NewHome />}></Route>
      <Route path="/auth" element={<Auth />}></Route>
    </Routes>
  );
}

export default App;
