import * as React from 'react';
import classnames from 'classnames';

import { displayPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';

import { SubMenuProps, MenuItemProps } from './Menu.type';
import { renderIconNode } from '../icon/icon';
import InternalMenu, { useMenuPaddingLeft, renderMenuIcon, renderSubOrGroupChild } from './InternalMenu';
import MenuContext from './MenuContext';
import MenuItem from './MenuItem';


const subMenuPrefix  = 'submenu';
const SubMenu: React.FunctionComponent<SubMenuProps> = props => {
    let clsPrefix         = getClsPrefix(subMenuPrefix),
        clsName           = classnames(clsPrefix),
        arrowIcon         = renderIconNode('down'),
        titleClsName      = getClsPrefix('title', clsPrefix),
        arrowClsName      = getClsPrefix('arrow', clsPrefix),
        [opened, setOpen] = React.useState(false),
        { horizontal}     = React.useContext(MenuContext);

    let { className, children, title, disabled, icon, ...restProps } = props;
    
    let styleObj = useMenuPaddingLeft(),
        iconNode = renderMenuIcon(icon!);

    let handleClick = React.useCallback((event: React.MouseEvent)=> {
        if(!disabled && !horizontal) setOpen(!opened);
        event.stopPropagation();
    }, [ opened, disabled, horizontal ]);

    let handleMouseEnter = React.useCallback((event: React.MouseEvent)=>{
        // if(!disabled && horizontal) setOpen(true);
    }, [ disabled, horizontal ]);

    let handleMouseLeave = React.useCallback((event: React.MouseEvent)=>{
        // if(!disabled && horizontal) setOpen(false);
    }, [ disabled, horizontal ]);

    
    clsName = classnames(clsName, {
        [`${clsName}-disabled`]: disabled,
        [`${clsName}-open`]    : opened
    }, className);


    let availableChildRegexp = new RegExp([
        SubMenu.displayName, 
        MenuItem.displayName
    ].join('|'), 'i');

    return (
        <li className={clsName} 
            onClick={handleClick}
        >
            <div className={titleClsName} style={styleObj} >
                {iconNode}
                {title}
                <span className={arrowClsName}>{arrowIcon}</span>
            </div>

            <InternalMenu {...restProps}>{
                renderSubOrGroupChild<MenuItemProps|SubMenuProps>(
                    children as Array<React.FunctionComponentElement<MenuItemProps|SubMenuProps>>, 
                    availableChildRegexp)
            }</InternalMenu>
        </li>
    );
};


SubMenu.displayName = `${displayPrefix}-SubMenu`;
SubMenu.defaultProps = {};

export default SubMenu;