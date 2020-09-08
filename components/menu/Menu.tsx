import * as React from 'react';

import { displayPrefix } from './../_config/_variables';
import { MenuProps, MenuTypeDeclaration } from './Menu.type';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuGroup from './MenuGroup';
import MenuContext from './MenuContext';
import InternalMenu from './InternalMenu';


// export default class Menu extends React.Component<MenuProps> {
//     static displayName = `${displayPrefix}.Menu`;
//     static MenuItem    = MenuItem;
//     static SubMenu     = SubMenu;
//     static MenuGroup   = MenuGroup;
    
//     render() {
//         return (
//             <MenuContext.Consumer>
//                 { context => <InternalMenu {...this.props} /> }
//             </MenuContext.Consumer>
//         )
//     }
// };

/**
 * 
 * @param props 
 * @example
 *  <Menu defaultActive="10">
        <Menu.MenuItem index="10">10</Menu.MenuItem>
        <Menu.MenuItem index="20">20</Menu.MenuItem>
        <Menu.MenuItem index="30" disabled>30</Menu.MenuItem>
        <Menu.SubMenu index="200" title="这是菜单">
            <Menu.MenuItem index="40">40</Menu.MenuItem>
            <Menu.MenuItem index="50">50</Menu.MenuItem>
            <Menu.SubMenu index="300" title="这是菜单">
                <Menu.MenuItem index="60">60</Menu.MenuItem>
                <Menu.MenuItem index="70">70</Menu.MenuItem>
            </Menu.SubMenu>
        </Menu.SubMenu>
    </Menu>
 */
const Menu: MenuTypeDeclaration = props => {
    let { inlineIndent, defaultActive, ...restProps } = props,
        [activeMenu, setActive] = React.useState(defaultActive);

    let context = React.useContext(MenuContext);
    let contextValue = React.useMemo(()=>{
        return {
            ...context,
            activeMenu: activeMenu!,
            inlineIndent: inlineIndent!,
            onSelectMenuItem: (index: string) => setActive(index)
        }
    }, [activeMenu, inlineIndent]);

    return (
        <MenuContext.Provider value={contextValue}>
            <InternalMenu {...restProps} />
        </MenuContext.Provider>
    )
};


Menu.defaultProps = {
    mode: 'horizontal',
    defaultActive: '',
    inlineIndent: 24
};

Menu.displayName = `${displayPrefix}-Menu`;

Menu.MenuItem  = MenuItem;
Menu.SubMenu   = SubMenu;
Menu.MenuGroup = MenuGroup;


export { MenuProps };
export default Menu