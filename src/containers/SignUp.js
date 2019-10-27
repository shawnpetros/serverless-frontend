import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";
import "./SignUp.css";
import { Auth } from "aws-amplify";

export default function SignUp(props) {
    const [fields, setValues] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmCode: ""
    });
    const [newUser, setNewUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("%c fields state", "color: green", fields);
    });

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmForm() {
        return fields.confirmCode.length > 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);

        try {
            console.log("trying to create new user");
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password
            });
            console.log(newUser);
            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            alert(e.message);
            console.error(e);
            if (e.name === "UsernameExistsException") {
                const newUser = await Auth.resendSignUp(fields.email);
                console.log(newUser);
                setNewUser(newUser);
            }
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(e) {
        e.preventDefault();

        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmCode);
            await Auth.signIn(fields.email, fields.password);

            props.userHasAuthenticated(true);
            props.history.push("/");
        } catch (e) {
            alert(e.message);
            console.error(e.message);
            setIsLoading(false);
        }
    }

    function confirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <Form.Group controlId="confirmCode">
                    <Form.Label>Confirmation Code</Form.Label>
                    <Form.Control
                        autoFocus
                        type="tel"
                        onChange={setValues}
                        value={fields.confirmCode}
                    />
                    <Form.Text>
                        Please check your email for the confirmation code.
                    </Form.Text>
                </Form.Group>
                <LoaderButton
                    block
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateConfirmForm()}
                >
                    Verify
                </LoaderButton>
            </form>
        );
    }

    function signUpForm() {
        return (
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        onChange={setValues}
                        value={fields.email}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={setValues}
                        value={fields.password}
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={setValues}
                        value={fields.confirmPassword}
                    />
                </Form.Group>
                <LoaderButton
                    block
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Sign Up
                </LoaderButton>
            </form>
        );
    }

    return (
        <div className="signup">
            {newUser === null ? signUpForm() : confirmationForm()}
        </div>
    );
}
