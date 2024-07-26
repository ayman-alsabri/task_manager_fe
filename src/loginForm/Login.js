// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const instance = axios.create({
    baseURL: 'http://localhost:3005',
    withCredentials: true
});

const Login = ({ addUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', userName: '' });
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = (e) => {
        // e.preventDefault();
        setShowPassword(!showPassword);
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            alert("password is too short");
            return;
        }
        let isOk = false;
        if (isLogin) {
            await fetch('https://13147da3-5fde-4fc1-83dd-554335daa759.mock.pstmn.io/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                // mode: 'cors',
                body: JSON.stringify({
                    email: formData.email, password: formData.password
                }),
                //  credentials: 'include'
            }).then((res) => {
                isOk = res.ok;
                return isOk? res.json():res.statusText;
            }).then((value) => {
                if (isOk) {
                  return addUser(value.userName, value.id);
                  
                }
                alert(value)
                return;
            })
        } else {
            if (formData.password !== formData.confirmPassword) {
                alert("password doesn't match");
                return;
            }
            await fetch('https://13147da3-5fde-4fc1-83dd-554335daa759.mock.pstmn.io/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({
                    name: formData.userName, email: formData.email, password: formData.password
                })
            }).then((res) => {
                isOk = res.ok;
                return res.json();
            }).then((value) => {
                if (isOk) {
                    addUser(formData.userName, value.id);
                    return;
                }
                alert(value)
                return;
            });
        }
    };

    // const toggleForm = () => {
    //     setIsLogin(!isLogin);
    //     setFormData({ email: '', password: '', confirmPassword: '' });
    // };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="tabs">
                    <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Sign Up</button>
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="userName"
                            placeholder="User Name"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div>
                        <input
                            className='password'
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            require

                        />
                        <button
                            type='button'
                            className='showPassword'
                            onClick={togglePassword}>{showPassword ? 'hide' : 'show'}
                        </button>
                    </div>
                    {!isLogin && (
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
