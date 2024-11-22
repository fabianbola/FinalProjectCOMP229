import { Outlet, NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from '../../assets/logo.jpg';
import './header.css';

function Header(){
    const [isAdmin, setIsAdmin] = useState(false);

    // Load admin status from sessionStorage
    useEffect(() => {
      const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
      setIsAdmin(adminStatus);
    }, []);
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
                        Users
                        <ul class="dropdown">
                            <li><NavLink to="/SignIn">Sign In</NavLink></li>
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