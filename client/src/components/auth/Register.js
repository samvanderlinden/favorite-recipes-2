import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import '../../App.css';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { setAlert } = alertContext;

    const { name, email, password, password2 } = user;

    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')// redirect to the home page
        }
        if (error === 'User already exists') {
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
        if (name === "" || password === "" || email === "") {
            setAlert('Please enter all fields', 'danger')
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger')
        } else {
            register({ name, email, password });
        }

    }

    return (
        <div className="form-container">
            <h3 className="register-heading">
                Register
            </h3>
            <div className="row">
                <form onSubmit={onSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">person</i>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name="name" value={name} onChange={onChange} />
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" name="email" value={email} onChange={onChange} />
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock</i>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" value={password} onChange={onChange} minLength="6" />
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">check</i>
                            <label htmlFor="password2">Confirm Password</label>
                            <input id="password2" type="password" name="password2" value={password2} onChange={onChange} minLength="6" />
                        </div>
                        <input type="submit" value="Register" className="btn btn-primary btn-block" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
