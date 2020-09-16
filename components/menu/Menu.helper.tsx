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
 * 渲染菜单下子节点，并提供对应的context
 * @param children 菜单下的子节点
 * @param childRegexp 需要排除的子节点
 */
export function renderMenuChild(children: Array<React.FunctionComponentElement<MenuItemProps|SubMenuProps|MenuGroupProps>>, childRegexp: RegExp) {
    let context     = React.useContext(MenuContext),
        renderKey   = context._key,          // 当前层级唯一
        renderIndex = context.renderIndex,   // 当前层级索引
        renderLevel = context.renderLevel;   // 当前渲染等级

    return React.Children.map(children, (Child, cIndex) => {
        const { index } = Child.props, childName = Child.type.displayName!;
        if( !childRegexp.test(childName) ) return null;
            
        return <MenuContext.Provider value={{
            ...context,
            _key: `${renderKey}/${cIndex+1}`,
            renderLevel: renderLevel + 1,
            renderIndex: `${renderIndex}/${cIndex+1}`
        }}>{
            React.cloneElement(Child, {
                ...Child.props,
                index: index ? index: `${renderIndex}/${cIndex+1}`
            })
        }</MenuContext.Provider>
    })
}


/**
 * 获取全部可用子节点
 */
export function getAllMenuChildRegexp() { 
    return new RegExp([ MenuItem.displayName, SubMenu.displayName, MenuGroup.displayName ].join('|'), 'i');
}