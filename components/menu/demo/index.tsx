import React from 'react';
import Menu from './../Menu';

const Wrapper = () => {
    let [show, setShow] = React.useState(true);
    const handleClick = React.useCallback(()=>{
        setShow(!show);
    }, [show]);

    function select(){
        console.info(arguments);
    }

    function click(){
        console.info('click: ', arguments);
    }

    return (
        <>
            <button onClick={handleClick}>click-{show}</button>
            {show ? <Menu defaultActive="1" mode="horizontal" className="my-menu" onSelect={select} onClick={click}>
                <Menu.MenuItem icon="check-circle">菜单一</Menu.MenuItem>
                <Menu.MenuItem index="1">菜单二</Menu.MenuItem>
                <Menu.MenuItem>菜单三</Menu.MenuItem>

                <Menu.SubMenu title="SubMenu-Two" className="my-submenu">
                    <Menu.MenuItem>二级菜单一</Menu.MenuItem>
                    <Menu.MenuItem>二级菜单二</Menu.MenuItem>
                    <Menu.SubMenu title="二级菜单三">
                        <Menu.MenuItem>三级菜单一</Menu.MenuItem>
                        <Menu.MenuItem>三级菜单二</Menu.MenuItem>
                    </Menu.SubMenu>
                </Menu.SubMenu>

                <Menu.MenuGroup title="MenuGroup-Two">
                    <Menu.MenuItem>二级菜单一</Menu.MenuItem>
                    <Menu.MenuItem>二级菜单二</Menu.MenuItem>
                </Menu.MenuGroup>
                
            </Menu> : null}
            <hr />
        </>
    )
}


export default function MenuDemo() {
    return (
        <>
        <Wrapper></Wrapper>
        
        <Menu defaultActive="1">
            <Menu.MenuItem icon="check-circle">菜单一</Menu.MenuItem>
            <Menu.MenuItem index="1">菜单二</Menu.MenuItem>
            <Menu.MenuItem disabled>菜单三</Menu.MenuItem>

            <Menu.MenuGroup title="MenuGroup-Two">
                <Menu.MenuItem>二级菜单一</Menu.MenuItem>
                <Menu.MenuItem>二级菜单二</Menu.MenuItem>
            </Menu.MenuGroup>

            <Menu.MenuGroup title="MenuGroup-Three">
                <Menu.MenuItem>二级菜单一</Menu.MenuItem>
                <Menu.MenuItem>二级菜单二</Menu.MenuItem>
            </Menu.MenuGroup>

            <Menu.SubMenu title="菜单四" icon="check-circle-fill">
                <Menu.MenuItem>二级菜单一</Menu.MenuItem>
                <Menu.MenuItem>二级菜单二</Menu.MenuItem>
                <Menu.SubMenu title="菜单四一">
                    <Menu.MenuItem>三级菜单一</Menu.MenuItem>
                    <Menu.MenuItem>三级菜单二</Menu.MenuItem>
                </Menu.SubMenu>
            </Menu.SubMenu>

            <Menu.SubMenu title="菜单-SubMenu">
                <Menu.SubMenu title="SubMenu-one">
                    <Menu.MenuItem>二级菜单一</Menu.MenuItem>
                    <Menu.MenuItem>二级菜单二</Menu.MenuItem>
                </Menu.SubMenu>
            </Menu.SubMenu>
            
            <Menu.SubMenu title="菜单五" disabled>
                <Menu.MenuItem>二级菜单一</Menu.MenuItem>
                <Menu.MenuItem>二级菜单二</Menu.MenuItem>
            </Menu.SubMenu>
        </Menu>
        </>
    )
}