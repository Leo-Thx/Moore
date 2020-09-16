import * as React from 'react';
import classnames from 'classnames';

import { getClsPrefix } from './../_utils/_style.util';
import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import { MenuProps, MenuItemProps, SubMenuProps, MenuGroupProps, InternalMenuProps } from './Menu.type';

import MenuContext from './MenuContext';
import { getAllMenuChildRegexp } from './Menu.helper';


const InternalMenu: React.FC<InternalMenuProps> = React.forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
    let { children, mode, className, onClick, onSelect, ...restProps } = props,
        clsPrefix = getClsPrefix(ComponentPrefix.MENU),
        childRegexp = getAllMenuChildRegexp(),
        clsName   = classnames(clsPrefix, {
            [`${clsPrefix}-horizontal`]: mode === 'horizontal'
        }, className);

    let context     = React.useContext(MenuContext),
        openedKey   = context.openedKey,
        dispatchKey = context.dispatchOpen,
        renderKey   = context._key,          // 当前层级唯一
        renderIndex = context.renderIndex,   // 当前层级索引
        renderLevel = context.renderLevel;   // 当前渲染等级

    const handleEnter: React.MouseEventHandler = React.useCallback(event=>{
        if( renderLevel ) { // 非首级
            console.info('InternalMenu.mouseEnter--3', renderKey, renderLevel);
            dispatchKey({type: 'add', payload: {key: renderKey, level: renderLevel + 1}});
        }
    }, [ renderKey, renderLevel ]);

    const handleLeave: React.MouseEventHandler = React.useCallback(event=>{
        if( !renderLevel ) {    // 菜单首层-直接清空
            dispatchKey({type: 'clear', payload: {key: '', level: 0}});
            console.info('InternalMenu.moueseLeave-clear', openedKey.slice());
            return ;
        } else {
            dispatchKey({type: 'remove', payload: renderKey});
            console.info('InternalMenu.moueseLeave2', openedKey.slice());
        }

    }, [renderLevel, openedKey]);

    return (
        <ul data-level={renderLevel} data-key={renderKey} data-index={renderIndex} 
            className={clsName} {...restProps} ref={ref} 
            onMouseEnter={handleEnter} >
            {
                React.Children.map(children as Array<React.FunctionComponentElement<MenuItemProps|SubMenuProps|MenuGroupProps>>, (Child, cIndex) => {
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
        </ul>
    );
});


InternalMenu.displayName = `${displayPrefix}-InternalMenu`;
export default InternalMenu;
