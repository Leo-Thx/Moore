import * as React from 'react';
import classnames from 'classnames';
import { ButtonProps } from './button.type';
import { getClsPrefix } from '../_utils/_style.util';
import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import Icon, { renderIconNode } from '../icon/icon';
import { IconProps } from '../icon/icon.type';
import Ripple from '../ripple/Ripple';


const iconOnlyPrefix = 'icon-only';
const Button: React.FC<ButtonProps> = ({disabled, ghost, size, danger, type, href, block, icon, ...props}) => {
    const { className, children, htmlType,  onClick, ...restProps  } = props;

    let clsPrefix = getClsPrefix(ComponentPrefix.BUTTON),
        clsName   = classnames(clsPrefix, {
            [`${clsPrefix}-${type}`]       : !!type && type !== 'default',                     // default不用任何样式
            [`${clsPrefix}-${size}`]       : !!size,
            [`${clsPrefix}-${type}-danger`]: (type === 'link' || type === 'text') && danger,
            [`${clsPrefix}-ghost`]         : ghost,
            [`${clsPrefix}-block`]         : block
    });
    let child: React.ReactNode = null, 
        handleClick = React.useCallback((event: React.MouseEvent)=>{
            if( type === 'link' && href ) return window.open( href );
            else if( typeof onClick === 'function' )  onClick!(event);
        }, [ type, onClick ]);


    if( icon ) {    // icon属性
        const iconAttrNode = renderIconNode(icon);  // 处理icon作为属性或者是节点时，需要渲染按钮
        if( !children ) {    // 没有子节点，单一的图标按钮
            child = iconAttrNode;
            clsName = classnames(clsName, getClsPrefix(iconOnlyPrefix, clsPrefix));
        } else {    // 如果有子组件，则为图标+子节点
            child = <>{iconAttrNode}<span>{children}</span></>;
        }

    } else { // 如果没有icon属性
        if( Array.isArray(children) ) { // 多个节点，则直接渲染即可
            child = React.Children.map(children, (iChild)=>{
                if( typeof iChild === 'string' ) return <span>{iChild}</span>;
                else return iChild;
            });
        } else {    // 单个节点
            child = children;
            if( children && (children as React.FunctionComponentElement<IconProps>).type === Icon ) {
                clsName = classnames(clsName, getClsPrefix(iconOnlyPrefix, clsPrefix));
            } else child = child? <span>{children}</span>: null
        }
    }

    clsName = classnames(clsName, className);
    if( !child ) return null;
    
    return (
        <button role="button"
            type={htmlType} 
            disabled={disabled} 
            className={clsName} 
            onClick={handleClick} 
            {...restProps}>
            {child}
        </button>
    );
};


Button.defaultProps = {
    block   : false,
    ghost   : false,
    danger  : false,
    htmlType: 'button'
};

Button.displayName = `${displayPrefix}-Button`;

export default Button;
