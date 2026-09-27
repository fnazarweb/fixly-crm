import { authApi, useLogoutMutation } from '../store/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const [logout, { isLoading, isError }] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (e) {
            console.error('Error', e.data.message);
        } finally {
            dispatch(authApi.util.resetApiState());
            navigate('/login', { replace: true });
        }
    };
    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
