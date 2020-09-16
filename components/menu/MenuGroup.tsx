import * as React from 'react';
import { MenuGroupProps, MenuItemProps } from './Menu.type';
import classnames from 'classnames';
import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';
import MenuItem from './MenuItem';
import InternalMenu from './InternalMenu';
import MenuContext from './MenuContext';
import { renderMenuSubOrGroupChild } from './Menu.helper';


const MenuGroup: React.FunctionComponent<MenuGroupProps> = ({title, children, index, ...restProps}) => {
    let clsPrefix = getClsPrefix(ComponentPrefix.MENU_GROUP),
        clsName   = classnames(clsPrefix),
        titleCls  = getClsPrefix('title', clsName),
        context   = React.useContext(MenuContext);
        
    let availableChildRegexp = new RegExp(MenuItem.displayName!, 'i'),
        { horizontal, renderLevel, _key, renderIndex } = context;

    if( horizontal && renderLevel === 1 ) return null;

    return (
        <li data-level={renderLevel} data-key={_key} data-index={renderIndex} className={clsName}>
            <div className={titleCls}>{title}</div>
            <InternalMenu {...restProps}>{
                renderMenuSubOrGroupChild<MenuItemProps>(
                    children as Array<React.FunctionComponentElement<MenuItemProps>>, 
                    availableChildRegexp
                )
            }</InternalMenu>
        </li>
    );
}

MenuGroup.displayName = `${displayPrefix}-MenuGroup`;
MenuGroup.defaultProps = {};

export default MenuGroup;