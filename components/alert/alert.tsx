import * as React from 'react';
import classnames from 'classnames';
import { getClsPrefix } from './../_utils/_style.util';

import Button from './../button/button';
import Icon, { renderIconNode } from '../icon/icon';

import { AlertProps } from './alert.type';


const Alert: React.FC<AlertProps> = props => {
    const { 
        className, 
        closeable, 
        closeText, 
        type, 
        showIcon, 
        icon, 
        title,
        children
    } = props;

    let clsPrefix = getClsPrefix('alert'),
        clsName   = classnames(clsPrefix, className, {
            [`${clsPrefix}-${type}`]: true
        }),
        containerCls = classnames(getClsPrefix('container', clsPrefix)),
        titleCls = classnames(getClsPrefix('title', clsPrefix)),
        iconCls      = classnames(getClsPrefix('icon', clsPrefix)),
        mainCls      = classnames(getClsPrefix('main', clsPrefix)),
        contentCls   = classnames(getClsPrefix('content', clsPrefix));
    
    let closeNode: React.ReactNode = React.useMemo(()=>{
        let node: React.ReactNode = null,
            closeCls = classnames(getClsPrefix('close', clsPrefix));

        if( closeable ) {
            if(closeText) node = <Button size="sm" className={closeCls} type="text">{closeText}</Button>;
            else node = <Button size="sm" className={closeCls} icon="close-circle" type="text"></Button>;
        }

        return node;
    }, [closeable, closeText]);
    
    let iconNode: React.ReactNode = React.useMemo(()=>{
        let node: React.ReactNode,
            iconCls = classnames(getClsPrefix('icon', clsPrefix));

        if( !showIcon && !icon ) node = null;
        else if( icon ) node = renderIconNode(icon);
        else node = <Icon type="info-circle"></Icon>;
        
        return node && <div className={iconCls}>{iconNode}</div>;
    }, [showIcon, icon]);
    

    return (
        <div className={clsName}>
            <div className={containerCls}>
                {iconNode}
                <div className={mainCls}>
                    <div className={titleCls}>
                        {title && <span>{title}</span>}
                        {closeNode}
                    </div>
                    <div className={contentCls}>{children}</div>
                </div>
            </div>
        </div>
    );
};

Alert.defaultProps = {
    closeable: false,
    type: 'info'
};


export default Alert;