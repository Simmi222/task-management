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
      </div>
    </header>
  );
};

export default Header;
