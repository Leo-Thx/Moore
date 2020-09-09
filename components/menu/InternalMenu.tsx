import * as React from 'react';
import classnames from 'classnames';

import { getClsPrefix } from './../_utils/_style.util';
import { displayPrefix } from './../_config/_variables';
import { MenuProps, MenuItemProps } from './Menu.type';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuContext from './MenuContext';
import { IconComAttrType } from '../icon/icon.type';
import { renderIconNode } from '../icon/icon';


const menuPrefix = 'menu';
const InternalMenu: React.FC<MenuProps> = props => {
    let { children, mode, className } = props,
        clsPrefix = getClsPrefix(menuPrefix),
        clsName   = classnames(clsPrefix, {
            [`${clsPrefix}-horizontal`]: mode === 'horizontal'
        }, className);

    let context      = React.useContext(MenuContext),
        renderLevel  = context.renderLevel,
        contextValue = {
            ...context,
            renderLevel: renderLevel + 1
        };

    return (
        <ul className={clsName}>
            {
                React.Children.map(children as Array<React.FunctionComponentElement<MenuItemProps>>, (Child, cIndex) => {
                    let nameReg = new RegExp([MenuItem.displayName, SubMenu.displayName].join('|'), 'ig');
            
                    if( nameReg.test( Child.type.displayName! ) ) {
                        let { index } = Child.props;
                        return <MenuContext.Provider value={contextValue}>
                            {
                                React.cloneElement(Child, {
                                    ...Child.props,
                                    index: index ? index: `@@_${menuPrefix}/${contextValue.renderLevel}/${cIndex}`
                                })
                            }
                        </MenuContext.Provider>
                    }
                    return null;
                })
            }
        </ul>
    );
};

InternalMenu.displayName = `${displayPrefix}-InternalMenu`;

export default InternalMenu;


/**
 * 计算当前层级的菜单需要填充的距离
 */
export function useMenuPaddingLeft() {
    let context = React.useContext(MenuContext),
        { renderLevel, inlineIndent } = context;

    let style = {} as React.CSSProperties;
    if( renderLevel === 1 ) {}
    else style.paddingLeft = (renderLevel - 1) * inlineIndent;

    return style;
}


/**
 * 渲染图标
 * @param icon 
 */
export function renderMenuIcon(icon: IconComAttrType) {
    let iconNode = null;
    if ( icon ) iconNode = renderIconNode(icon);

    return iconNode;
};