import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Projects = () => {
  const { authTokens, user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/projects/', {
        headers: { Authorization: `Bearer ${authTokens.access}` }
      });
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/projects/', {
        name: e.target.name.value,
        description: e.target.description.value
      }, {
        headers: { Authorization: `Bearer ${authTokens.access}` }
      });
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      alert('Failed to create project. Ensure you are a MANAGER or ADMIN.');
    }
  };

  return (
    <div className="container">
      <div className="glass-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <h2>Projects</h2>
        {user?.role !== 'USER' && (
          <button className="btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New Project'}
          </button>
        )}
      </div>

      {showForm && (
        <div className="glass-card" style={{marginBottom: '1rem', background: 'rgba(59, 130, 246, 0.05)'}}>
          <h3>Create New Project</h3>
          <form onSubmit={handleCreate}>
            <input type="text" name="name" className="input" placeholder="Project Name" required />
            <textarea name="description" className="textarea" placeholder="Description" rows="3" required></textarea>
            <button type="submit" className="btn">Save Project</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="glass-card"><p>Loading projects...</p></div>
      ) : projects.length === 0 ? (
        <div className="glass-card">
          <p style={{color: 'var(--text-muted)', textAlign: 'center', padding: '2rem'}}>No projects found.</p>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {projects.map(p => (
            <div key={p.id} className="glass-card" style={{padding: '1.5rem', borderLeft: '4px solid var(--primary)'}}>
              <h3 style={{color: 'var(--text-main)', marginBottom: '0.5rem'}}>{p.name}</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>{p.description}</p>
              <div style={{marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '0.8rem'}}>
                <span style={{background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px'}}>Status: {p.status}</span>
                <span style={{background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px'}}>Owner: {p.owner?.username}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
