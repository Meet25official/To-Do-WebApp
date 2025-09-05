// src/components/tomorrow/Tomorrow.jsx
import React, { useState, useEffect } from "react";
import "./tomorrow.scss";
import { NavigateNext, Add, TodayOutlined } from '@mui/icons-material';
import New from '../NewModal/New';
import axios from 'axios';

const Tomorrow = () => {
  const [tasks, setTasks] = useState([]);
  const [openTask, setOpenTask] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const API_BASE_URL = 'http://localhost:5000/api/tasks';

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const filteredTasks = response.data.filter(task => {
        if (!task.dueDate) return false;
        const taskDueDate = new Date(task.dueDate);
        taskDueDate.setHours(0, 0, 0, 0);
        return taskDueDate.getTime() === tomorrow.getTime();
      });
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error fetching tomorrow tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCloseEditor = () => {
    setShowEditor(false);
    fetchTasks();
  };

  const handleAddTask = async (newTaskData) => {
    try {
      if (newTaskData.dueDate) {
        newTaskData.dueDate = new Date(newTaskData.dueDate).toISOString();
      }
      const response = await axios.post(API_BASE_URL, newTaskData);
      console.log('New task added:', response.data);
      handleCloseEditor();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleDetails = (id) => {
    setOpenTask(openTask === id ? null : id);
  };

  return (
    <div className="tomorrow">
      <p className="title">Tomorrow</p>
      <ul>
        <li style={{ border: "1px solid #e6e6e6" }} onClick={() => {
          setShowEditor(true);
        }}>
          <Add />
          <span style={{ marginLeft: "10px" }}>Add New Task</span>
        </li>
        {tasks.map((task) => (
          <li key={task._id}>
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
                      className="color"
                      style={{
                        backgroundColor:
                          task.category === "Personal"
                            ? "#e74c3c"
                            : task.category === "Work"
                              ? "#3498db"
                              : "#f1c40f",
                      }}
                    ></span>
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

export default Tomorrow;