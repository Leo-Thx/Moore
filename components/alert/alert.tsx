import * as React from 'react';
import classnames from 'classnames';
import { getClsPrefix } from './../_utils/_style.util';
import { displayPrefix, ComponentPrefix } from './../_config/_variables';

import Icon, { renderIconNode, IconKeyType } from '../icon/icon';

import { AlertProps, AlerType } from './alert.type';


const getIconType = ( type: AlerType, withFill: boolean = false ): IconKeyType => {
    let map = {
        info   : 'info-circle',
        success: 'check-circle',
        warning: 'warning-circle',
        error  : 'close-circle'
    };

    let result = map[type];
    if( result && withFill ) result = result + '-fill';

    return result as IconKeyType;
}


const Alert: React.FC<AlertProps> = props => {
    const { 
        className, 
        closeable, 
        closeText, 
        type, 
        showIcon, 
        icon, 
        title,
        desc,
        onClose
    } = props;

    let clsPrefix  = getClsPrefix(ComponentPrefix.ALERT),
        alertClass = classnames(clsPrefix, {
            [`${clsPrefix}-${type}`]  : true,
            [`${clsPrefix}-with-icon`]: showIcon,
            [`${clsPrefix}-with-desc`]: !!desc
        }),
        titleCls     = classnames(getClsPrefix('title', clsPrefix)),
        mainCls      = classnames(getClsPrefix('main', clsPrefix)),
        contentCls   = classnames(getClsPrefix('content', clsPrefix));
    
    
    let [clsName, setClsName] = React.useState(alertClass),
        [destoryed, setDestory] = React.useState(false);

    let handleClose = React.useCallback((event: React.MouseEvent)=>{
        setClsName(prev=>classnames(prev, `${clsPrefix}-destory`));
        setTimeout(()=>setDestory(true), 350);
        if( typeof onClose === 'function' ) onClose(event);
    }, [onClose]);

    let closeNode = React.useMemo(()=>{
        let node: React.ReactNode = null,
            closeCls = classnames(getClsPrefix('close', clsPrefix));

        if( closeable ) {
            node = (
                <a className={closeCls} onClick={handleClose}>
                    {closeText ? <i>{closeText}</i>: <Icon type="close"></Icon>}
                </a>
            );
        }

        return node;
    }, [closeable, closeText, handleClose]);

    
    let iconNode = React.useMemo(()=>{
        let node: React.ReactNode,
            iconCls = classnames(getClsPrefix('icon', clsPrefix));

        if( !showIcon ) node = null;
        else if( icon ) node = renderIconNode(icon);
        else {
            let iconType = getIconType(type!, !desc);
            node = <Icon type={iconType}></Icon>;
        }

        return node && <div className={iconCls}>{node}</div>;
    }, [showIcon, icon, type, desc]);

    
    clsName = classnames(clsName, className);
    return (
        destoryed ? null: <div className={clsName}>
            {iconNode}
            {closeNode}
            <div className={mainCls}>
                {title && <div className={titleCls}>{title}</div>}
                { desc && <div className={contentCls}>{desc}</div> }
            </div>
        </div>
    );
};

Alert.defaultProps = {
    type     : 'info',
    closeable: false,
    showIcon : false
};

Alert.displayName = `${displayPrefix}.Alert`;

export default Alert;