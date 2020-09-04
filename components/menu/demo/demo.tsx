import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './../Menu';
import './../../index.scss';


ReactDOM.render(
    <div>
        <Menu>
            <Menu.MenuItem>1</Menu.MenuItem>
            <Menu.MenuItem>2</Menu.MenuItem>
            <Menu.MenuItem>3</Menu.MenuItem>
            <span>1234</span>
        </Menu>
    </div>, 
    document.getElementById('app')
);


