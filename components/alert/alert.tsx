import * as React from 'react';

type BaseAlertProps = {
    onClose  : React.MouseEventHandler;                   // 关闭回调
    closeable: boolean;                                   // 是否显示关闭按钮
    closeText: string;                                    // 自定义关闭的文字
    type     : 'info' | 'success' | 'warning' | 'error';  // 四种类型
    showIcon : boolean;                                   // 是否显示左侧图标
    icon     : React.ReactNode;                           // 自定义左侧图标
    title    : string;                                    // 内容标题
    desc     : string;                                    // 具体内容
};

type AlertProps = Partial<BaseAlertProps>;

const Alert: React.FC<AlertProps> = props => {
    return (
        <div></div>
    )
};

Alert.defaultProps = {
    closeable: false
};


export default Alert;