import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../store/authApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/authSchema';

const Login = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(loginSchema) });

    const location = useLocation();
    const navigate = useNavigate();

    const [login] = useLoginMutation();

    const onSubmit = async (loginData) => {
        try {
            await login(loginData).unwrap();
            navigate(location.state?.from || '/dashboard', {
                replace: true,
            });
        } catch (e) {
            if (e.status === 401) {
                setError('root', {
                    type: 'server',
                    message: e.data.message,
                });
            }
            console.error('Error: ', e.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                {...register('email', {
                    required: 'Email is required',
                })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <label htmlFor="password">Password</label>
            <input
                id="password"
                {...register('password', {
                    required: 'Password is required',
                })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            {errors.root?.message && <p>{errors.root.message}</p>}

            <button type="submit" disabled={isSubmitting}>
                Login
            </button>
        </form>
    );
};

export default Login;
