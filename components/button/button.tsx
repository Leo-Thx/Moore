import * as React from 'react';
import classnames from 'classnames';
import { getClsPrefix } from '../_utils/_style.util';
import Icon, { IconProps } from '../icon/icon';


interface BaseButtonProps {
    type?     : 'primary' | 'danger' | 'link' | 'text' | 'default';
    htmlType  : 'submit' | 'reset' | 'button';                       // HTML原始按钮类型
    size?     : 'sm' | 'lg';                                         //
    ghost     : boolean;                                             // 是否是空心按钮 true表示没有背景色
    danger    : boolean;
    loading?  : boolean;
    block?    : boolean;
    className?: string;
    href?     : string;
    icon?     : React.ReactNode | string;
    children  : React.ReactNode;
    onClick?  : React.MouseEventHandler;
};


type NativeButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'|'onClick'>;
type NativeAnchorProps = BaseButtonProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'|'onClick'>;
type ButtonProps       = Partial<NativeAnchorProps & NativeButtonProps>;


const Button: React.FC<ButtonProps> = props => {
    const { 
        disabled, htmlType = 'button', 
        ghost, size, danger, className, 
        type, href, block, 
        icon,
        onClick, 
        ...restProps 
    } = props;

    const clsPrefix = getClsPrefix('btn');

    let clname  = classnames(className, clsPrefix, {
        [`${clsPrefix}-${size}`]: !!size,
        [`${clsPrefix}-${type}`]: !!type && type !== 'default',
        [`${clsPrefix}-ghost`]  : ghost,
        [`${clsPrefix}-block`]  : block
    });

    if( type === 'link' || type === 'text' ) {
        if( danger ) clname = classnames(clname, {
            [`${clsPrefix}-${type}-danger`]: true
        });
    }

    /**
     * 
     */
    const handleClick = React.useCallback((event: React.MouseEvent)=>{
        if( type === 'link' && href ) return window.open( href );
        else if( typeof onClick === 'function' )  onClick!(event);
    }, [ type, onClick ]);

    /**
     * 
     */
    const IconNode = React.useMemo(()=>{
        if( !icon ) return null;
        if( typeof icon === 'string' ) return <Icon type={icon}></Icon>
        else return React.cloneElement(icon as React.FunctionComponentElement<IconProps>); 
    }, [icon])

    return (
        <button role="button" 
            type={htmlType} 
            disabled={disabled} 
            className={clname} 
            onClick={handleClick} 
            {...restProps}>
            { IconNode && IconNode }
            <span>{props.children}</span>
        </button>
    );
};


Button.defaultProps = {
    block : false,
    ghost : false,
    danger: false
};


export { ButtonProps };
export default Button;
