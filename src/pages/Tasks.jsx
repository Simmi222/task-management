import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
<<<<<<< HEAD:src/pages/Tasks.jsx
import { useSearchParams } from 'react-router-dom';
=======
>>>>>>> aaff6f9 (Add fixes for task assignment and JWT token):backend/src/pages/Tasks.jsx
import AuthContext from '../context/AuthContext';

const Tasks = () => {
  const { authTokens, user } = useContext(AuthContext);
<<<<<<< HEAD:src/pages/Tasks.jsx
  const [searchParams] = useSearchParams();
=======
>>>>>>> aaff6f9 (Add fixes for task assignment and JWT token):backend/src/pages/Tasks.jsx
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
<<<<<<< HEAD:src/pages/Tasks.jsx
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
=======
  const [searchTerm, setSearchTerm] = useState('');
>>>>>>> aaff6f9 (Add fixes for task assignment and JWT token):backend/src/pages/Tasks.jsx

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resTasks, resProj, resUsers] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/tasks/', { headers: { Authorization: `Bearer ${authTokens.access}` } }),
        axios.get('http://127.0.0.1:8000/api/projects/', { headers: { Authorization: `Bearer ${authTokens.access}` } }),
        axios.get('http://127.0.0.1:8000/api/auth/list/', { headers: { Authorization: `Bearer ${authTokens.access}` } })
      ]);
      setTasks(resTasks.data);
      setProjects(resProj.data);
      setUsers(resUsers.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const assignedToValue = e.target.assigned_to.value;
      await axios.post('http://127.0.0.1:8000/api/tasks/', {
        title: e.target.title.value,
        description: e.target.description.value,
        project: parseInt(e.target.project.value),
<<<<<<< HEAD:src/pages/Tasks.jsx
        assigned_to_id: assignedToValue ? parseInt(assignedToValue) : null,
=======
        assigned_to: assignedToValue ? parseInt(assignedToValue) : null,
>>>>>>> aaff6f9 (Add fixes for task assignment and JWT token):backend/src/pages/Tasks.jsx
        status: 'TODO'
      }, {
        headers: { Authorization: `Bearer ${authTokens.access}` }
      });
      setShowForm(false);
      e.target.reset();
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to create task. Make sure you are a MANAGER or ADMIN and assigned_to user is selected.');
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${authTokens.access}` }
      });
      console.log('✅ Update successful:', response.data);
      fetchData();
    } catch(e) { 
      console.error('❌ Error details:', {
        status: e.response?.status,
        data: e.response?.data,
        message: e.message
      });
      const errorMsg = e.response?.data?.detail || 
                      e.response?.data?.error || 
                      e.response?.data?.message ||
                      'Failed to update task status';
      alert(`Error: ${errorMsg}\n\nYour User Role: ${user?.role}\nMake sure task is assigned to you!`); 
    }
  };

<<<<<<< HEAD:src/pages/Tasks.jsx
  const handleDeleteTask = async (taskId, taskTitle, projectName) => {
    if (window.confirm(`Are you sure you want to delete the task "${taskTitle}" from project "${projectName}"?`)) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
          headers: { Authorization: `Bearer ${authTokens.access}` }
        });
        alert(`Task "${taskTitle}" deleted successfully.`);
        fetchData();
      } catch (err) {
        const errorMsg = err.response?.data?.detail || 'Failed to delete task.';
        alert(`Error: ${errorMsg}`);
      }
    }
  };

=======
>>>>>>> aaff6f9 (Add fixes for task assignment and JWT token):backend/src/pages/Tasks.jsx
  return (
    <div className="container">
      <div className="glass-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap'}}>
        <h2 style={{margin: 0}}>Tasks Board</h2>
        <input 
          type="text" 
          className="input" 
          placeholder="Search projects or tasks..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{flex: 1, minWidth: '200px', margin: 0}}
        />
        {user?.role !== 'USER' && (
          <button className="btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New Task'}
          </button>
        )}
      </div>

      {showForm && (
        <div className="glass-card" style={{marginBottom: '1rem', background: 'rgba(59, 130, 246, 0.05)'}}>
          <h3>Create New Task</h3>
          <form onSubmit={handleCreate}>
            <input type="text" name="title" className="input" placeholder="Task Title" required />
            <textarea name="description" className="textarea" placeholder="Description" rows="2"></textarea>
            <select name="project" className="input" required>
              <option value="">Select Project</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select name="assigned_to" className="input" required>
              <option value="">-- Select User to Assign --</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.username} ({u.role})</option>)}
            </select>
            <button type="submit" className="btn">Save Task</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="glass-card"><p>Loading tasks...</p></div>
      ) : tasks.length === 0 ? (
        <div className="glass-card">
          <p style={{color: 'var(--text-muted)', textAlign: 'center', padding: '2rem'}}>No tasks found. Create a project and assign a task.</p>
        </div>
      ) : (
        <div className="kanban-grid">
          {['TODO', 'IN_PROGRESS', 'DONE'].map(statusGroup => {
            const filteredTasks = tasks.filter(t => 
              t.status === statusGroup && 
              (t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
               t.project.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            
            return (
            <div key={statusGroup} className="glass-card" style={{padding: '1rem', background: 'var(--bg-dark)'}}>
              <h3 style={{marginBottom: '1rem', fontSize: '1.1rem', color: statusGroup === 'TODO' ? 'var(--text-main)' : statusGroup === 'IN_PROGRESS' ? 'var(--warning)' : 'var(--success)'}}>
                {statusGroup.replace('_', ' ')} ({filteredTasks.length})
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {filteredTasks.length === 0 ? (
                  <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center'}}>No tasks</p>
                ) : (
                  filteredTasks.map(t => (
                    <div key={t.id} className="glass-card" style={{padding: '1rem', borderLeft: `3px solid ${statusGroup === 'DONE' ? 'var(--success)' : 'var(--primary)'}`}}>
                      <h4 style={{margin: 0, fontSize: '0.95rem'}}>{t.title}</h4>
                      <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.5rem 0'}}>{t.project.name}</p>
                      {t.assigned_to && <p style={{fontSize: '0.75rem', color: 'var(--warning)', margin: '0.25rem 0'}}>Assigned to: {t.assigned_to.username}</p>}
<<<<<<< HEAD:src/pages/Tasks.jsx
                      <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap'}}>
                        {statusGroup !== 'TODO' && <button className="btn btn-secondary" style={{padding: '0.2rem 0.5rem', fontSize: '0.8rem'}} onClick={() => updateStatus(t.id, statusGroup === 'DONE' ? 'IN_PROGRESS' : 'TODO')}>&lt; Move</button>}
                        {statusGroup !== 'DONE' && <button className="btn btn-secondary" style={{padding: '0.2rem 0.5rem', fontSize: '0.8rem'}} onClick={() => updateStatus(t.id, statusGroup === 'TODO' ? 'IN_PROGRESS' : 'DONE')}>Move &gt;</button>}
                        {user?.role !== 'USER' && (
                          <button 
                            className="btn btn-secondary"
                            style={{padding: '0.2rem 0.5rem', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.5)', border: '1px solid rgba(239, 68, 68, 0.8)', marginLeft: 'auto'}}
                            onClick={() => handleDeleteTask(t.id, t.title, t.project.name)}
                          >
                            🗑️ Delete
                          </button>
                        )}
=======
                      <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem'}}>
                        {statusGroup !== 'TODO' && <button className="btn btn-secondary" style={{padding: '0.2rem 0.5rem', fontSize: '0.8rem'}} onClick={() => updateStatus(t.id, statusGroup === 'DONE' ? 'IN_PROGRESS' : 'TODO')}>&lt; Move</button>}
                        {statusGroup !== 'DONE' && <button className="btn btn-secondary" style={{padding: '0.2rem 0.5rem', fontSize: '0.8rem', marginLeft: 'auto'}} onClick={() => updateStatus(t.id, statusGroup === 'TODO' ? 'IN_PROGRESS' : 'DONE')}>Move &gt;</button>}
>>>>>>> aaff6f9 (Add fixes for task assignment and JWT token):backend/src/pages/Tasks.jsx
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tasks;
