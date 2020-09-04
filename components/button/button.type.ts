import * as React from 'react';
import { IconComAttrType } from './../icon/icon.type';

type ButtonEnumType     = 'primary' | 'danger' | 'link' | 'text' | 'icon' | 'default';
type ButtonEnumSize     = 'sm' | 'lg';
type ButtonEnumHtmlType = 'submit' | 'reset' | 'button';


interface BaseButtonProps {
    type     : ButtonEnumType;
    htmlType : ButtonEnumHtmlType;       // HTML原始按钮类型
    size     : ButtonEnumSize;           //
    ghost    : boolean;                  // 是否是空心按钮 true表示没有背景色
    danger   : boolean;                  // 是否是危险按钮
    loading  : boolean;
    block    : boolean;                  // 是否是块级元素
    className: string;
    href     : string;                   // 链接
    icon     : IconComAttrType;
    children : React.ReactNode;
    onClick  : React.MouseEventHandler;
};


type NativeButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'|'onClick'>;
type NativeAnchorProps = BaseButtonProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'|'onClick'>;
type ButtonProps       = Partial<NativeAnchorProps & NativeButtonProps>;



// -------------按钮组--------------
interface BaseButtonGroupProp {
    vertical? : boolean;
    size?     : 'sm' | 'lg';
    className?: string;
    // children  : React.ReactElement<ButtonProps> | Array<React.ReactElement<ButtonProps>>
};

type ButtonGroupProps = BaseButtonGroupProp & Partial<Omit<React.DOMAttributes<HTMLDivElement>, 'onClick'>>;


export {
    ButtonProps,
    ButtonGroupProps
};