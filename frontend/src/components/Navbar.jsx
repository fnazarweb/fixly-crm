import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Logout from './Logout';

const Navbar = () => {
    const { isAuthenticated, isLoading } = useAuth();

    return (
        !isLoading && (
            <nav>
                <NavLink to="/">Fixly</NavLink>
                {isAuthenticated && (
                    <NavLink to="/dashboard">Dashboard</NavLink>
                )}
                {!isAuthenticated && <NavLink to="/login">Sign In</NavLink>}
                {!isAuthenticated && <NavLink to="/register">Sign Up</NavLink>}
                {isAuthenticated && <Logout />}
            </nav>
        )
    );
};

export default Navbar;
