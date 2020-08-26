import * as React from 'react';
import classnames from 'classnames';
import { getClsPrefix } from './../_utils/_style.util';
import MetaIcon from './icons/icon.close';

type BaseIconProps = {
    spin     : boolean;  // 旋转
    className: string;   // 自定义类名
    rotate   : number;   // 旋转角度，在spin下不生效
    useSvg   : boolean;  //是否使用svg
};

type IconProps = Partial<BaseIconProps>;

const Icon: React.FC<IconProps> = props => {
    const clsPefix = getClsPrefix('icon');
    const clsName = classnames(clsPefix, {
        [`${clsPefix}-svg`]: props.useSvg
    });

    return <MetaIcon svg href="#icon-close"></MetaIcon>

    return (
        <i className={clsName}>
            <svg aria-hidden="true">
                <use xlinkHref='#icon-close'></use>
            </svg>
        </i>
        // <i className={clsName}>&#xe7fc;</i>
        
    );
};


export default Icon;
export { IconProps };