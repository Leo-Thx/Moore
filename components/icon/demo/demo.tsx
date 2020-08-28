import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './../icon';
import './../../index.scss';


ReactDOM.render(
    <div>
        {/* <Icon svg type="close"></Icon> */}
        {/* <Icon svg></Icon> */}
        <Icon type="close" className="test">111</Icon>
        <Icon type="close" spin>111</Icon>
        <Icon type="info-circle" rotate={45} size="24">111</Icon>
        <Icon type="close" spin size="35" rotate={45}>111</Icon>
    </div>, 
    document.getElementById('app')
);


