import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from '../../assets/logo.jpg';
import UserLogo from '../../assets/user-login.png';
import { logOut } from '../../datasource/API-user';
import './header.css';
import { isAuthenticated } from '../auth/auth-helper';

function Header(){
    const [isAdmin, setIsAdmin] = useState(false);
    const Authenticated = isAuthenticated();


    // Load admin status from sessionStorage
    useEffect(() => {
      const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
      setIsAdmin(adminStatus);
    }, []);

    const { state } = useLocation();
    const { origen } = state || { origen: { pathname: '/' } };
    const [errorMsg, setErrorMsg] = useState('')
    let navigate = useNavigate();

    logOut(() => {

       const idUser = sessionStorage.getItem('idUser');
       logOut(idUser).then((response) => {
           if (response && response.success) {
             // Clear the session storage
              sessionStorage.clear();
              navigate(origen, { replace: true });
           } else {
            setErrorMsg(response.message);
           }
       }); 

     });   



    return(
        <>
            <center>
              <Link to="/">
                <img className='logo' src={logo} alt="Logo image" />
              </Link> 
            </center> 
            <nav class="navbar">
                <ul class="nav-list">
                    <li><NavLink to="/">All items</NavLink></li>
                    <li><NavLink to="/Technology">Technology</NavLink></li>
                    <li><NavLink to="/Home_kitchen">Home & Kitchen</NavLink></li>
                    <li><NavLink to="/Video_games">Video games</NavLink></li>
                    <li><NavLink to="/Musical_instruments">Musical instruments</NavLink></li>
                    <li class="vert-navbar">
                        <div class="user-container">
                            <img class="UserLogo" src={UserLogo} alt="User logo" />
                            Users
                        </div>
                        <ul class="dropdown">
                            {!Authenticated && <li><NavLink to="/SignIn">Sign In</NavLink></li>}
                            {Authenticated && <li onClick={logOut}>Log out</li>}
                            <li><NavLink to="/MyUser/Ads">{isAdmin ? "Ads History" : "My Ads"}</NavLink></li>
                            <li><NavLink to="/Register">Register</NavLink></li>
                            <li><NavLink to="/MyUser/MyQuestions">My questions</NavLink></li>
                            <li><NavLink to="/MyUser/ListUsers">List users</NavLink></li>
                            <li><NavLink to="/MyUser/MyAccount">My Account</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </nav>
          <Outlet />
        </>

    );
}

export default Header;