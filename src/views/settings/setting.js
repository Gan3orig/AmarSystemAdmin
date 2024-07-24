import { Link } from 'react-router-dom';
const Settings = () => {
    return (
            <div className="app-container">
                <nav className="sidebar">
                    <h2>Settings Menu</h2>
                    <ul>
                        <li><Link to="/pos">POS</Link></li>
                        <li><Link to="/equipment">Equipment</Link></li>
                        <li><Link to="/order">Order</Link></li>
                        <li><Link to="/location">Location</Link></li>
                        <li><Link to="/advertisement">Advertisement</Link></li>
                    </ul>
                </nav>
                <main className="content">
                </main>
            </div>
    );
};

export default Settings;
