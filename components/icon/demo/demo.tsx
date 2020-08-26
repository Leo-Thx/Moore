import React from 'react';
import ReactDOM from 'react-dom';
import Icon, { IconType } from './../icon';
import './../../index.scss';

ReactDOM.render(
    <div>
        <Icon svg href={IconType.close}></Icon>
        <Icon svg></Icon>
        <Icon href={IconType.close}></Icon>
    </div>, 
    document.getElementById('app')
);


