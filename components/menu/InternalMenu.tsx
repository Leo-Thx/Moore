import * as React from 'react';
import classnames from 'classnames';

import { getClsPrefix } from './../_utils/_style.util';
import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import { MenuItemProps, SubMenuProps, MenuGroupProps, InternalMenuProps } from './Menu.type';

import MenuContext from './MenuContext';
import { getAllMenuChildRegexp } from './Menu.helper';


const InternalMenu: React.FC<InternalMenuProps> = React.forwardRef<HTMLUListElement, InternalMenuProps>((props, ref) => {
    let { children, mode, className, onShowSubMenu, onHideSubMenu, ...restProps } = props,
        clsPrefix = getClsPrefix(ComponentPrefix.MENU),
        childRegexp = getAllMenuChildRegexp(),
        clsName   = classnames(clsPrefix, {
            [`${clsPrefix}-horizontal`]: mode === 'horizontal'
        }, className);

    let context     = React.useContext(MenuContext),
        horizontal  = context.horizontal,
        openedKey   = context.openedKey,
        dispatchKey = context.dispatchOpenKey,
        renderKey   = context._key,          // 当前层级唯一
        renderIndex = context.renderIndex,   // 当前层级索引
        renderLevel = context.renderLevel;   // 当前渲染等级

    const handleEnter: React.MouseEventHandler = React.useCallback(event=>{
        if( !horizontal ) return ;

        dispatchKey({type: 'add', payload: renderKey});
        console.info('InternalMenu.mouseEnter--3', renderKey, renderLevel, openedKey.slice());
        
        if( typeof onShowSubMenu === 'function' ) { // 当子菜单进入时，告诉父级菜单继续显示
            onShowSubMenu(renderKey, renderLevel);
        }

        event.stopPropagation();
    }, [ renderKey, renderLevel, horizontal ]);

    const handleLeave: React.MouseEventHandler = React.useCallback(event=>{
        if( !horizontal ) return ;

        dispatchKey({type: 'remove', payload: renderKey});
        console.info('InternalMenu.moueseLeave2', renderKey, renderLevel, openedKey.slice());

        if( typeof onHideSubMenu === 'function' ) { // 子菜单离开时，取消显示父级菜单
            onHideSubMenu(renderKey, renderLevel);
        }

        event.stopPropagation();
    }, [renderKey, renderLevel, horizontal]);

    type ChildType = Array<React.FunctionComponentElement<MenuItemProps|SubMenuProps|MenuGroupProps>>;
    return (
        <ul data-level={renderLevel} data-key={renderKey} data-index={renderIndex} 
            className={clsName} {...restProps} ref={ref} 
            onMouseEnter={handleEnter} onMouseLeave={handleLeave}>{

            React.Children.map(children as ChildType, (Child, cIndex) => {
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
        }</ul>
    );
});


InternalMenu.displayName = `${displayPrefix}-InternalMenu`;
export default InternalMenu;
