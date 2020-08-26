import * as React from 'react';
import classnames from 'classnames';
import { getClsPrefix } from './../../_utils/_style.util';

type BaseIconProps = {
    svg      : boolean;  //是否使用svg
    href     : string;   // svg指向的id
    unicode  : string;   // unicode编码
    className: string;
};

type IconProps = Partial<BaseIconProps>;

const MetaIcon: React.FC<IconProps> = props => {
    const { svg, href, unicode, className } = props,
          clsPefix               = getClsPrefix('icon');

    const iCls = classnames(clsPefix, className);

    const svgCls = classnames(clsPefix, {
        [`${clsPefix}-svg`]: svg
    });
    
    return React.useMemo(() => {
        return (
            <i className={iCls}>
                { svg ?  
                    <svg aria-hidden="true" className={svgCls}>
                        <use xlinkHref={href}></use>
                    </svg> : 
                unicode  }
            </i>
        );
    }, [svg]);
};


export default MetaIcon;