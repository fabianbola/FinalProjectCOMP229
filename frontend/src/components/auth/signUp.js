import { useState } from "react";
import { signup } from "../../datasource/API-user";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    let navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        signup(user).then((response) => {
            if (response && response.success) {
                setSuccessMsg("Account created successfully! Redirecting...");
                setTimeout(() => navigate("/signin"), 3000);
            } else {
                setErrorMsg(response.message || "Signup failed. Try again.");
            }
        }).catch(err => {
            setErrorMsg(err.message || "An error occurred.");
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Sign Up</h1>
                    {errorMsg && <p className="flash-error">{errorMsg}</p>}
                    {successMsg && <p className="flash-success">{successMsg}</p>}
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="firstNameField">First Name</label>
                            <input type="text" className="form-control"
                                id="firstNameField"
                                placeholder="Enter your first name"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                required />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="lastNameField">Last Name</label>
                            <input type="text" className="form-control"
                                id="lastNameField"
                                placeholder="Enter your last name"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                required />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="emailField">Email</label>
                            <input type="email" className="form-control"
                                id="emailField"
                                placeholder="Enter your email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="usernameField">Username</label>
                            <input type="text" className="form-control"
                                id="usernameField"
                                placeholder="Choose a username"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                required />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="passwordField">Password</label>
                            <input type="password" className="form-control"
                                id="passwordField"
                                placeholder="Enter a password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required />
                        </div>
                        <br />
                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-user-plus"></i> Sign Up
                        </button>
                        &nbsp; &nbsp;
                        <Link to="/signin" style={{ textDecoration: 'none' }}>
                            Already have an account? Sign In
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;

