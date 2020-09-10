import * as React from 'react';
import classnames from 'classnames';

import { getClsPrefix } from './../_utils/_style.util';
import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import { MenuProps, MenuItemProps } from './Menu.type';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuContext from './MenuContext';
import { IconComAttrType } from '../icon/icon.type';
import { renderIconNode } from '../icon/icon';
import MenuGroup from './MenuGroup';


const InternalMenu: React.FC<MenuProps> = React.forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
    let { children, mode, className, ...restProps } = props,
        clsPrefix = getClsPrefix(ComponentPrefix.MENU),
        clsName   = classnames(clsPrefix, {
            [`${clsPrefix}-horizontal`]: mode === 'horizontal'
        }, className);

    let context     = React.useContext(MenuContext),
        renderIndex = context.renderIndex,
        renderLevel = context.renderLevel;

    const availableChildRegexp = new RegExp([
        MenuItem.displayName, 
        SubMenu.displayName,
        MenuGroup.displayName
    ].join('|'), 'i');


    const renderChildren = function() {
        let childArray = children as Array<React.FunctionComponentElement<MenuItemProps>>;

        return React.Children.map(childArray, (Child, cIndex) => {
            let { index } = Child.props,
                childName = Child.type.displayName!;
    
            if( availableChildRegexp.test(childName) ) {
                return <MenuContext.Provider value={{
                    ...context,
                    renderLevel: renderLevel + 1, // 对以下所有的渲染层级
                    renderIndex: `${renderIndex}/${cIndex+1}`  // 当前渲染的索引，供子级节点使用
                }}>{
                    React.cloneElement(Child, {
                        ...Child.props,
                        index: index ? index: `${renderIndex}/${cIndex+1}`
                    })
                }</MenuContext.Provider>
            }

            return null;
        })
    };
    
    return (
        <ul className={clsName} {...restProps} ref={ref}>
            {renderChildren()}
        </ul>
    );
});

InternalMenu.displayName = `${displayPrefix}-InternalMenu`;

export default InternalMenu;

/**
 * 计算当前层级的菜单需要填充的距离
 */
export function useMenuPaddingLeft() {
    let context = React.useContext(MenuContext),
        { renderLevel, inlineIndent, horizontal } = context;

    let style = {} as React.CSSProperties;
    if( renderLevel === 1 || horizontal ) {}
    else style.paddingLeft = (renderLevel - 1) * inlineIndent;

    return style;
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
export function renderSubOrGroupChild<T>(children: Array<React.FunctionComponentElement<T>>, exp: RegExp) {
    return React.Children.map(children, Child=>{
        let ChildElement = Child as React.FunctionComponentElement<T>,
            name = ChildElement.type.displayName!;
        return exp.test(name) ? ChildElement: null;
    });
}