import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { logoutUser } = useContext(AuthContext);
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <aside className="sidebar glass-card">
      <div className="sidebar-logo">
        <h2>Simaran<span>Pro</span></h2>
      </div>
      <nav className="sidebar-nav">
        <Link to="/" className={`nav-link ${isActive('/')}`}>Dashboard</Link>
        <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>Projects</Link>
        <Link to="/tasks" className={`nav-link ${isActive('/tasks')}`}>Tasks</Link>
      </nav>
      <div className="sidebar-footer">
        <button onClick={logoutUser} className="btn btn-secondary" style={{width: '100%'}}>Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
