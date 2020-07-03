import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = (props) => {
    console.log('PrivateRoute props', props);
    const authContext = useContext(AuthContext);

    const { component: Component, ...rest} = props;

    const { isAuthenticated, loading } = authContext;

    return (
        <Route { ...rest } render={props => !isAuthenticated && !loading ? (
            <Redirect to='/login' />
        ) : (
            <Component { ...props } /> 
        )}/>
    )
}

export default PrivateRoute;
