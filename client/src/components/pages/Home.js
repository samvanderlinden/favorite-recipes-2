import React, { useContext, useEffect } from 'react'
import Recipes from '../recipes/Recipes';
// import ContactForm from '../contacts/ContactForm';
// import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="grid-2">
            {/* <div>
                <ContactForm />
            </div> */}
            <div>
                {/* <ContactFilter /> */}
                <Recipes />
            </div>
        </div>
    )
}

export default Home;
