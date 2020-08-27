import * as React from 'react';

// 可用类型
type IconTypeKey = 'close' | 'user';


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


type IconProps = Partial<BaseIconProps & React.DOMAttributes<HTMLElement>> & {
    type: IconTypeKey   // // 可使用的类型, svg指向的id
};


type BaseIconType = Partial<{
    [ key in IconTypeKey ]: Partial<{   // 映射属性
        href   : string;
        unicode: string;
    }>
}>;


export { IconTypeKey, IconProps, BaseIconType }