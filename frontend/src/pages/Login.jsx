import { useRef } from 'react';
import { hasEmptyValue } from '../utils/validate';
import { useLoginMutation } from '../store/authApi';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef(null);
    const pwdRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [login, { isLoading, isError, error }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = pwdRef.current.value;

        if (hasEmptyValue([email, password])) {
            return;
        }

        const loginData = {
            email: email.toLowerCase(),
            password,
        };

        try {
            const user = await login(loginData).unwrap();
            console.log(user);
            navigate(location.state?.from || '/dashboard', {
                replace: true,
            });
        } catch (e) {
            console.error('Error: ', e.data.message);
        }
    };

    return (
        !isLoading && (
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input ref={emailRef} name="email" id="email" />

                <label htmlFor="password">Password</label>
                <input ref={pwdRef} name="password" id="password" />

                <button type="submit">Login</button>
            </form>
        )
    );
};

export default Login;
