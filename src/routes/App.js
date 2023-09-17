import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "../components/Navigation";
import { db } from "../fbase";
import About from "./About";
import "./App.css";
import Auth from "./Auth";
import Detail from "./Detail";
import Home from "./Home";

function App() {
  useEffect(() => {
    console.log(db);
  });
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie-detail" element={<Detail />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
