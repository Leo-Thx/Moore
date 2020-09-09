import * as React from 'react';

import { displayPrefix } from './../_config/_variables';
import { MenuProps, MenuTypeDeclaration } from './Menu.type';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuGroup from './MenuGroup';
import MenuContext, { MenuContextProps } from './MenuContext';
import InternalMenu from './InternalMenu';


// export default class Menu extends React.Component<MenuProps> {
//     static displayName = `${displayPrefix}.Menu`;
//     static MenuItem    = MenuItem;
//     static SubMenu     = SubMenu;
//     static MenuGroup   = MenuGroup;
// };

/**
 * 
 * @param props 
 * @example
 *  <Menu defaultActive="1">
        <Menu.MenuItem icon="check-circle">菜单一</Menu.MenuItem>
        <Menu.MenuItem index="1">菜单二</Menu.MenuItem>
        <Menu.MenuItem disabled>菜单三</Menu.MenuItem>

        <Menu.SubMenu title="菜单四" icon="check-circle-fill">
            <Menu.MenuItem>二级菜单一</Menu.MenuItem>
            <Menu.MenuItem>二级菜单二</Menu.MenuItem>
            <Menu.SubMenu title="菜单四一">
                <Menu.MenuItem>三级菜单一</Menu.MenuItem>
                <Menu.MenuItem>三级菜单二</Menu.MenuItem>
            </Menu.SubMenu>
        </Menu.SubMenu>
        
        <Menu.SubMenu title="菜单五" disabled>
            <Menu.MenuItem>二级菜单一</Menu.MenuItem>
            <Menu.MenuItem>二级菜单二</Menu.MenuItem>
        </Menu.SubMenu>
    </Menu>
 */
const Menu: MenuTypeDeclaration = props => {
    let { inlineIndent, defaultActive, ...restProps } = props,
        [activeMenu, setActive] = React.useState(defaultActive);

    let context = React.useContext(MenuContext);
    let contextValue: MenuContextProps = React.useMemo(()=>{
        return {
            ...context,
            activeMenu      : activeMenu!,
            inlineIndent    : inlineIndent!,
            horizontal      : props.mode === 'horizontal',
            onSelectMenuItem: (index: string) => {
                setActive(index);
            }
        }
    }, [activeMenu, inlineIndent]);

    return (
        <MenuContext.Provider value={contextValue}>
            <InternalMenu {...restProps} />
        </MenuContext.Provider>
    )
};


Menu.defaultProps = {
    mode: 'vertical',
    defaultActive: '',
    inlineIndent: 24
};

Menu.displayName = `${displayPrefix}-Menu`;

Menu.MenuItem  = MenuItem;
Menu.SubMenu   = SubMenu;
Menu.MenuGroup = MenuGroup;


export { MenuProps };
export default Menu