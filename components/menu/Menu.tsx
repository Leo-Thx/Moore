import * as React from 'react';
import classnames from 'classnames';

import { getClsPrefix } from './../_utils/_style.util';
import { displayPrefix } from './../_config/_variables';
import { MenuProps, MenuItemProps, MenuTypeDeclaration } from './Menu.type';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuGroup from './MenuGroup';
import MenuContext from './MenuContext';


/**
 * 计算渲染的样式
 * @param props 
 * @return string
 */
function useClassName(props: MenuProps) {
    const { mode, className } = props;

    let clsPrefix = getClsPrefix(menuPrefix),
        clsName   = classnames(clsPrefix, {
        [`${clsPrefix}-vertical`]: mode === 'vertical'
    }, className);

    return clsName;
}


const menuPrefix = 'menu';
const InternalMenu: React.FC<MenuProps> = props => {
    let { children, inlineIndent } = props,
        clsName = useClassName(props),
        [activeMenu, setActive] = React.useState(props.defaultActive);

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
            <ul className={clsName}>
                {
                    React.Children.map(children as Array<React.FunctionComponentElement<MenuItemProps>>, Child => {
                        if( Child.type.displayName === MenuItem.displayName ) return Child; 
                        else if( Child.type.displayName === SubMenu.displayName ) return Child; 
                        return null;
                    })
                }
            </ul>
        </MenuContext.Provider>
    );
};

InternalMenu.displayName = `${displayPrefix}-InternalMenu`;




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
    return (
        <MenuContext.Consumer>
            { context => {
                return <InternalMenu {...props} />;
            } }
        </MenuContext.Consumer>
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