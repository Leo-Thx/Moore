import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './../Menu';
import './../../index.scss';

let array = [
    {name: '菜单一', id: 1, icon: 'check-circle'},
    {name: '菜单二', id: 2},
    {name: '菜单三', id: 3},
    {name: '菜单四', id: 4, icon: 'check-circle', children: [
        {name: '菜单一', id: 6},
        {name: '菜单二', id: 7},
        {name: '菜单三', id: 8, children: [
            {name: '菜单一', id: 9},
            {name: '菜单二', id: 10},
            {name: '菜单三', id: 11}
        ]},
    ]},
    {name: '菜单五', id: 12},
];

function render(item, index) {
    return (
        <Menu.MenuItem index={String(item.id)} icon={item.icon} key={index}>{item.name}</Menu.MenuItem>
    )
}

function renderChild(item, index) {
    let children = item.children;
    return (
        <Menu.SubMenu title={item.name} key={index} icon={item.icon}>
            {
                children.map((child, cIndex)=>{
                    let childArray = child.children;
                    if( !childArray ) return render(child, cIndex);
                    else return renderChild(child, cIndex);
                })
            }
        </Menu.SubMenu>
    );
}



const Wrapper = () => {
    let [show, setShow] = React.useState(true);
    const handleClick = React.useCallback(()=>{
        setShow(!show);
    }, [show]);

    return (
        <>
            <button onClick={handleClick}>click-{show}</button>
            {show ? <Menu defaultActive="1" mode="horizontal" className="my-menu">
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
                
            </Menu> : null}
            <hr />
        </>
    )
}

ReactDOM.render(
    <div>
        <div style={{width: 500}}>
            <Wrapper></Wrapper>
            {/* <Menu defaultActive="1">
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
            </Menu> */}
        </div>

        {/* <Menu mode="horizontal" defaultActive="1">
            {
                array.map((item, index)=>{
                    let children = item.children;
                    if( !children ) return render(item, index);
                    else return renderChild(item, index);
                })
            }
        </Menu> */}
    </div>, 
    document.getElementById('app')
);


