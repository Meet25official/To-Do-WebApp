// src/components/NewModal/New.jsx
import React, { useState, useEffect } from 'react';
import './new.scss';
import { Add } from '@mui/icons-material';

const New = ({ onClose, onSubmit, initialData }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [subtasks, setSubtasks] = useState([{ title: '', completed: false }]);

  useEffect(() => {
    if (initialData) {
      setTaskTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setCategory(initialData.category || 'Personal');
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''); // Format for input type="date"
      setTags(initialData.tags || []);
      setSubtasks(initialData.subtasks && initialData.subtasks.length > 0 ? initialData.subtasks : [{ title: '', completed: false }]);
    } else {
      // Reset form for new task
      setTaskTitle('');
      setDescription('');
      setCategory('Personal');
      setDueDate('');
      setTags([]);
      setSubtasks([{ title: '', completed: false }]);
    }
  }, [initialData]);

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { title: '', completed: false }]);
  };

  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].title = value;
    setSubtasks(newSubtasks);
  };

  const handleSave = () => {
    const taskData = {
      title: taskTitle,
      description,
      category,
      dueDate,
      tags,
      subtasks: subtasks.filter(sub => sub.title.trim() !== ''), // Only save non-empty subtasks
    };
    onSubmit(taskData);
  };

  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setTags(selectedOptions);
  };

  return (
    <div className='modal-overlay'>
      <div className="modal-content">
        <button className='close-button' onClick={onClose}>&times;</button>

        <h2>{initialData ? "Edit Task" : "Add New Task"}</h2>
        <div className='new'>
          <div className="top">
            <p className='title'>Task:</p>
            <input
              type="text"
              placeholder='Enter a Task'
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            /> <br /> <br />
            <textarea
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="center">
            <ul>
              <li>
                <p>Category</p>
                <select name="list" id="list" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Others">Others</option>
                </select>
              </li>
              <li>
                <p>Due Date</p>
                <input
                  type="date"
                  name="due_date"
                  id="due_date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </li>

              <li>
                <p>Tags</p>
                <div className="tags">
                  <select multiple
                    value={tags}
                    onChange={handleTagChange}
                    className='native-multi-select' style={{
                      width: "100%",
                      height: "100px",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="Important">Important</option>
                    <option value="Optional">Optional</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Project">Project</option>
                  </select>
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <strong>Selected: </strong>
                    {tags.join(', ')}
                  </div>
                </div>
                <p className="note" style={{ marginTop: "8px" }}>
                  <strong>Note:</strong> You can select multiple tags by holding Ctrl (Cmd on Mac). Want to add a new tag? Go to the sidebar.
                </p>
              </li>
            </ul>
            <div className="subtasks">
              <p className="sub">Subtasks: </p>
              <ul>
                {subtasks.map((sub, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      placeholder={`Subtask ${index + 1}`}
                      value={sub.title}
                      onChange={(e) => handleSubtaskChange(index, e.target.value)}
                    />
                  </li>
                ))}
                <li className='add-subtask' onClick={handleAddSubtask}>
                  <Add className='icon' /> <span>Add New subtask</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bottom">
            <button className='cancel' onClick={onClose}>Cancel</button>
            {initialData && <button className="delete">Delete</button>} {/* Show delete only for existing tasks */}
            <button className='save' onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;