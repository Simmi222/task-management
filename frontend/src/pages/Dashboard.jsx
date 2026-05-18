import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user, authTokens } = useContext(AuthContext);
  const [stats, setStats] = useState({
    activeProjects: 0,
    inProgress: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, tasksRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/projects/', { 
            headers: { Authorization: `Bearer ${authTokens.access}` } 
          }),
          axios.get('http://127.0.0.1:8000/api/tasks/', { 
            headers: { Authorization: `Bearer ${authTokens.access}` } 
          })
        ]);

        const projects = projectsRes.data;
        const tasks = tasksRes.data;

        setStats({
          activeProjects: projects.length,
          inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
          completed: tasks.filter(t => t.status === 'DONE').length
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (authTokens) {
      fetchStats();
    }
  }, [authTokens]);

  return (
    <div className="container">
      <div className="glass-card" style={{marginBottom: '1rem'}}>
        <h2>Welcome back, {user?.username}</h2>
        <p style={{color: 'var(--text-muted)'}}>Here's an overview of your active tasks and projects.</p>
      </div>
      
      {loading ? (
        <div className="glass-card" style={{textAlign: 'center', padding: '2rem'}}>
          <p>Loading stats...</p>
        </div>
      ) : (
        <div className="stats-grid">
          <div className="glass-card" style={{textAlign: 'center', padding: '1.5rem'}}>
            <h3 style={{fontSize: '2rem', color: 'var(--primary)', margin: '0 0 0.5rem 0'}}>{stats.activeProjects}</h3>
            <p>Active Projects</p>
          </div>
          <div className="glass-card" style={{textAlign: 'center', padding: '1.5rem'}}>
            <h3 style={{fontSize: '2rem', color: 'var(--warning)', margin: '0 0 0.5rem 0'}}>{stats.inProgress}</h3>
            <p>Tasks In Progress</p>
          </div>
          <div className="glass-card" style={{textAlign: 'center', padding: '1.5rem'}}>
            <h3 style={{fontSize: '2rem', color: 'var(--success)', margin: '0 0 0.5rem 0'}}>{stats.completed}</h3>
            <p>Tasks Completed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
