import * as React from 'react';

// 可用类型
type IconKeyType = 'close' | 'info-circle' | 'check-circle' | 'close-circle';


/**
 * svg需要引入脚本，暂时不用, 使用Unicode码代替
 */
interface BaseIconProps {
    spin     : boolean;        // 旋转
    className: string;         // 自定义类名
    rotate   : number;         // 旋转角度，在spin下不生效
    size     : number|string;  // 默认单位px 大小 fontSize
    // svg      : boolean;  // 是否使用svg
};


type IconProps = Partial<BaseIconProps & React.HTMLAttributes<HTMLElement>> & {
    type: IconKeyType   // 可使用的类型, svg指向的id
};


/**
 * 作为组件属性或节点进行渲染的ICON类型声明
 */
type IconComAttrType = React.FunctionComponentElement<IconProps> | IconKeyType;


export { IconKeyType, IconProps, IconComAttrType }