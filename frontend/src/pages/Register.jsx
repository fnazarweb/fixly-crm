import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../store/authApi';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validation/authSchema';

const Register = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const navigate = useNavigate();

    const [registerUser, { isLoading, isError, error }] = useRegisterMutation();

    const onSubmit = async (registerData) => {
        try {
            //using unwrap to have possibility doing try catch
            const result = await registerUser(registerData).unwrap();
            console.log(result);
            navigate('/login', {
                replace: true,
            });
        } catch (e) {
            if (e.status === 409) {
                setError('email', { type: 'server', message: e.data.message });
            }
            console.error('Error: ', e.data.message);
        }
    };

    return (
        !isLoading && (
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Full Name</label>
                <input id="name" {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="email">Email</label>
                <input id="email" {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="business">Business name</label>
                <input id="business" {...register('businessName')} />
                {errors.businessName && <p>{errors.businessName.message}</p>}

                <label htmlFor="password">Password</label>
                <input id="password" {...register('password')} />
                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit" disabled={isSubmitting}>
                    Register
                </button>
            </form>
        )
    );
};

export default Register;
