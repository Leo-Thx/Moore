import React from 'react';
import ReactDOM from 'react-dom';
import Icon, { IconType } from './../icon';
import './../../index.scss';

ReactDOM.render(
    <div>
        {/* <Icon svg type={IconType.close}></Icon> */}
        {/* <Icon svg></Icon> */}
        <Icon type={IconType.close}>111</Icon>
    </div>, 
    document.getElementById('app')
);


