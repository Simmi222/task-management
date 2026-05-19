import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user, authTokens } = useContext(AuthContext);
  const [stats, setStats] = useState({
    activeProjects: 0,
    inProgress: 0,
<<<<<<< HEAD:src/pages/Dashboard.jsx
    completed: 0,
    totalTasks: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
=======
    completed: 0
  });
>>>>>>> aaff6f9 (Add fixes for task assignment and JWT token):backend/src/pages/Dashboard.jsx
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
<<<<<<< HEAD:src/pages/Dashboard.jsx
          completed: tasks.filter(t => t.status === 'DONE').length,
          totalTasks: tasks.length
        });
        
        setRecentTasks(tasks.slice(0, 5));
=======
          completed: tasks.filter(t => t.status === 'DONE').length
        });
>>>>>>> aaff6f9 (Add fixes for task assignment and JWT token):backend/src/pages/Dashboard.jsx
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
<<<<<<< HEAD:src/pages/Dashboard.jsx
      {/* Welcome Card */}
      <div className="glass-card" style={{marginBottom: '2rem', textAlign: 'center'}}>
        <h2 style={{marginBottom: '0.5rem'}}>Welcome back</h2>
        <p style={{color: 'var(--text-muted)', fontSize: '1.05rem'}}>Here's an overview of your team's work.</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="glass-card" style={{padding: '3rem', textAlign: 'center'}}>
          <p style={{color: 'var(--text-muted)'}}>Loading dashboard...</p>
        </div>
      ) : (
        <>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
            {/* Active Projects Card */}
            <div style={{background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', padding: '1.5rem', backdropFilter: 'blur(10px)', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{fontSize: '2.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px'}}>
                📁
              </div>
              <div>
                <p style={{fontSize: '2rem', fontWeight: '700', margin: '0'}}>{stats.activeProjects}</p>
                <p style={{color: 'var(--text-muted)', margin: '0.5rem 0 0 0', fontSize: '0.9rem'}}>Active Projects</p>
              </div>
            </div>

            {/* Tasks in Progress */}
            <div style={{background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', padding: '1.5rem', backdropFilter: 'blur(10px)', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{fontSize: '2.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px'}}>
                ⏳
              </div>
              <div>
                <p style={{fontSize: '2rem', fontWeight: '700', margin: '0'}}>{stats.inProgress}</p>
                <p style={{color: 'var(--text-muted)', margin: '0.5rem 0 0 0', fontSize: '0.9rem'}}>Tasks In Progress</p>
              </div>
            </div>

            {/* Completed Tasks */}
            <div style={{background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', padding: '1.5rem', backdropFilter: 'blur(10px)', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{fontSize: '2.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px'}}>
                ✓
              </div>
              <div>
                <p style={{fontSize: '2rem', fontWeight: '700', margin: '0'}}>{stats.completed}</p>
                <p style={{color: 'var(--text-muted)', margin: '0.5rem 0 0 0', fontSize: '0.9rem'}}>Completed Tasks</p>
              </div>
            </div>

            {/* Total Tasks */}
            <div style={{background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', padding: '1.5rem', backdropFilter: 'blur(10px)', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{fontSize: '2.5rem', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px'}}>
                📋
              </div>
              <div>
                <p style={{fontSize: '2rem', fontWeight: '700', margin: '0'}}>{stats.totalTasks}</p>
                <p style={{color: 'var(--text-muted)', margin: '0.5rem 0 0 0', fontSize: '0.9rem'}}>Your Tasks</p>
              </div>
            </div>
          </div>

          {/* Recent Tasks Section */}
          <div className="glass-card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
              <h3 style={{margin: '0'}}>Recent Tasks</h3>
              <a href="/tasks" style={{color: 'var(--primary)', textDecoration: 'none', fontWeight: '500'}}>View all →</a>
            </div>
            
            {recentTasks.length > 0 ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {recentTasks.map((task) => (
                  <div key={task.id} style={{background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid var(--primary)'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem'}}>
                      <h4 style={{margin: '0', fontSize: '1.05rem'}}>{task.title}</h4>
                      <span style={{background: task.status === 'DONE' ? '#10b981' : task.status === 'IN_PROGRESS' ? '#f59e0b' : '#06b6d4', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600'}}>
                        {task.status === 'IN_PROGRESS' ? 'In Progress' : task.status}
                      </span>
                    </div>
                    <p style={{color: 'var(--text-secondary)', margin: '0.5rem 0', fontSize: '0.9rem'}}>{task.project?.name}</p>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(148, 163, 184, 0.1)', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                      <span>Assigned to: <strong style={{color: 'var(--text-primary)'}}>{task.assigned_to?.username || 'Unassigned'}</strong></span>
                      <span>{new Date(task.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-muted)'}}>
                <p>No tasks yet. Create a project and add tasks to get started.</p>
              </div>
            )}
          </div>
        </>
=======
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
>>>>>>> aaff6f9 (Add fixes for task assignment and JWT token):backend/src/pages/Dashboard.jsx
      )}
    </div>
  );
};

export default Dashboard;
