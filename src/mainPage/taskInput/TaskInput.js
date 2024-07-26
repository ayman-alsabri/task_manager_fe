// src/TaskInput.js
import React, { useState } from 'react';
import './TaskInput.css'; // Import your CSS file here

const TaskInput = ({ preId, userId, addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [priority, setPriority] = useState('low');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation (you can enhance this as needed)
        if (!title.trim()) {
            alert('Please enter a title for the task.');
            return;
        }

        // Construct the new task object

        //     id: 8,
        // title: "Client MeetAFing",
        // description: "Meet with the client to discuss project requirements.",
        // timestamp: new Date('2024-06-22T11:00:00Z').getTime(),
        // priority: "High",
        // userId: 2

        

        const newTask = {
            id: preId + 1, //will come from the http requset because the ids are from the date base for maltilple users 
            timeStamp: new Date(timestamp).toISOString(), // Convert timestamp to ISO format
            title,
            description,
            priority,
            userId: userId
        };

        console.log('Adding new task:', newTask);
        addTask(newTask)
        // Reset form fields
        setTitle('');
        setDescription('');
        setTimestamp('');
        setPriority('low');
    };

    return (
        <div className="task-input">
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className='tAndP'>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="input-field title"
                        />
                    </label>
                    <label>
                        Priority:
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="input-field priority">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                </div>

                <label>
                    Description:
                    <br></br>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field textarea-field"
                    />
                </label>
                <label>
                    Due Time:
                    <input
                        type="datetime-local"
                        value={timestamp}
                        onChange={(e) => setTimestamp(e.target.value)}
                        required
                        className="input-field"
                    />
                </label>

                <button type="submit" className="submit-btn">Add Task</button>
            </form>
        </div>
    );
};

export default TaskInput;
