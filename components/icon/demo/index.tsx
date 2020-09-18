import * as React from 'react';
import { IconKeyType } from '../icon.type';
import Icon, { IconTypeMap } from './../icon';

export default function IconDemo() {
    return (
        <div>
            {/* <Icon svg type="close"></Icon> */}
            {/* <Icon svg></Icon> */}
            {
                Object.keys(IconTypeMap).map(key=>{
                    return <Icon type={key as IconKeyType} key={key} style={{fontSize: 40}}></Icon>
                })
            }
            <br />
            <Icon type="close" className="test">111</Icon>
            <Icon type="close" spin>111</Icon>
            <Icon type="info-circle" rotate={45} size="24">111</Icon>
            <Icon type="close" spin size="35" rotate={45}>111</Icon>
        </div>
    );
}