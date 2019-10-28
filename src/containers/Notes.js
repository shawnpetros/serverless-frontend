import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { API, Storage } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";

export default function Notes(props) {
    const file = useRef(null);
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadNote() {
            return API.get("notes", `/notes/${props.match.params.noteid}`);
        }

        async function onLoad() {
            try {
                const note = await loadNote();
                const { content, attachment } = note;

                console.log(content, attachment);

                if (attachment) {
                    note.attachmentURL = await Storage.vault.get(attachment);
                }

                setContent(content);
                setNote(note);
            } catch (e) {
                alert(e);
            }
        }

        onLoad();
    }, [props.match.params.noteid]);

    function validateForm() {
        return content.length > 0;
    }

    function formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    async function handleSubmit(event) {
        let attachment;

        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                    1000000} MB.`
            );
            return;
        }

        setIsLoading(true);
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);
    }

    return (
        <div className="Notes">
            {note && (
                <form onSubmit={handleSubmit}>
                    <Form.Group controlId="content">
                        <Form.Control
                            value={content}
                            as="textarea"
                            onChange={e => setContent(e.target.value)}
                        />
                    </Form.Group>
                    {note.attachment && (
                        <Form.Group>
                            <Form.Label>Attachment</Form.Label>
                            <Form.Control
                                plaintext
                                readOnly
                                defaultValue={formatFilename(note.attachment)}
                            />
                        </Form.Group>
                    )}
                    <Form.Group controlId="file">
                        {!note.attachment && (
                            <Form.Label>Attachment</Form.Label>
                        )}
                        <Form.Control onChange={handleFileChange} type="file" />
                    </Form.Group>
                    <LoaderButton
                        block
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Save
                    </LoaderButton>
                    <LoaderButton
                        block
                        variant="danger"
                        onClick={handleDelete}
                        isLoading={isDeleting}
                    >
                        Delete
                    </LoaderButton>
                </form>
            )}
        </div>
    );
}
