import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import "../../App.css";

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    const { setAlert } = alertContext;

    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')// redirect to the home page
        }
        if (error === 'Invalid credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value }); //using spread syntax to keep state of user for each onChange invocation
    }

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger')
        } else {
            login({
                email,
                password
            })
        }

    }

    return (
        <div className="form-container">
            <h3 className="login-heading">
                Login
            </h3>
            <div className="row">
                <form onSubmit={onSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <input id="email" type="email" name="email" value={email} onChange={onChange} />
                            <label htmlFor="email">Email Address</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock</i>
                            <input id="password" type="password" name="password" value={password} onChange={onChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <input type="submit" value="Login" className="btn btn-primary btn-block" />
                </form>
            </div>
        </div>
    )
}

export default Login;
