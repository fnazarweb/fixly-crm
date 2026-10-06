import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Layout from './Layout/Layout';
import Customers from './pages/Customers';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />

                <Route element={<GuestRoute />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<Dashboard />}></Route>
                    <Route path="customers" element={<Customers />}></Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
