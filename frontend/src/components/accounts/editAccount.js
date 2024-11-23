import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, updateUser } from '../../datasource/API-user';

const EditAccount = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUserInfo();
            if (response && response.success) {
                setUser({
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    username: response.data.username,
                });
            } else {
                setError(response.message || 'Failed to fetch user data.');
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        const response = await updateUser(user.id, user);
        if (response && response.success) {
            setSuccess('Account updated successfully!');
            console.log("Redirecting with refreshed state", { refreshed: true });
            setTimeout(() => navigate('/MyUser/MyAccount', { state: { refreshed: true } }), 3000);
        } else {
            setError(response.message || 'Failed to update account.');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Edit Account</h1>
                    {error && <p className="flash-error">{error}</p>}
                    {success && <p className="flash-success">{success}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstNameField">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstNameField"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="lastNameField">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastNameField"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="emailField">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailField"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="usernameField">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="usernameField"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <br />
                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-save"></i> Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditAccount;
