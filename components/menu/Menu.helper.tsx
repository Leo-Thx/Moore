import * as React from 'react';

import MenuContext from './MenuContext';
import { IconComAttrType } from '../icon/icon.type';
import { renderIconNode } from '../icon/icon';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuGroup from './MenuGroup';
import { MenuItemProps, SubMenuProps, MenuGroupProps } from './Menu.type';

/**
 * 计算当前层级的菜单需要填充的距离
 */
export function useMenuPaddingLeft() {
    let context = React.useContext(MenuContext),
        { renderLevel, inlineIndent, horizontal } = context;

    let paddingLeft = 0;
    if( renderLevel === 1 || horizontal ) {}
    else paddingLeft = (renderLevel - 1) * inlineIndent;

    return paddingLeft;
}



/**
 * 渲染图标
 * @param icon 
 */
export function renderMenuIcon(icon?: IconComAttrType) {
    let iconNode = null;
    if ( icon ) iconNode = renderIconNode(icon);

    return iconNode;
};




/**
 * 渲染SubMenu 或 MenuItem 子节点
 * @param children 子节点
 * @param exp 正则表达式
 */
export function renderMenuSubOrGroupChild<T>(children: Array<React.FunctionComponentElement<T>>, exp: RegExp) {
    return React.Children.map(children, Child=>{
        let ChildElement = Child as React.FunctionComponentElement<T>,
            name = ChildElement.type.displayName!;
        return exp.test(name) ? ChildElement: null;
    });
}



/**
 * 获取全部可用子节点
 */
export function getAllMenuChildRegexp() { 
    return new RegExp([ MenuItem.displayName, SubMenu.displayName, MenuGroup.displayName ].join('|'), 'i');
}