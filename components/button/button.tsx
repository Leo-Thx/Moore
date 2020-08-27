import * as React from 'react';
import classnames from 'classnames';
import { ButtonProps, BaseButtonProps } from './button.type';
import { getClsPrefix } from '../_utils/_style.util';
import Icon, { IconProps } from '../icon/icon';

/**
 * 获取需要渲染的图标
 * @param icon 图标
 *  @type icon: string | Icon
 * @param children button的子元素
 * @return null | React.ReactNode<Icon>
 */
function userIconNode(icon: BaseButtonProps[keyof Pick<BaseButtonProps, 'icon'>], children?: React.ReactNode): React.ReactNode {
    // icon: BaseButtonProps[keyof Pick<BaseButtonProps, 'icon'>]
    return React.useMemo(()=>{
        if( !icon ) return null;
        
        if( typeof icon === 'string' ) {        // 如果icon是作为属性传入的 [ string ]
            return <Icon type={icon}></Icon>;

        } else if( (icon as React.FunctionComponentElement<IconProps>).type === Icon ){
            return React.cloneElement(icon as React.FunctionComponentElement<IconProps>);
        }
        
        return null;
    }, [icon]);
}


const Button: React.FC<ButtonProps> = props => {
    const { 
        disabled, 
        ghost, 
        size, 
        danger, 
        className, 
        type, 
        href, 
        block, 
        icon,
        children,
        htmlType, 
        onClick, 
        ...restProps 
    } = props;


    let clsPrefix = getClsPrefix('btn'),
        clname    = classnames(className, clsPrefix, {
        [`${clsPrefix}-${size}`]: !!size,
        [`${clsPrefix}-${type}`]: !!type && type !== 'default', // default不用任何样式
        [`${clsPrefix}-ghost`]  : ghost,
        [`${clsPrefix}-block`]  : block,
        // link 或 text 类型按钮且传入了danger
        [`${clsPrefix}-${type}-danger`]: (type === 'link' || type === 'text') && danger
    });


    // if( type === 'link' || type === 'text' ) {
    //     clname = classnames(clname, {
    //         [`${clsPrefix}-${type}-danger`]: danger
    //     });
    // }

    /**
     * 
     */
    const handleClick = React.useCallback((event: React.MouseEvent)=>{
        if( type === 'link' && href ) return window.open( href );
        else if( typeof onClick === 'function' )  onClick!(event);
    }, [ type, onClick ]);


    const IconNode = userIconNode(icon, children);

    return (
        <button role="button" 
            type={htmlType} 
            disabled={disabled} 
            className={clname} 
            onClick={handleClick} 
            {...restProps}>
            { IconNode }
            <span>{children}</span>
        </button>
    );
};


Button.defaultProps = {
    block   : false,
    ghost   : false,
    danger  : false,
    htmlType: 'button'
};


export { ButtonProps };
export default Button;
