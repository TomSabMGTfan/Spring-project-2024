import React, { useState } from "react";

function RegistrationForm() {
    // States for registration
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>User {name} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div className="registration_form">
            <div>
                <h1>Sign up</h1>
                <h3>for free</h3>

            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form onSubmit={handleSubmit}>
                {/* Labels and inputs for form data */}
                <label className="label">User name</label>
                <input
                    onChange={handleName}
                    className="input"
                    value={name}
                    type="text"
                    placeholder="Enter your user name"
                />

                <label className="label">Email</label>
                <input
                    onChange={handleEmail}
                    className="input"
                    value={email}
                    type="email"
                    placeholder="Enter your email address"
                />

                <label className="label">Password</label>
                <input
                    onChange={handlePassword}
                    className="input"
                    value={password}
                    type="password"
                    placeholder="Enter your password"
                />
 <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                <p>By creating an account, you agree to the <u><b>Terms of use</b></u> and <u><b>Privacy Policy.</b></u></p>
                <button className="btn" type="submit">
                    Sign up
                </button>
               <p>Already have an account?  <u><b>Log in</b></u></p>
            </form>
        </div>
    );
}

export default RegistrationForm;