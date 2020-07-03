import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const Navbar = () => {
    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    });
    return (
        <>
            <nav>
                <div className="nav-wrapper cyan darken-3">
                    <a href="#!" className="brand-logo">Recipe Logger</a>
                    <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="/register">Register</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="slide-out">
                <li><a href="/register">Register</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </>
    )
}

export default Navbar;
