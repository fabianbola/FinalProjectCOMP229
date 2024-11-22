import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { signin } from "../../datasource/API-user";
import { authenticate } from "./auth-helper";


const Signin = () => {

    const { state } = useLocation();
    const { from } = state || { from: { pathname: '/' } };

    const [errorMsg, setErrorMsg] = useState('')
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    let navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevFormData) => ({ ...prevFormData, [name]: value })); // keep other form data unchanged
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default submission
        
        signin(user).then((response) => {
            if (response && response.success) {
                // Set admin status based on the response
                const isAdminFlag = response.user && response.user.isAdmin; // Assuming API returns a user object with `isAdmin`
                sessionStorage.setItem('isAdmin', isAdminFlag);

                authenticate(response.token, () => {
                    // Navigate to the previous page or homepage
                    navigate(from, { replace: true });

                    // Reload the app to ensure updated Header (optional)
                    window.location.reload();
                });
            } else {
                setErrorMsg(response.message);
            }
        }).catch((err) => {
            setErrorMsg(err.message);
            console.log(err);
        });
    };

    return (           
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <h1>Sign In</h1>
                        <p className="flash"><span>{errorMsg}</span></p>
                        <form onSubmit={handleSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="emailTextField">Email</label> 
                                <input type="text" className="form-control"
                                    id="emailTextField"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={user.email || ''}
                                    onChange={handleChange}
                                    required>
                                </input>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="passowordTextField">Password</label>
                                <input type="password" className="form-control"
                                    id="passowordTextField"
                                    placeholder=""
                                    name="password"
                                    value={user.password || ''}
                                    onChange={handleChange}
                                    required>
                                </input>
                            </div>
                            <br />

                            <button className="btn btn-primary" type="submit">
                                <i className="fas fa-edit"></i>
                                Submit
                            </button>
                            &nbsp; &nbsp;
                            <Link to="/Register" style={{ textDecoration: 'none' }}>
                                <i className="fas fa-user-plus"></i> Register
                            </Link>

                        </form>
                    </div>

                </div>
            </div>
    );
}

export default Signin;