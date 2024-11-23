import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../datasource/API-user';
import { Link, useLocation } from 'react-router-dom';

const Account = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    /*const fetchUserInfo = async () => {
        try {
            console.log("Fetching user info");

            const data = await getUserInfo();
            console.log("User info response:", data);

            if (data && data.success) {
                setUser(data.data);
            } else {
                console.error(data ? data.message : "Failed to fetch user info");
                setError(data ? data.message : "Failed to fetch user info");
            }
        } catch (err) {
            console.error("Error fetching user info:", err);
            setError("Error fetching user info");
        } finally {
            setLoading(false);
        }
    };*/

    const fetchUserInfo = async () => {
        try {
            console.log("Fetching user info");
            const data = await getUserInfo();
            console.log("User info response:", data);
    
            if (data && data.success) {
                setUser(data.data);
                console.log("User data set:", data.data);
            } else {
                console.error(data ? data.message : "Failed to fetch user info");
                setError(data ? data.message : "Failed to fetch user info");
            }
        } catch (err) {
            console.error("Error fetching user info:", err);
            setError("Error fetching user info");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        // Check if the location state indicates that data should be refreshed
        if (location.state?.refreshed) {
            console.log("Refreshing user info after edit", location.state);
            fetchUserInfo(); // Ahora la función está definida y disponible aquí
        }
    }, [location.state]);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Account Information</h2>
            {user ? (
                <div>
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                </div>
            ) : (
                <p>No user information available.</p>
            )}
            <div style={{ marginTop: '20px' }}>
                <Link to="/MyUser/MyQuestions" className="btn">My Questions</Link>
                <Link to="/MyUser/Ads" className="btn">My Ads</Link>
                <Link to="/Myuser/MyAccount/Edit" className="btn">Edit Account</Link>
            </div>
        </div>
    );
};

export default Account;
