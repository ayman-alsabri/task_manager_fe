// src/Header.js
import React from 'react';

const Header = ({ isAuth, logOut }) => {
    return (
        <header className="header">
            <h1 style={{ marginLeft: '16px' }}>Task Manager</h1>
            <div className="profile">
                {
                    isAuth ?
                    <h1 className='log-out' onClick={logOut}>log out</h1>
                    //  <img src={require('./image.png')} style={{ maxHeight: '80px', background: '#1212122c', borderRadius: '32px' }} ></img>
                     : null
                }
            </div>
        </header>
    );
};

export default Header;
