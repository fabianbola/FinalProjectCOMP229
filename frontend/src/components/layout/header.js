import { Outlet, NavLink, Link } from "react-router-dom";
import logo from '../../assets/logo.jpg';
import './header.css';

function Header(){
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
                            <li><NavLink to="/signin">Signin</NavLink></li>
                            <li><NavLink to="/Register">Register</NavLink></li>
                            <li><NavLink to="/MyAds">My ads</NavLink></li>
                            <li><NavLink to="/users/signin">My questions</NavLink></li>
                            <li><NavLink to="/users/signin">Create ad</NavLink></li>
                            <li><NavLink to="/users/signin">List users</NavLink></li>
                            <li><NavLink to="/users/signin">My Account</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </nav>
          <Outlet />
        </>

    );
}

export default Header;