import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { isAuthenticated, isLoading } = useAuth();

    return (
        !isLoading && (
            <nav>
                <NavLink to="/">Fixly</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>

                {!isAuthenticated && <NavLink to="/login">Sign In</NavLink>}
                {!isAuthenticated && <NavLink to="/register">Sign Up</NavLink>}

                {isAuthenticated && <NavLink to="/logout">Logout</NavLink>}
            </nav>
        )
    );
};

export default Navbar;
