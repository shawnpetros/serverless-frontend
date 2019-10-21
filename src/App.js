import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";

export default props => (
  <div className="App container">
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">Scratch</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar>
  </div>
);
