import * as React from 'react';
import classnames from 'classnames';
import { getClsPrefix } from './../_utils/_style.util';
import { clsPrefix } from './../_config/_variables';
import { MenuProps } from './Menu.type';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuGroup from './MenuGroup';


const menuPrefix = 'menu';
class InternalMenu extends React.Component<MenuProps> {
    static defaultProps: MenuProps = {
        mode: 'horizontal'
    };
    
    render() {
        const { className, mode } = this.props;
        let clsPrefix = getClsPrefix(menuPrefix),
            clsName   = classnames(clsPrefix, {
            [`${clsPrefix}-vertical`]: mode === 'vertical'
        });
    
        clsName = classnames(clsName, className);
    
        return (
            <ul className={clsName}>
                
            </ul>
        );
    }
}

export default class Menu extends React.Component<MenuProps> {
    static displayName = `${clsPrefix}.Menu`;
    static MenuItem    = MenuItem;
    static SubMenu     = SubMenu;
    static MenuGroup   = MenuGroup;

    render() {
        return (
            <InternalMenu {...this.props}></InternalMenu>
        )
    }
};

export { MenuProps };
