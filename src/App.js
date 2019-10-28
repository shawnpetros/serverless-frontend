import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Routes from "./Routes";
import "./App.css";

function App(props) {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        async function onLoad() {
            try {
                await Auth.currentSession();
                if (currentUser !== null) {
                    userHasAuthenticated(true);
                }
            } catch (e) {
                if (e !== "No current user") {
                    alert(e);
                }
            }

            setIsAuthenticating(false);
        }
        onLoad();
    }, [currentUser]);

    useEffect(() => {
        getSetUser();
    }, [isAuthenticated]);

    async function getSetUser() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setCurrentUser(user);
            userHasAuthenticated(true);
        } catch (e) {
            console.error(e);
        }
    }

    async function signOut() {
        await Auth.signOut();
        userHasAuthenticated(false);
        props.history.push("/signin");
    }
    return (
        !isAuthenticating && (
            <div className="App container">
                <Navbar collapseOnSelect variant="dark" bg="dark" fixed="top">
                    <LinkContainer to="/">
                        <Navbar.Brand>Scratch</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            {isAuthenticated ? (
                                <>
                                    <Navbar.Text>
                                        Signed in as:{" "}
                                        {currentUser.attributes.email}
                                    </Navbar.Text>
                                    <Nav.Link onClick={signOut}>
                                        Sign Out
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to="/signin">
                                        <Nav.Link>Sign In</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/signup">
                                        <Nav.Link>Sign Up</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
            </div>
        )
    );
}

export default withRouter(App);
