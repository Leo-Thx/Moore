import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './../Menu';
import './../../index.scss';


ReactDOM.render(
    <div>
        <Menu>
            <Menu.MenuItem>123</Menu.MenuItem>
        </Menu>
    </div>, 
    document.getElementById('app')
);


