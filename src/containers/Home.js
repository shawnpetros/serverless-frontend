import React, { useEffect, useState } from "react";
import moment from "moment";
import { API } from "aws-amplify";
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home(props) {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated) return;

            try {
                const notes = await loadNotes();
                console.log(notes);
                setNotes(notes);
            } catch (e) {
                alert(e.message);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);

    function loadNotes() {
        return API.get("notes", "/notes");
    }

    function renderNotesList(notes) {
        return [{}]
            .concat(notes)
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((note, i) =>
                i !== 0 ? (
                    <LinkContainer
                        key={note.noteId}
                        to={`/notes/${note.noteId}`}
                    >
                        <ListGroup.Item action>
                            <h4>{note.content.trim().split("\n")[0]}</h4>
                            {"Created: " + moment(note.createdAt).fromNow()}
                        </ListGroup.Item>
                    </LinkContainer>
                ) : (
                    <LinkContainer key="new" to="/notes/new">
                        <ListGroup.Item action>
                            <h4>
                                <b>{"\uFF0B"}</b> Create a new note
                            </h4>
                        </ListGroup.Item>
                    </LinkContainer>
                )
            );
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>Scratch</h1>
                <p>A simple note taking app</p>
            </div>
        );
    }

    function renderNotes() {
        return (
            <div className="notes">
                <h1>Your Notes</h1>
                <hr />
                <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            {props.isAuthenticated ? renderNotes() : renderLander()}
        </div>
    );
}
