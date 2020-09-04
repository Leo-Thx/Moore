import * as React from 'react';
import classnames from 'classnames';

import { getClsPrefix } from './../_utils/_style.util';
import { displayPrefix } from './../_config/_variables';
import { MenuProps, MenuItemProps } from './Menu.type';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuGroup from './MenuGroup';
import MenuContext from './MenuContext';


const menuPrefix = 'menu';

/**
 * 
 */
class InternalMenu extends React.Component<MenuProps> {

    static defaultProps: MenuProps = {
        mode: 'horizontal'
    };

    static contextType = MenuContext;

    /**
     * 渲染Menu子节点
     * @param children Menu的子节点
     */
    renderItemChildren(children: React.ComponentElement<MenuItemProps, MenuItem>) {
        return React.Children.map(children, (child, index)=>{
            if( child.type.displayName !== MenuItem.displayName ) {
                console.error(child.type.toString() + ' is not Menu.MenuItem~!');
                return null;
            }
            return React.cloneElement(child, {
                index: child.key ? child.key: index
            });
        });
    }

    /**
     * 计算渲染的样式
     * @param props 
     * @return string
     */
    _calcRenderClassName(props: MenuProps) {
        const { mode } = props;
        let clsPrefix = getClsPrefix(menuPrefix),
            clsName   = classnames(clsPrefix, {
            [`${clsPrefix}-vertical`]: mode === 'vertical'
        });

        return clsName;
    }
    

    render() {
        const { children } = this.props;
        let clsName = this._calcRenderClassName(this.props);
    
        return (
            <ul className={clsName}>
                { children && this.renderItemChildren(children as React.ComponentElement<MenuItemProps, MenuItem>) }
            </ul>
        );
    }
}



/**
 * @example
 */
export default class Menu extends React.Component<MenuProps> {

    static displayName = `${displayPrefix}.Menu`;
    
    static MenuItem    = MenuItem;
    static SubMenu     = SubMenu;
    static MenuGroup   = MenuGroup;
    
    render() {
        return (
            <MenuContext.Consumer>
                { context => <InternalMenu {...this.props} /> }
            </MenuContext.Consumer>
        )
    }
};

export { MenuProps };
