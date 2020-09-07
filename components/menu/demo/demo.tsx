import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './../Menu';
import './../../index.scss';



ReactDOM.render(
    <div>
        <Menu defaultActive="10">
            {
                [10, 20, 30, 40].map((item, index)=>{
                    return <Menu.MenuItem key={index} index={String(item)} disabled>{item}</Menu.MenuItem>
                })
            }
            <span>1234</span>
        </Menu>
    </div>, 
    document.getElementById('app')
);


