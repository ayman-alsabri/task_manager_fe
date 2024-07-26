import React, { useState } from 'react';
import './TaskList.css';

const TaskList = ({ tasks, removeTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const openDialog = (task) => {
    setSelectedTask(task);
  };

  const closeDialog = () => {
    setSelectedTask(null);
  };
  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={`task-item ${task.priority.toLowerCase()}-priority`} onClick={() => openDialog(task)}>
            <div className="task-details">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Due Time:</strong> {new Date(task.timestamp).toLocaleString()}</p>
            </div>
            <button className="remove-btn" onClick={(e) => {
              e.stopPropagation();
              removeTask(index)
            }}>Submit</button>
          </li>
        ))}
      </ul>
      {selectedTask && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog">
            <h3>{selectedTask.title}</h3>
            <p>{selectedTask.description}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <p><strong>Due Time:</strong> {new Date(selectedTask.timestamp).toLocaleString()}</p>
            <button className="close-btn" onClick={closeDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
