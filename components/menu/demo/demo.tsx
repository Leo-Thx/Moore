import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './../Menu';
import './../../index.scss';



ReactDOM.render(
    <div>
        <Menu defaultActive="1">
            <Menu.MenuItem index="1-1">10</Menu.MenuItem>
            <Menu.MenuItem index="1-2">20</Menu.MenuItem>
            <Menu.MenuItem index="1-3" disabled>30</Menu.MenuItem>

            <Menu.SubMenu index="1-4" title="这是菜单">
                <Menu.MenuItem index="2-1">40</Menu.MenuItem>
                <Menu.MenuItem index="2-2">50</Menu.MenuItem>
                <Menu.SubMenu index="2-1" title="这是菜单这是菜单这是菜单这是菜单这是菜单这是菜单">
                    <Menu.MenuItem index="2-1-1">60</Menu.MenuItem>
                    <Menu.MenuItem index="2-1-2">70</Menu.MenuItem>
                </Menu.SubMenu>
            </Menu.SubMenu>
            
            <Menu.SubMenu index="1-5" title="这是菜单" disabled>
                <Menu.MenuItem index="1-5-1">40</Menu.MenuItem>
                <Menu.MenuItem index="1-5-2">50</Menu.MenuItem>
            </Menu.SubMenu>
        </Menu>
    </div>, 
    document.getElementById('app')
);


