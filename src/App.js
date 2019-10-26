import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Routes from "./Routes";
import "./App.css";

export default props => (
    <div className="App container">
        <Navbar collapseOnSelect fixed="top">
            <LinkContainer to="/">
                <Navbar.Brand>Scratch</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <LinkContainer to="/signup">
                        <Nav.Link>Sign Up</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/signin">
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Routes />
    </div>
);
