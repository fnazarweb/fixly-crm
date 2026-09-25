import authService from '../services/authService.js';

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
};

const register = async (req, res) => {
    const user = await authService.register(req.body);
    res.status(201).json(user);
};

const login = async (req, res) => {
    const result = await authService.login(req.body);
    res.cookie('token', result.token, cookieOptions);
    res.status(200).json({ user: result.userData });
};

const logout = async (req, res) => {
    res.clearCookie('token', cookieOptions);
    res.status(204).end();
};

export default {
    register,
    login,
    logout,
};
