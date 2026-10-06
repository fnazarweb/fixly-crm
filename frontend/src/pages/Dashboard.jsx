import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    return (
        <section>
            <h1>Dashboard</h1>
            <NavLink to="/customers">Check Customers</NavLink>
        </section>
    );
};

export default Dashboard;
