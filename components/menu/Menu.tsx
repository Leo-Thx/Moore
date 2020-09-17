import * as React from 'react';
import classnames from 'classnames';

import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import { MenuProps, MenuTypeDeclaration, MenuItemProps, SubMenuProps, MenuGroupProps } from './Menu.type';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuGroup from './MenuGroup';
import MenuContext, { DispatchMenuOpen } from './MenuContext';
import { getClsPrefix } from './../_utils/_style.util';
import { getAllMenuChildRegexp, renderMenuChild } from './Menu.helper';


// export default class Menu extends React.Component<MenuProps> {
//     static displayName = `${displayPrefix}.Menu`;
//     static MenuItem    = MenuItem;
//     static SubMenu     = SubMenu;
//     static MenuGroup   = MenuGroup;
// };

const openKeyReducer = (state: Array<string>, action: DispatchMenuOpen) => {
    let index = state.findIndex(s=>s===action.payload);
    switch(action.type) {
        case 'add':
            if( !~index ) state.push(action.payload);
            break;

        case 'remove':
            if( !!~index ) state.splice(index, 1);
            break;
        
        case 'clear': 
            state.splice(0);
            break;
    }
    return state;
};
const openLevelReducer = (state: number = 0, action: number) => state = action;


function useHorizontalContainer(horizontal: boolean) {
    let wrapper = React.useMemo(()=> horizontal ? document.createElement('div'): null, [ horizontal ]);
    React.useEffect(()=>{
        if( horizontal ) {
            wrapper?.classList.add(classnames({
                [`${ComponentPrefix.MENU}-horizontal-container`]: horizontal
            }));
            document.body.append(wrapper!);
        }
        return () => {
            horizontal && wrapper!.remove();
        }
    }, [wrapper, horizontal]);
    return wrapper;
}

const Menu: MenuTypeDeclaration = ({inlineIndent, defaultActive, onSelect, onClick, ...props}) => {
    let { children, mode, className, ...restProps } = props,
        horizontal = mode === 'horizontal',
        clsPrefix  = getClsPrefix(ComponentPrefix.MENU),
        clsName    = classnames(clsPrefix, {
            [`${clsPrefix}-horizontal`]: horizontal
        }, className),

        [activeMenu, setActive]  = React.useState(defaultActive),
        wrapper                  = useHorizontalContainer(horizontal),
        [openedKey, dispatchKey] = React.useReducer(openKeyReducer, []);
    
    const ctxConstValue = React.useMemo(()=>({
        inlineIndent: inlineIndent!,

        renderLevel: 0,
        renderIndex: `@@_${ComponentPrefix.MENU}/1`, //重置首层渲染的index索引值
        _key       : `@@_${ComponentPrefix.MENU}-key/1`,

        horizontal,
        subMenuContainer: wrapper,
    }), [wrapper, inlineIndent, horizontal]);


    const contextValue = React.useMemo(()=>({
        ...ctxConstValue,
        activeMenu,
        openedKey,
        dispatchOpenKey: dispatchKey,
        onSelectMenuItem: (level: number, index: string, event: React.MouseEvent) => {
            if( typeof onClick === 'function' ) onClick(level, index, event);
            if( typeof onSelect === 'function' ) onSelect(level, index, event);
            setActive(index);
        }
    }), [activeMenu, ctxConstValue, openedKey, onClick, onSelect]);


    const renderKey   = contextValue._key,          // 当前层级唯一
          renderIndex = contextValue.renderIndex,   // 当前层级索引
          renderLevel = contextValue.renderLevel,   // 当前渲染等级
          childRegexp = getAllMenuChildRegexp();
    
    return (
        <MenuContext.Provider value={contextValue}>
            <ul data-level={renderLevel} data-key={renderKey} data-index={renderIndex} className={clsName} {...restProps}>
                {
                    React.Children.map(children as Array<React.FunctionComponentElement<MenuItemProps|SubMenuProps|MenuGroupProps>>, (Child, cIndex) => {
                        const { index } = Child.props, childName = Child.type.displayName!;
                        if( !childRegexp.test(childName) ) return null;
                        
                        return <MenuContext.Provider value={{
                            ...contextValue,
                            _key: `${renderKey}/${cIndex+1}`,           // 节点标识
                            renderLevel: renderLevel + 1,               // 下级所有的渲染层级
                            renderIndex: `${renderIndex}/${cIndex+1}`   // 当前渲染的索引，供子级节点使用
                        }}>{
                            React.cloneElement(Child, {
                                ...Child.props,
                                index: index ? index: `${renderIndex}/${cIndex+1}`
                            })
                        }</MenuContext.Provider>
                    })
                }
            </ul>
        </MenuContext.Provider>
    )
};


Menu.defaultProps = {
    mode: 'vertical',
    defaultActive: '',
    inlineIndent: 24
};

Menu.displayName = `${displayPrefix}-Menu`;

Menu.MenuItem  = MenuItem;
Menu.SubMenu   = SubMenu;
Menu.MenuGroup = MenuGroup;


export { MenuProps };
export default Menu;