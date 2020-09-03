import * as React from 'react';
import { IconComAttrType } from './../icon/icon.type';

type AlerType = 'info' | 'success' | 'warning' | 'error';

type BaseAlertProps = {
    onClose  : React.MouseEventHandler;  // 关闭回调
    closeable: boolean;                  // 是否显示关闭按钮
    closeText: string;                   // 自定义关闭的文字
    type     : AlerType;                 // 类型
    showIcon : boolean;                  // 是否显示左侧图标
    icon     : IconComAttrType;          // 自定义左侧图标
    title    : string;                   // 内容标题
    desc     : string;
    className: string;
};

// type AlertProps = Partial<BaseAlertProps & React.HTMLAttributes<HTMLDivElement>>;
type AlertProps = Partial<BaseAlertProps>;


export {
    AlerType,
    AlertProps
}