import * as React from 'react';
import classnames from 'classnames';
import { AlertProps } from './alert.type';
import { getClsPrefix } from './../_utils/_style.util';
import Button from './../button/button';


const Alert: React.FC<AlertProps> = props => {
    const { 
        className, 
        closeable, 
        closeText, 
        type, 
        showIcon, 
        icon, 
        title 
    } = props;

    let clsPrefix = getClsPrefix('alert'),
        clsName = classnames(clsPrefix, className, {
            [`${clsPrefix}-${type}`]: true
        }),
        wrapperCls = classnames(getClsPrefix('wrapper', clsPrefix)),
        iconCls = classnames(getClsPrefix('icon', clsPrefix)),
        closeCls = classnames(getClsPrefix('close', clsPrefix))
        
    
        
    function renderCloseComp() {

    }

    return (
        <div className={clsName}>
            <div className={wrapperCls}>
                <div className="iconCls"></div>
                {props.children}
                <Button className="closeCls" icon="close-circle"></Button>
            </div>
        </div>
    )
};

Alert.defaultProps = {
    closeable: false,
    type: 'info'
};


export default Alert;