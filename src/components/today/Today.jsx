// src/components/today/Today.jsx
import React, { useState, useEffect } from 'react';
import './today.scss';
import { NavigateNext, Add, TodayOutlined } from '@mui/icons-material';
import New from '../NewModal/New'; // Assuming this is the New Task modal
import axios from 'axios'; // Import axios

const Today = () => {
  const [tasks, setTasks] = useState([]);
  const [openTask, setOpenTask] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const API_BASE_URL = 'http://localhost:5000/api/tasks'; // Your backend API endpoint for tasks

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      // Filter tasks for "Today" based on your logic (e.g., dueDate)
      // For simplicity, let's assume backend returns all, and we filter here
      // You might want to add query parameters to your backend for better filtering
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to start of day

      const filteredTasks = response.data.filter(task => {
        if (!task.dueDate) return false;
        const taskDueDate = new Date(task.dueDate);
        taskDueDate.setHours(0, 0, 0, 0);
        return taskDueDate.getTime() === today.getTime();
      });
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Fetch tasks on component mount

  const handleCloseEditor = () => {
    setShowEditor(false);
    fetchTasks(); // Re-fetch tasks after closing the editor (in case a new one was added/edited)
  };

  const handleAddTask = async (newTaskData) => {
    try {
      // Format dueDate to ISO string for backend
      if (newTaskData.dueDate) {
        newTaskData.dueDate = new Date(newTaskData.dueDate).toISOString();
      }
      const response = await axios.post(API_BASE_URL, newTaskData);
      console.log('New task added:', response.data);
      handleCloseEditor(); // Close and re-fetch
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleDetails = (id) => {
    setOpenTask(openTask === id ? null : id);
  };

  return (
    <div className='today'>
      <p className='title'>Today</p>
      <ul>
        <li style={{ border: "1px solid #e6e6e6" }}
          onClick={() => {
            setShowEditor(true);
          }}
        >
          <Add />
          <span style={{ marginLeft: "10px" }}>Add New Task</span>
        </li>
        {tasks.map((task) => (
          <li key={task._id}> {/* Use task._id from MongoDB */}
            <input type="checkbox" id={task._id} />
            <label>
              {task.title}
              {openTask === task._id && (
                <div className="details">
                  <div className="left">
                    <TodayOutlined className="icon" />
                    <p>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</p>
                  </div>
                  <div className="center">
                    <span>{task.subtasks ? task.subtasks.length : 0}</span>
                    <p>Subtasks</p>
                  </div>
                  <div className="right">
                    <span
                      className='color'
                      style={{
                        backgroundColor:
                          task.category === "Personal"
                            ? "#e74c3c"
                            : task.category === "Work"
                              ? "#3498db"
                              : "#f1c40f",
                      }}>
                    </span>
                    <p>{task.category}</p>
                  </div>
                </div>
              )}
            </label>
            <NavigateNext
              className={`icon ${openTask === task._id ? "rotate" : ""}`}
              onClick={(e) => {
                toggleDetails(task._id);
              }}
            />
          </li>
        ))}
      </ul>
      {showEditor && <New onClose={handleCloseEditor} onSubmit={handleAddTask} />}
    </div>
  );
};
export default Today;