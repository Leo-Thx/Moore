import * as React from 'react';
import Icon from './../icon';

export default function IconDemo() {
    return (
        <div>
            {/* <Icon svg type="close"></Icon> */}
            {/* <Icon svg></Icon> */}
            <Icon type="close" className="test">111</Icon>
            <Icon type="close" spin>111</Icon>
            <Icon type="info-circle" rotate={45} size="24">111</Icon>
            <Icon type="close" spin size="35" rotate={45}>111</Icon>
        </div>
    );
}