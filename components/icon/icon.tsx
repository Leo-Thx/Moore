import * as React from 'react';
import classnames from 'classnames';
import { TypeKey, IconType, IconTypeMap } from './iconType.map';
import { getClsPrefix } from './../_utils/_style.util';


type BaseIconProps = {
    spin     : boolean;  // 旋转
    className: string;   // 自定义类名
    rotate   : number;   // 旋转角度，在spin下不生效
    svg      : boolean;  // 是否使用svg
    type     : string;   // 可使用的类型
    href     : string;   // svg指向的id
};

type IconProps = Partial<BaseIconProps>;

const Icon: React.FC<IconProps> = props => {
    const { svg, href, className } = props,
          clsPefix                 = getClsPrefix('icon');

    const iCls = classnames(clsPefix, className),
        icon = IconTypeMap[ href as TypeKey ];

    const svgCls = classnames({
        [`${clsPefix}-svg`]: svg
    });

    const linkHref = '#icon-' + href;
    
    return React.useMemo(() => {
        return (
            icon ? 
                svg && href ?
                <i className={iCls}>
                    <svg aria-hidden="true" className={svgCls}>
                        <use xlinkHref={linkHref}></use>
                    </svg>
                </i> : 
                <i className={iCls} dangerouslySetInnerHTML={{__html: icon.unicode!}}></i>
            : null
        );
    }, [svg]);
};


export default Icon;
export { IconProps, IconType };
