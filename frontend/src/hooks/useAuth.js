import { useMeQuery } from '../store/authApi';

const useAuth = () => {
    const { data: user, isLoading, error, isError } = useMeQuery();

    return { user, isAuthenticated: !!user, isLoading, error, isError };
};

export default useAuth;
