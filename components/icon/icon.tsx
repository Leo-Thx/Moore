import * as React from 'react';
import classnames from 'classnames';
import { IconTypeKey, IconProps } from './icon.type';
import { IconTypeMap } from './iconType.map';
import { getClsPrefix } from './../_utils/_style.util';


const Icon: React.FC<IconProps> = props => {
    let { type, className, children, size, spin, rotate, ...restProps } = props,
          clsPefix                 = getClsPrefix('icon');

    let iCls     = classnames(clsPefix, className),
        icon     = IconTypeMap[ type as IconTypeKey ];

    // const linkHref = '#icon-' + type,
    //       svgCls   = classnames({
    //         [`${clsPefix}-svg`]: svg
    //     });
    
    let styleObj: React.CSSProperties = {};

    if( size ) styleObj.fontSize = size+'px';
    if( spin ) iCls = classnames(iCls, getClsPrefix('icon')+'-spin');
    else if( rotate ) styleObj.transform = `rotate(${rotate}deg)`;

    return React.useMemo(() => 
        icon ? 
                <i style={styleObj} className={iCls} {...restProps} dangerouslySetInnerHTML={{__html: icon.unicode!}}></i>
            : null, 
        [type]);
    
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
export { IconProps, IconTypeKey };
