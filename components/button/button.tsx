import * as React from 'react';
import classnames from 'classnames';
import { getClsPrefix } from '../_utils/_style.util';


interface BaseButtonProps {
    type?     : 'primary' | 'danger' | 'link' | 'text';
    size?     : 'sm' | 'lg';
    classname?: string;
    href?     : string;
    loading?  : boolean;
    block?    : boolean;
    onClick?  : React.MouseEventHandler;
    icon?     : React.ReactNode;
    children  : React.ReactNode;
};


type NativeButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'|'onClick'>;
type NativeAnchorProps = BaseButtonProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'|'onClick'>;
type ButtonProps       = Partial<NativeAnchorProps & NativeButtonProps>;


const Button: React.FC<ButtonProps> = props => {
    const { disabled, size, classname, type, block, onClick, ...restProps } = props;
    const clsPrefix = getClsPrefix('btn');

    let clname  = classnames(classname, clsPrefix, {
        [`${clsPrefix}-${size}`] : !!size,
        [`${clsPrefix}-${type}`] : !!type
    });

    if( type === 'link' ) {
        return (
            <a className={clname} {...restProps}>
                <span>{props.children}</span>
            </a>
        );
    }

    return (
        <button type="button" disabled className={clname} {...restProps}>
            <span>{props.children}</span>
        </button>
    );
};


Button.defaultProps = {
    block: false
};


export { ButtonProps };
export default Button;
