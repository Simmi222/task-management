import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    return (
        <div className="container" style={{maxWidth: '400px', marginTop: '10vh'}}>
            <div className="glass-card">
                <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Sign In</h2>
                <form onSubmit={loginUser}>
                    <label>Username</label>
                    <input type="text" name="username" className="input" placeholder="Enter username" required />
                    
                    <label>Password</label>
                    <input type="password" name="password" className="input" placeholder="Enter password" required />
                    
                    <button type="submit" className="btn" style={{width: '100%', marginTop: '1rem'}}>Login</button>
                    <p style={{textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)'}}>
                        Don't have an account? <Link to="/register" style={{color: 'white'}}>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
