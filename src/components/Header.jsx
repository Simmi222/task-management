<<<<<<< HEAD:src/components/Header.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/tasks?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const getAvatarLetter = () => {
    return user?.username?.charAt(0)?.toUpperCase() || 'U';
  };

  const getRoleBadgeColor = () => {
    switch(user?.role) {
      case 'ADMIN': return '#ef4444';
      case 'MANAGER': return '#f59e0b';
      case 'USER': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <header className="header glass-card">
      <div className="header-search">
        <input 
          type="text" 
          className="input" 
          placeholder="Search projects or tasks..." 
          style={{margin: 0, width: '300px'}}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="header-profile">
        <div className="avatar" style={{backgroundColor: getRoleBadgeColor()}}>
          {getAvatarLetter()}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <span style={{fontSize: '0.9rem', fontWeight: '600'}}>{user?.username || 'User'}</span>
          <span style={{fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
            {user?.role || 'USER'}
          </span>
        </div>
=======
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header glass-card">
      <div className="header-search">
        <input type="text" className="input" placeholder="Search projects or tasks..." style={{margin: 0, width: '300px'}} />
      </div>
      <div className="header-profile">
        <div className="avatar">U</div>
        <span>User</span>
>>>>>>> aaff6f9 (Add fixes for task assignment and JWT token):backend/src/components/Header.jsx
      </div>
    </header>
  );
};

export default Header;
