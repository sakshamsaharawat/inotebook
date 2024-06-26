import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact="true" activeclassname="active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact="true" activeclassname="active" to="About">About</NavLink>
                            </li>
                        </ul>
                        {localStorage.getItem('token') ? <button onClick={handleLogout} className='btn btn-primary mx-2'> Logout</button>
                            : <> <Link className="btn btn-primary mx-2" to="login" role="button">Login</Link>
                                <Link className="btn btn-primary mx-2" to="signup" role="button">signup</Link></>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar


// why we use useLocation Hooks?
// The useLocation React Router Hook allows you to access the location object that represents the active URL. The value of the location object changes whenever the user navigates to a new URL

//  in above code when we click on home button then home button is active 
//  and when we click on about button then about button is active
//  this is because of useLocation hook which gives us the current path of the url