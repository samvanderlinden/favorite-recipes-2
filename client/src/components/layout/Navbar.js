import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const Navbar = () => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;

    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    });

    const onLogout = () => {
        logout();
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper cyan darken-3">
                    <a href="#!" className="brand-logo">Recipe Logger</a>
                    <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        {isAuthenticated && user && <li><strong>Welcome {user.name}</strong></li>}
                        <li><a href="/register">Register</a></li>
                        {isAuthenticated ? (
                            <li><a href="/login" onClick={onLogout}>Logout</a></li>
                        ) : (
                                <li><a href="/login">Login</a></li>
                            )}
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="slide-out">
                <li><a href="/register">Register</a></li>{isAuthenticated ? (
                    <li><a href="/login" onClick={onLogout}>Logout</a></li>
                ) : (
                        <li><a href="/login">Login</a></li>
                    )}
            </ul>
        </>
    )
}

export default Navbar;
