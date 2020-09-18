import * as React from 'react';
import classnames from 'classnames';
import { IconKeyType, IconProps } from './icon.type';
import { IconTypeMap } from './iconType.map';
import { getClsPrefix } from './../_utils/_style.util';
import { displayPrefix, ComponentPrefix } from './../_config/_variables';

const Icon: React.FC<IconProps> = props => {
    let { type, className, children, size, spin, rotate, ...restProps } = props;

    let clsPefix = getClsPrefix(ComponentPrefix.ICON),
        iCls     = classnames(clsPefix),
        icon     = IconTypeMap[ type as IconKeyType ];

    // const linkHref = '#icon-' + type,
    //       svgCls   = classnames({
    //         [`${clsPefix}-svg`]: svg
    //     });
    
    let styleObj: React.CSSProperties = {};

    if( size ) styleObj.fontSize = size+'px';
    if( spin ) iCls = classnames(iCls, getClsPrefix('icon')+'-spin');
    else if( rotate ) styleObj.transform = `rotate(${rotate}deg)`;

    iCls = classnames(iCls, className);

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

Icon.displayName = `${displayPrefix}-Icon`;



/**
 * 获取需要渲染的图标
 * @param icon 图标
 *  @type icon: string | Icon
 * @return null | React.ReactNode<Icon>
 */
function renderIconNode(icon: React.FunctionComponentElement<IconProps> | IconKeyType | undefined, props?: Omit<IconProps, 'type'>): React.ReactNode {
    if( !icon ) return null;
        
    // 如果icon是作为属性传入的 [ string ]
    if( typeof icon === 'string' ) {
        return icon in IconTypeMap && <Icon type={icon} {...props}></Icon>;
    
    // 如果是作为节点传入
    } else if( (icon as React.FunctionComponentElement<IconProps>).type === Icon ){
        return React.cloneElement(icon as React.FunctionComponentElement<IconProps>);
    }
    
    return null;
}


export default Icon;
export { renderIconNode, IconKeyType, IconTypeMap };
