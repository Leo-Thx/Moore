import * as React from 'react';
import { IconProps, IconTypeKey } from './../icon/icon';

type enumType     = 'primary' | 'danger' | 'link' | 'text' | 'default';
type enumSize     = 'sm' | 'lg';
type enumHtmlType = 'submit' | 'reset' | 'button';


interface BaseButtonProps {
    type?     : enumType;
    htmlType  : enumHtmlType;              // HTML原始按钮类型
    size?     : enumSize;                  //
    ghost     : boolean;                   // 是否是空心按钮 true表示没有背景色
    danger    : boolean;                   // 是否是危险按钮
    loading?  : boolean;
    block?    : boolean;                   // 是否是块级元素
    className?: string;
    href?     : string;                    // 链接
    icon?     : React.FunctionComponentElement<IconProps> | IconTypeKey;
    children  : React.ReactNode;
    onClick?  : React.MouseEventHandler;
};


type NativeButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'|'onClick'>;
type NativeAnchorProps = BaseButtonProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'|'onClick'>;
type ButtonProps       = Partial<NativeAnchorProps & NativeButtonProps>;


export {
    enumType,
    enumSize,
    enumHtmlType,
    ButtonProps,
    BaseButtonProps
};