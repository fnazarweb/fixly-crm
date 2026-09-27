import { useRef } from 'react';
import { hasEmptyValue } from '../utils/validate';
import { useRegisterMutation } from '../store/authApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const businessRef = useRef(null);
    const pwdRef = useRef(null);

    const navigate = useNavigate();

    const [register, { isLoading, isError, error }] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const business = businessRef.current.value;
        const password = pwdRef.current.value;

        if (hasEmptyValue([name, email, business, password])) {
            return;
        }

        const registerData = {
            name: name,
            email: email.toLowerCase(),
            businessName: business,
            password,
        };

        try {
            //using unwrap to have possibility doing try catch
            const result = await register(registerData).unwrap();
            console.log(result);
            navigate('/login', {
                replace: true,
            });
        } catch (e) {
            console.error('Error: ', e.data.message);
        }
    };

    return (
        !isLoading && (
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input ref={nameRef} name="name" id="name" />

                <label htmlFor="email">Email</label>
                <input ref={emailRef} name="email" id="email" />

                <label htmlFor="business">Business name</label>
                <input ref={businessRef} name="business" id="business" />

                <label htmlFor="password">Password</label>
                <input ref={pwdRef} name="password" id="password" />

                <button type="submit">Register</button>
            </form>
        )
    );
};

export default Register;
