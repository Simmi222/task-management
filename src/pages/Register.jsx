import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (e.target.password.value !== e.target.confirm.value) {
            alert("Passwords don't match");
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/auth/register/', {
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                role: e.target.role.value
            });
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            alert('Registration failed. Username may exist or password too weak.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{maxWidth: '400px', marginTop: '5vh'}}>
            <div className="glass-card">
                <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Register</h2>
                <form onSubmit={registerUser}>
                    <label>Username</label>
                    <input type="text" name="username" className="input" placeholder="Enter username" required />
                    
                    <label>Email</label>
                    <input type="email" name="email" className="input" placeholder="Enter email" required />

                    <label>Role</label>
                    <select name="role" className="input">
                        <option value="USER">User (View/Update assigned tasks)</option>
                        <option value="MANAGER">Manager (Create projects/tasks)</option>
                        <option value="ADMIN">Admin (Full Access - All projects & tasks)</option>
                    </select>

                    <label>Password</label>
                    <input type="password" name="password" className="input" placeholder="Create password" required />
                    
                    <label>Confirm Password</label>
                    <input type="password" name="confirm" className="input" placeholder="Confirm password" required />
                    
                    <button type="submit" className="btn" style={{width: '100%', marginTop: '1rem'}} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    <p style={{textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)'}}>
                        Already have an account? <Link to="/login" style={{color: 'white'}}>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
