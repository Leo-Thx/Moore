import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';

import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';

import { SubMenuProps, MenuItemProps } from './Menu.type';
import { renderIconNode } from '../icon/icon';
import InternalMenu, { useMenuPaddingLeft, renderMenuIcon, renderSubOrGroupChild } from './InternalMenu';
import MenuContext from './MenuContext';
import MenuItem from './MenuItem';

// let handleMouseEnter = React.useCallback((event: React.MouseEvent)=>{
//     setTimeout(()=>{
//         if(!disabled && horizontal) setOpen(true);
//     }, 150)
//     event.stopPropagation();
// }, [ disabled, horizontal ]);


// let handleMouseLeave = React.useCallback((event: React.MouseEvent)=>{
//     setTimeout(()=>{
//         if(!disabled && horizontal) setOpen(false);
//     }, 150)
//     event.stopPropagation();
// }, [ disabled, horizontal ]);


const SubMenu: React.FunctionComponent<SubMenuProps> = ({icon, title, className, ...props}) => {
    let clsPrefix         = getClsPrefix(ComponentPrefix.SUB_MENU),
        context           = React.useContext(MenuContext),
        [opened, setOpen] = React.useState(false),
        subMenuRef        = React.useRef<HTMLUListElement>(null),
        horizontalCls     = getClsPrefix('menu') + '--show';

    let { children, disabled, index, ...restProps } = props;
    let { horizontal, renderLevel, subMenuContainer } = context;
    
    let styleObj = useMenuPaddingLeft(),
        iconNode = renderMenuIcon(icon),
        arrowIcon = horizontal && renderLevel > 1 ? renderIconNode('right'): renderIconNode('down');

    let handleEnter = React.useCallback((event: React.MouseEvent)=>{
        if(!disabled && horizontal) {
            let currentTarget = event.currentTarget,
                current = subMenuRef.current;

            if( current ) {
                let style   = currentTarget.getBoundingClientRect(),
                    clientX = style.left,
                    height  = style.height,
                    width   = style.width,
                    clientY = style.top + height;

                current.style.minWidth = currentTarget.clientWidth + 'px';
                
                if( renderLevel === 1 ) {
                    current.style.top  = clientY + 'px';
                    current.style.left = clientX + 'px';

                    if( opened ) current.classList.remove(horizontalCls);
                    else current.classList.add(horizontalCls);
                    
                } else {        
                    current.style.top  = (height/2) + 'px';
                    current.style.left = (width + 4) + 'px';
                }
            }

            setOpen(true);
        }
    }, [ opened, horizontal, disabled, renderLevel ]);


    let handelLeave = React.useCallback((event: React.MouseEvent)=>{
        if(!disabled && horizontal) {
            setOpen(false)
        }
    }, [ opened, horizontal, disabled, renderLevel ]);


    let handleClick = React.useCallback((event: React.MouseEvent)=> {
        if(!disabled && !horizontal) {
            setOpen(!opened);
            event.stopPropagation();
        }
    }, [ opened, disabled, horizontal ]);

    
    let titleClsName = getClsPrefix('title', clsPrefix),
        arrowClsName = getClsPrefix('arrow', clsPrefix),
        clsName      = classnames(classnames(clsPrefix), {
            [`${clsPrefix}-horizontal`]: horizontal,
            [`${clsPrefix}-open`]      : opened,
            [`${clsPrefix}-disabled`]  : disabled
        }, className);


    const availableChildRegexp = new RegExp([
        SubMenu.displayName, 
        MenuItem.displayName
    ].join('|'), 'i');


    const renderVerticalChildren = ()=>{
        return <InternalMenu {...restProps} ref={subMenuRef}>{
            renderSubOrGroupChild<MenuItemProps|SubMenuProps>(
                children as Array<React.FunctionComponentElement<MenuItemProps|SubMenuProps>>, 
                availableChildRegexp
            )
        }</InternalMenu>
    };

    return (
        <li className={clsName} onClick={handleClick}>
            <div className={titleClsName} style={styleObj} onMouseEnter={handleEnter} onMouseLeave={handelLeave}>
                {iconNode}
                {title}
                <span className={arrowClsName}>{arrowIcon}</span>
            </div>

            { horizontal? // 水平模式
                renderLevel === 1 ?     // 只渲染第一级
                    ReactDOM.createPortal(renderVerticalChildren(), subMenuContainer!)
                    : renderVerticalChildren()
                : renderVerticalChildren()
            }
        </li>
    );
};


SubMenu.displayName = `${displayPrefix}-SubMenu`;
SubMenu.defaultProps = {};

export default SubMenu;