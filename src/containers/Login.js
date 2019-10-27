import React, { useState, useEffect } from "react";
import LoaderButton from "../components/LoaderButton";
import Form from "react-bootstrap/Form";
import { useFormFields } from "../libs/hooksLib";
import { Auth } from "aws-amplify";
import "./Login.css";

export default function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [fields, setFieldValue] = useFormFields({
        email: "",
        password: ""
    });

    useEffect(() => {
        console.log("%c fields state", "color: green", fields);
    });

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            props.userHasAuthenticated(true);
            props.history.push("/");
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={setFieldValue}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={fields.password}
                        onChange={setFieldValue}
                        type="password"
                    />
                </Form.Group>
                <LoaderButton
                    block
                    isLoading={isLoading}
                    // variant="outline-primary"
                    disabled={!validateForm()}
                    type="submit"
                >
                    Login
                </LoaderButton>
            </form>
        </div>
    );
}
