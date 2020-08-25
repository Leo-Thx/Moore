import * as React from 'react';
import classnames from 'classnames';
import { getClsPrefix } from '../_utils/_style.util';


interface BaseButtonProps {
    type?     : 'primary' | 'danger' | 'link' | 'text';
    htmlType  : 'submit' | 'reset' | 'button';  // HTML原始按钮类型
    size?     : 'sm' | 'lg';    //
    ghost     : boolean;    // 是否是空心按钮 true表示没有背景色
    danger    : boolean;
    loading?  : boolean;
    block?    : boolean;
    classname?: string;
    href?     : string;
    icon?     : React.ReactNode;
    children  : React.ReactNode;
    onClick?  : React.MouseEventHandler;
};


type NativeButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'|'onClick'>;
type NativeAnchorProps = BaseButtonProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'|'onClick'>;
type ButtonProps       = Partial<NativeAnchorProps & NativeButtonProps>;


const Button: React.FC<ButtonProps> = props => {
    const { disabled, ghost, size, danger, classname, type, href, block, onClick, ...restProps } = props;
    const clsPrefix = getClsPrefix('btn');

    let clname  = classnames(classname, clsPrefix, {
        [`${clsPrefix}-${size}`] : !!size,
        [`${clsPrefix}-${type}`] : !!type,
        [`${clsPrefix}-ghost`]: ghost,
        [`${clsPrefix}-block`]: block
    });

    if( type === 'link' || type === 'text' ) {
        if( danger ) clname = classnames(clname, {
            [`${clsPrefix}-${type}-danger`] : true
        });
    }

    // 暂时不处理href的情况
    const handleClick = React.useCallback((event: React.MouseEvent)=>{
        if( type === 'link' ) return window.open( href );
        else if( typeof onClick === 'function' )  onClick!(event);
    }, [ type ]);


    return (
        <button type="button" disabled={disabled} className={clname} onClick={handleClick} {...restProps}>
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
