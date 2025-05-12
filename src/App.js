import React, { useState, useEffect } from 'react';
import './App.css';
import { FaSearch } from 'react-icons/fa'; // Add the search icon from react-icons

function App() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: ''
    });
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [searchQuery, setSearchQuery] = useState(''); // State for the search query

    const toggleForm = () => {
        setShowForm(!showForm);
        setIsEditing(false);
        setFormData({ title: '', description: '', dueDate: '', status: '' });
    };

    const fetchTasks = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/tasks');
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && editTaskId) {
                const res = await fetch(`http://localhost:5000/api/tasks/${editTaskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const updatedTask = await res.json();
                setTasks(tasks.map(task => (task.id === editTaskId ? updatedTask : task)));
            } else {
                const res = await fetch('http://localhost:5000/api/tasks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const newTask = await res.json();
                setTasks([...tasks, newTask]);
            }
            setShowForm(false);
            setFormData({ title: '', description: '', dueDate: '', status: '' });
            setIsEditing(false);
            setEditTaskId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (task) => {
        setFormData({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            status: task.status
        });
        setIsEditing(true);
        setEditTaskId(task.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const changeMonth = (offset) => {
        let newMonth = selectedMonth + offset;
        let newYear = selectedYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        } else if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        setSelectedMonth(newMonth);
        setSelectedYear(newYear);
    };

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const monthName = new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const today = new Date();

    const filteredTasks = tasks.filter(task => {
        return task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="App">
            <nav className="navbar">
                <h1>Task Manager</h1>
                <button className="create-btn" onClick={toggleForm}>Create Task</button>
            </nav>

            {showForm && (
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
                        <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                        <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} required />
                        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} required>
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button type="submit">{isEditing ? 'Update Task' : 'Submit Task'}</button>
                    </form>
                </div>
            )}

            <div className="content">
                <div className="submitted-task">
                    <h2>Submitted Tasks</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="search-icon" />
                    </div>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <div key={task.id} className="task-card">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p><strong>Due:</strong> {task.dueDate}</p>
                                <p><strong>Status:</strong> {task.status}</p>
                                <div className="task-buttons">
                                    <button className="edit-btn" onClick={() => handleEdit(task)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tasks submitted yet.</p>
                    )}
                </div>

                <div className="calendar">
                    <div className="calendar-header-bar">
                        <button onClick={() => changeMonth(-1)}>&lt;</button>
                        <h2>{monthName} - {selectedYear}</h2>
                        <button onClick={() => changeMonth(1)}>&gt;</button>
                        <select value={selectedYear} onChange={handleYearChange}>
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={i} value={2020 + i}>{2020 + i}</option>
                            ))}
                        </select>
                    </div>
                    <div className="calendar-grid">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="calendar-header">{day}</div>
                        ))}
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="calendar-day empty"></div>
                        ))}
                        {Array.from({ length: daysInMonth }, (_, dayIndex) => {
                            const currentDate = new Date(selectedYear, selectedMonth, dayIndex + 1);
                            const isToday = today.toDateString() === currentDate.toDateString();
                            return (
                                <div key={dayIndex} className={`calendar-day${isToday ? ' today' : ''}`}>
                                    {dayIndex + 1}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
