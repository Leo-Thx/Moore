import * as React from 'react';
import classnames from 'classnames';
import { ButtonProps } from './button.type';
import { getClsPrefix } from '../_utils/_style.util';
import { displayPrefix } from './../_config/_variables';
import Icon, { renderIconNode } from '../icon/icon';
import { IconProps } from '../icon/icon.type';

const iconOnlyPrefix = 'icon-only',
      btnPrefix      = 'btn';

const Button: React.FC<ButtonProps> = props => {
    const { 
        disabled, 
        ghost, 
        size, 
        danger, 
        className, 
        type, 
        href, 
        block, 
        icon,
        children,
        htmlType, 
        onClick, 
        ...restProps 
    } = props;


    let clsPrefix = getClsPrefix(btnPrefix),
        clsName   = classnames(clsPrefix, {
            [`${clsPrefix}-${type}`]       : !!type && type !== 'default',                     // default不用任何样式
            [`${clsPrefix}-${size}`]       : !!size,
            [`${clsPrefix}-${type}-danger`]: (type === 'link' || type === 'text') && danger,
            [`${clsPrefix}-ghost`]         : ghost,
            [`${clsPrefix}-block`]         : block
    });


    const handleClick = React.useCallback((event: React.MouseEvent)=>{
        if( type === 'link' && href ) return window.open( href );
        else if( typeof onClick === 'function' )  onClick!(event);
    }, [ type, onClick ]);


    let child: React.ReactNode;

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
            } else child = <span>{children}</span>
        }
    }

    clsName = classnames(clsName, className);
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
