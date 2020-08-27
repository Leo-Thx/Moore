import * as React from 'react';
import classnames from 'classnames';
import { TypeKey, IconType, IconTypeMap } from './iconType.map';
import { getClsPrefix } from './../_utils/_style.util';



/**
 * svg需要引入脚本，暂时不用, 使用Unicode码代替
 */
type BaseIconProps = {
    spin     : boolean;  // 旋转
    className: string;   // 自定义类名
    rotate   : number;   // 旋转角度，在spin下不生效
    svg      : boolean;  // 是否使用svg
    type     : string;   // 可使用的类型, svg指向的id
};


type IconProps = Partial<BaseIconProps & React.DOMAttributes<HTMLElement>>;

const Icon: React.FC<IconProps> = props => {
    let { svg, type, className, children, ...restProps } = props,
          clsPefix                 = getClsPrefix('icon');
    
    svg = false;

    const iCls     = classnames(clsPefix, className),
          icon     = IconTypeMap[ type as TypeKey ];

    // const linkHref = '#icon-' + type,
    //       svgCls   = classnames({
    //         [`${clsPefix}-svg`]: svg
    //     });
    

    return React.useMemo(()=>icon ? <i className={iCls} {...restProps} dangerouslySetInnerHTML={{__html: icon.unicode!}}></i> : null, [type]);
    
    // return React.useMemo(() => {
    //     return (
    //         icon ? 
    //             svg && type ?
    //             <i className={iCls} {...restProps}>
    //                 <svg aria-hidden="true" className={svgCls}>
    //                     <use xlinkHref={linkHref}></use>
    //                 </svg>
    //             </i> : 
    //             <i className={iCls} {...restProps} dangerouslySetInnerHTML={{__html: icon.unicode!}}></i>
    //         : null
    //     );
    // }, [svg, type]);
};


export default Icon;
export { IconProps, IconType };
