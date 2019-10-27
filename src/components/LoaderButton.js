import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export default function LoaderButton({
    isLoading,
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <Button
            className={`loader-button ${className}`}
            variant="primary"
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <Spinner
                    style={{
                        padding: 11
                    }}
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            )}
            {props.children}
        </Button>
    );
}
