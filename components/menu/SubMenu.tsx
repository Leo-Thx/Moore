import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';

import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';

import { SubMenuProps, MenuItemProps } from './Menu.type';
import { renderIconNode } from '../icon/icon';
import InternalMenu from './InternalMenu';
import MenuContext from './MenuContext';
import MenuItem from './MenuItem';
import { renderMenuIcon, renderMenuSubOrGroupChild, useMenuPaddingLeft } from './Menu.helper';


const SubMenu: React.FunctionComponent<SubMenuProps> = ({icon, title, className, ...props}) => {
    let clsPrefix         = getClsPrefix(ComponentPrefix.SUB_MENU),
        horizontalShow    = getClsPrefix(ComponentPrefix.MENU) + '--show',
        context           = React.useContext(MenuContext),
        [opened, setOpen] = React.useState(false),
        subMenuRef        = React.useRef<HTMLUListElement>(null),
        subMenuPropsRef   = React.useRef<{height?: number;}>({}),       // 记录弹出菜单高度
        timer             = React.useRef<{leave: number}>({leave: -1});

    let { children, disabled, index, ...restProps }   = props,
        { horizontal, renderLevel, subMenuContainer } = context,
        { openedKey, dispatchOpen, _key }          = context;

    // let [isRender, setRender] = React.useState(false);
    
    let paddingLeft = useMenuPaddingLeft(),
        iconNode    = renderMenuIcon(icon),
        arrowIcon   = horizontal && renderLevel > 1 ? renderIconNode('right'): renderIconNode('down');

    let titleClsName = getClsPrefix('title', clsPrefix),
        arrowClsName = getClsPrefix('arrow', clsPrefix),
        styleObject  = {} as React.CSSProperties,
        clsName      = classnames(classnames(clsPrefix), {
            [`${clsPrefix}-horizontal`]: horizontal,
            [`${clsPrefix}-open`]      : opened,
            [`${clsPrefix}-disabled`]  : disabled
        }, className);

    const availableChildRegexp = new RegExp([ SubMenu.displayName,  MenuItem.displayName ].join('|'), 'i');
    if( paddingLeft ) styleObject.paddingLeft = paddingLeft;

    const showOrHide = function(show: boolean) {
        let current = subMenuRef.current;

        if( show ) current?.classList.add(horizontalShow);
        else current?.classList.remove(horizontalShow);

        setOpen(!!show);
        current!.style.display = show? '': 'none';
    };

    React.useEffect(()=>{   //初始化一次不显示
        let current = subMenuRef.current;
        if( current ) current.style.display = 'none';
    }, []);

    React.useEffect(()=>{
        // let current = subMenuRef.current;
        // let hasIn = openedKey.find(i=>i===_key);
        
        // if( current && !hasIn ) {
        //     current.classList.remove(horizontalShow);
        //     current.style.display = 'none';
        //     setOpen(false);
        // }
        console.info(openedKey);
    }, [ openedKey ]);
    

    const handleEnter = React.useCallback((event: React.MouseEvent)=>{
        if( disabled || !horizontal ) return false;
        let currentTarget = event.currentTarget, current = subMenuRef.current;

        if( current ) {
            let {left, height, width, top} = currentTarget.getBoundingClientRect(),
                _style = current.style; // 需要显示的子菜单
            
            if( renderLevel === 1 ) {   // 二级首层，直接打开
                _style.top  = (top + height) + 'px';
                _style.left = left + 'px';
                showOrHide(true);
                dispatchOpen({type: 'add', payload: {key: _key, level: renderLevel}});  // 存入当前展开项
            } else {        
                _style.top     = (height / 2) + 'px';
                _style.left    = (width + 8) + 'px';
                _style.display = '';

                setOpen(true);
                dispatchOpen({type: 'add', payload: {key: _key, level: renderLevel}});
            }
        }
    }, [ horizontal, disabled, renderLevel, _key ]);

    const handelLeave = React.useCallback((event: React.MouseEvent)=>{
        if( disabled || !horizontal ) return false;
        
        let current = subMenuRef.current,
            _timer = timer.current;
        
        if( renderLevel === 1 ) {   // 一层
            setTimeout(()=>{
                let { currentLevel } = openedKey;
                if( currentLevel <= renderLevel ) {
                    dispatchOpen({type: 'remove', payload: {key: _key, level: renderLevel}});
                    showOrHide(false);
                }
            }, 1000);
            return event.stopPropagation();    //防冒泡到InternalMenu
        }

        if( current ) { // 非一层
            setTimeout(()=>{
                // let hasIn = openedKey?.find(i=>i===_key);
                // if(!hasIn) {
                //     current!.classList.remove(horizontalShow);
                //     current!.style.display = 'none';
                //     setOpen(false);
                //     console.info('SubMenu.moueseLeave1', openedKey.slice());
                // }
            }, 20);
            showOrHide(false);
            return event.stopPropagation();
        }

    }, [ _key, horizontal, disabled, renderLevel, openedKey ]);

    const handleClick = React.useCallback((event: React.MouseEvent)=> {
        if( disabled || horizontal ) return false;

        let subMenuNode = subMenuRef.current,
            subMenuProps = subMenuPropsRef.current,
            style = subMenuNode!.style;
        
        if( !opened ) { // 如果没有展开
            style.display = '';
            style.height = 'auto';

            subMenuProps.height = subMenuNode!.offsetHeight;
            style.height = '0';

            setTimeout(()=>{
                style.height = subMenuProps.height + 'px';
                setTimeout(()=>style.height='', 150);   //动画完成之后防止下属菜单高度限制
            });
            dispatchOpen({type: 'add', payload: {key: _key}});
        } else {
            style.height = subMenuProps.height + 'px';
            setTimeout(()=>{
                style.height = '0';
                setTimeout(()=>{
                    style.height = '';
                    style.display = 'none';
                }, 150);
            });
            dispatchOpen({type: 'remove', payload: {key: _key}});
        }

        setOpen(!opened);
        event.stopPropagation();

    }, [ opened, disabled, horizontal, _key ]);

    const renderVerticalChildren = () => {
        return <InternalMenu {...restProps} ref={subMenuRef}>{
            renderMenuSubOrGroupChild<MenuItemProps|SubMenuProps>(
                children as Array<React.FunctionComponentElement<MenuItemProps|SubMenuProps>>, 
                availableChildRegexp
            )
        }</InternalMenu>
    };

    return (
        <li onClick={handleClick} data-level={renderLevel} data-key={_key} data-index={index} className={clsName}>
            <div className={titleClsName} style={styleObject} 
                onMouseEnter={handleEnter} onMouseLeave={handelLeave}>
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

    // const renderChildren = () => {
    //     if( !isRender ) return null;
    //     return horizontal? // 水平模式
    //             renderLevel === 1 ?     // 只渲染第一级到Portal中
    //                 ReactDOM.createPortal(renderVerticalChildren(), subMenuContainer!)
    //                 : renderVerticalChildren()
    //             : renderVerticalChildren()
    // };

};


SubMenu.displayName = `${displayPrefix}-SubMenu`;
SubMenu.defaultProps = {};

export default SubMenu;