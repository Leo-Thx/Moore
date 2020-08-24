import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './../../index.scss';

import Component from './../button';

ReactDOM.render(
    <>
        <div>
            <Component type="primary">primary</Component>
            <Component type="danger">danger</Component>
            <Component>default</Component>
            <Component type="link">link</Component>
            <Component type="text">text</Component>
        </div>

        <div>
            <Component type="primary" ghost>primary</Component>
            <Component type="danger" ghost>danger</Component>
            <Component type="text" danger>text</Component>
            <Component type="link" danger>link</Component>
        </div>
        
        <div>
            <Component disabled>disabled</Component>
            <Component type="primary" disabled>primary-disabled</Component>
            <Component type="danger" disabled>danger-disabled</Component>
            <Component type="link" disabled>link-disabled</Component>
            <Component type="text" disabled>text-disabled</Component>
            <Component disabled block>block</Component>
        </div>

        <Component type="primary" size="lg">Primary</Component>
        <Component type="danger">Danger</Component>
        <Component type="primary" size="sm">Default</Component>
    </>, 
    document.getElementById('app')
);

