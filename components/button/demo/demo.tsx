import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './../../index.scss';

import Component from './../button';

ReactDOM.render(
    <>
        <Component>Default</Component>
        <Component disabled>disabled</Component>
    </>, 
    document.getElementById('app')
);

