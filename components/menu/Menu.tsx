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


/**
 * 渲染Menu子节点
 * @param children Menu的子节点
 * @return
 */
function renderChildren(children: Array<React.FunctionComponentElement<MenuItemProps>>) {
    return React.Children.map(children, (child, index)=>{
        // if( child.type.displayName !== MenuItem.displayName ) {
        //     console.error(child.type.toString() + ' is not Menu.MenuItem ~!');
        //     return null;
        // } else 
        if( child.type.displayName === MenuItem.displayName ) {
            return child;

        } else if( child.type.displayName === SubMenu.displayName ) {
            return null;
        }
    });
}


const menuPrefix = 'menu';
const InternalMenu: React.FC<MenuProps> = props => {
    let { children } = props,
        clsName = useClassName(props),
        [activeMenu, setActive] = React.useState(props.defaultActive);
    
    let contextValue = React.useMemo(()=>{
        return {
            activeMenu: activeMenu!,
            onSelectMenuItem: (index: string) => {
                setActive(index);
            }
        }
    }, [activeMenu]);

    return (
        <MenuContext.Provider value={contextValue}>
            <ul className={clsName}>
                { children && renderChildren(children as Array<React.FunctionComponentElement<MenuItemProps>>) }
            </ul>
        </MenuContext.Provider>
    );
};
InternalMenu.displayName = `${displayPrefix}-InternalMenu`




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