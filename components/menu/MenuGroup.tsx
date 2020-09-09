import * as React from 'react';
import { MenuGroupProps, MenuItemProps } from './Menu.type';
import classnames from 'classnames';
import { displayPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';
import MenuItem from './MenuItem';
import InternalMenu, { renderSubOrGroupChild } from './InternalMenu';

const menuGroupPrefix  = 'menugroup';
const MenuGroup: React.FunctionComponent<MenuGroupProps> = props => {
    let clsPrefix = getClsPrefix(menuGroupPrefix),
        clsName = classnames(clsPrefix),
        titleCls = getClsPrefix('title', clsName),
        availableChildRegexp = new RegExp(MenuItem.displayName!, 'i'),
        { title, children, ...restProps } = props;
    
    return (
        <li className={clsName}>
            <div className={titleCls}>{title}</div>
            <InternalMenu {...restProps}>{
                renderSubOrGroupChild<MenuItemProps>(
                    children as Array<React.FunctionComponentElement<MenuItemProps>>, 
                    availableChildRegexp)
            }</InternalMenu>
        </li>
    );
}

MenuGroup.displayName = `${displayPrefix}-MenuGroup`;
MenuGroup.defaultProps = {};

export default MenuGroup;