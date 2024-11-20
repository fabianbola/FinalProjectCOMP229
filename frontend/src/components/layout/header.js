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
              <NavLink to="/users/signin">
                    <button type="button" >
                        <span className="navbar-toggler-icon"></span> Signin
                    </button>
              </NavLink>
            </center>
                
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
            
                <nav className="navbar">
                    <ul className="nav-list">
                        <li>
                        <NavLink to="/">
                            <i> </i> All items
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to="/Technology">
                            <i></i> Technology
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to="/Home_kitchen">
                            <i></i> Home & kitchen
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to="/Video_games">
                            <i></i> Video games
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to="/Musical_instruments">
                            <i></i> Musical instruments
                        </NavLink>
                        </li>
                    </ul>  
                </nav>

             </div>
          <Outlet />
        </>

    );
}

export default Header;