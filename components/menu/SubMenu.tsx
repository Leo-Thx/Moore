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
        subMenuRef        = React.useRef<HTMLUListElement>(null),   // InternalMenu节点
        subMenuPropsRef   = React.useRef<{height?: number;}>({}),   // 存放展开时所需要的高度
        timerRef          = React.useRef(-1);

    let { children, disabled, index, ...restProps }   = props,
        { horizontal, renderLevel, subMenuContainer } = context,
        { openedKey, dispatchOpenKey, _key }          = context;
    
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
    if( paddingLeft ) styleObject.paddingLeft = paddingLeft;    // 缩进

    const showOrHide = function(show: boolean) {    // 只处理第一级
        let current = subMenuRef.current!;

        if( show ) current.classList.add(horizontalShow);
        else current.classList.remove(horizontalShow);

        setOpen(!!show);
        current.style.display = show? '': 'none';
    };

    React.useEffect(()=>{   //初始化一次不显示,挂载后直接执行
        let current = subMenuRef.current;
        if( current ) current.style.display = 'none';
    }, []);

    // React.useEffect(()=> {
    //     let length = openedKey.length;
    //     if( length === 0 ) {
    //         setOpen(false);
    //         showOrHide(false);
    //     }
    // }, [openedKey.length, setOpen, showOrHide]);

    const showSubMenu = React.useCallback((subKey: string, subLevel: number) => {
        clearTimeout(timerRef.current);
        timerRef.current = 0;

        if( subLevel === 1 ) showOrHide(true);
        else setOpen(true);
        
        dispatchOpenKey({type: 'add', payload: _key});
    }, [_key]);

    const hideSubMenu = React.useCallback((subKey?: string, subLevel?: number)=>{
        if( subLevel === 1 ) showOrHide(false);
        else setOpen(false);
        dispatchOpenKey({type: 'remove', payload: _key});
    }, [_key]);

    const handleEnter = React.useCallback((event: React.MouseEvent)=>{  // 鼠标进入事件，只由标题触发
        if( disabled || !horizontal ) return false;
        let currentTarget = event.currentTarget, current = subMenuRef.current;
        if( current ) {
            let {left, height, width, top} = currentTarget.getBoundingClientRect(),
                _style = current.style; // 需要显示的子菜单
            
            if( renderLevel === 1 ) {   // 二级首层，直接打开
                _style.top  = (top + height) + 'px';
                _style.left = left + 'px';
                showOrHide(true);
                dispatchOpenKey({type: 'add', payload: _key});

            } else {        // 其他菜单，则直接基因父级菜单显示即可
                _style.top     = '0px';
                _style.left    = width + 'px';
                _style.display = '';

                setOpen(true);
                dispatchOpenKey({type: 'add', payload: _key});
            }
        }
        event.stopPropagation();
    }, [ horizontal, disabled, renderLevel, _key ]);

    const handelLeave = React.useCallback((event: React.MouseEvent)=>{  // 标题触发的鼠标离开事件
        if( disabled || !horizontal ) return false;
        if( timerRef.current ) {
            clearTimeout(timerRef.current);
            timerRef.current = 0;
        }
        
        if( renderLevel === 1 ) {   // 一层
            let timer = setTimeout(()=>{    // 延迟50ms后关闭
                dispatchOpenKey({type: 'remove', payload: _key});
                showOrHide(false);
            }, 50);
            timerRef.current = timer as unknown as number;
            return event.stopPropagation();    //防冒泡到InternalMenu
        }

        if( subMenuRef.current ) { // 非一层
            let timer = setTimeout(()=>{
                setOpen(false);
                dispatchOpenKey({type: 'remove', payload: _key});
            }, 50);
            timerRef.current = timer as unknown as number;
        }

    }, [ _key, horizontal, disabled, renderLevel ]);

    const handleClick = React.useCallback((event: React.MouseEvent)=> {
        if( disabled || horizontal ) return false;  // 不处理平行菜单

        let subMenuNode  = subMenuRef.current!,       // 外部容器
            subMenuProps = subMenuPropsRef.current,   // 二级菜单属性引用
            style        = subMenuNode.style;   // 菜单样式
        
        if( !opened ) { // 如果没有展开
            style.display = '';
            style.height = 'auto';
            subMenuProps.height = subMenuNode.offsetHeight;    //获取当前菜单最终需要展开的高度
            style.height = '0'; // 重置为0
            setTimeout(()=>{    // 触发渲染
                style.height = subMenuProps.height + 'px';
                setTimeout(()=>style.height='', 200);   //动画完成之后防止下属菜单高度限制
            });
            dispatchOpenKey({type: 'add', payload: _key});
        } else {
            style.height = subMenuProps.height + 'px';
            setTimeout(()=>{
                style.height = '0';
                setTimeout(()=>{
                    style.height = '';
                    style.display = 'none';
                }, 200);
            });
            dispatchOpenKey({type: 'remove', payload: _key});
        }

        setOpen(!opened);
        event.stopPropagation();    // 防止派发到上级菜单, 触发收起

    }, [ opened, disabled, horizontal, _key ]);
    
    const renderVerticalChildren = () => {
        return <InternalMenu {...restProps} ref={subMenuRef} onShowSubMenu={showSubMenu} onHideSubMenu={hideSubMenu}>{
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