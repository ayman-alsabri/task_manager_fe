import './App.css';
import Login from './loginForm/Login';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Header from './mainPage/header/Header';
import TaskInput from './mainPage/taskInput/TaskInput';
import TaskList from './mainPage/taskList/TaskList';
import './App.css'; // Import your CSS file here


const App = () => {


  const [userCredintials, setUserCredintials] = useState({ route: "login", id: null, userName: '' });
  const isAuth = userCredintials.route === "login";

  const [tasks, setTasks] = useState([]);


  const getTasks = async (id) => {
    let isOk = false;
    // http://localhost:3005/tasks${id}
    const tasks = await (fetch(`https://13147da3-5fde-4fc1-83dd-554335daa759.mock.pstmn.io/tasks1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      // credentials: 'include'
    }).then((res) => {
      isOk = res.ok;
      return isOk ? res.json() : res.statusText;
    }).then((value) => {
      if (isOk) {
        return value;
      }
      alert(value)
      return [];
    }))
    return tasks;
  }

  const addTask = async (task) => {
    let isOk = false;
    const id = await (fetch(`https://13147da3-5fde-4fc1-83dd-554335daa759.mock.pstmn.io/add`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        userid: task.userId,
        title: task.title,
        description: task.description,
        priority: task.priority,
        timeStamp: task.timeStamp
      }),
      // credentials: 'include'
    }).then((res) => {
      isOk = res.ok;
      return res.json()
    }).then((value) => {
      if (isOk) {
        return value;
      }
      const notification = document.getElementById('notification');
      notification.className = 'show';
      notification.textContent = `${value}`
      setTimeout(() => {
        notification.className = notification.className.replace('show', '');
      }, 3000);
      return;
    }));
    if (isOk) {
      task.id = id;
      console.log(task)
      setTasks([...tasks, task])
    }

  }

  const removeTask = async (index) => {
    const id = tasks[index].id;
    // http://localhost:3005/task${id}
    await (fetch(`https://13147da3-5fde-4fc1-83dd-554335daa759.mock.pstmn.io/task40`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      // credentials: 'include'
    }).then((res) => {
      if (res.ok) {
        const newTasks = tasks.slice(0, index).concat(tasks.slice(index + 1))
        setTasks(newTasks);
      }
      return res.ok ? res.json() : res.statusText;
    }).then((value) => {
      const notification = document.getElementById('notification');
      notification.className = 'show';
      notification.textContent = `${value}`
      setTimeout(() => {
        notification.className = notification.className.replace('show', '');
      }, 3000);
      return;
    }))
  };
  // add the deletion of the user date (name id ..etc)
  const logOut = async () => {
    // http://localhost:3005/logout
    await (fetch(`https://13147da3-5fde-4fc1-83dd-554335daa759.mock.pstmn.io/logout`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      // credentials: 'include'
    }).then((res) => {
      return res.ok ? res.json() : res.statusText;
    }).then((value) => {
      const notification = document.getElementById('notification');
      notification.className = 'show';
      notification.textContent = `${value}`
      setTimeout(() => {
        notification.className = notification.className.replace('show', '');
      }, 3000);    }))
    setUserCredintials({ route: "login", id: null, userName: '' })
  }

  return (

    <Router>
      <div className="app">
        <Header isAuth={!isAuth} logOut={logOut} />
        <div className="main">
          <div id="notification"></div>
          {
            isAuth ? <Login addUser={
              async (userName, id) => {
                setUserCredintials({ ...userCredintials, userName: userName, id: id, route: 'home' })
                const tasks = await getTasks(id)
                return setTasks(tasks);
              }} ></Login> :
              <Routes>
                <Route path='/' element={
                  <Navigate to={'/tasks'}>
                  </Navigate>
                }></Route>
                <Route path="/tasks"
                  element={
                    <div className='main-dev'>
                      <TaskInput preId={tasks.length} userId={userCredintials.id} addTask={addTask} />
                      {/* delete the filter because the filteration will come from the backend  */}
                      <TaskList removeTask={removeTask} tasks={tasks} />
                    </div>
                  }>
                </Route>
                <Route path='*' element={
                  <Navigate to={'/'}></Navigate>
                }>
                </Route>
              </Routes>}
        </div>
      </div>
    </Router>
  );
};

export default App;
