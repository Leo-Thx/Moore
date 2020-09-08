import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './../Menu';
import './../../index.scss';



ReactDOM.render(
    <div>
        <Menu defaultActive="1">
            <Menu.MenuItem index="1-1" icon="check-circle">菜单一</Menu.MenuItem>
            <Menu.MenuItem index="1-2">菜单二</Menu.MenuItem>
            <Menu.MenuItem index="1-3" disabled>菜单三</Menu.MenuItem>

            <Menu.SubMenu index="1-4" title="菜单四" icon="check-circle-fill">
                <Menu.MenuItem index="2-1">二级菜单一</Menu.MenuItem>
                <Menu.MenuItem index="2-2">二级菜单二</Menu.MenuItem>
                <Menu.SubMenu index="2-1" title="菜单四一">
                    <Menu.MenuItem index="2-1-1">三级菜单一</Menu.MenuItem>
                    <Menu.MenuItem index="2-1-2">三级菜单二</Menu.MenuItem>
                    {/* <Menu.SubMenu index="2-1" title="菜单四一">
                        <Menu.MenuItem index="2-1-1">三级菜单一</Menu.MenuItem>
                        <Menu.MenuItem index="2-1-2">三级菜单二</Menu.MenuItem>
                    </Menu.SubMenu> */}
                </Menu.SubMenu>
            </Menu.SubMenu>
            
            <Menu.SubMenu index="1-5" title="菜单五" disabled>
                <Menu.MenuItem index="1-5-1">二级菜单一</Menu.MenuItem>
                <Menu.MenuItem index="1-5-2">二级菜单二</Menu.MenuItem>
            </Menu.SubMenu>
        </Menu>
    </div>, 
    document.getElementById('app')
);


