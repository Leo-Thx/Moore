import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './../../index.scss';

import Component from './../button';

ReactDOM.render(
    <>
        <Component>default</Component>
        <Component type="primary">primary</Component>
        <Component type="primary" disabled>primary</Component>
        <Component type="danger">danger</Component>
        <Component type="link">link</Component>
        <Component type="text">text</Component>
        <Component disabled>disabled</Component>
        <Component type="primary" disabled>primary-disabled</Component>
        <Component type="link" disabled>link-disabled</Component>
        <Component type="primary" size="sm">primary-sm</Component>
        <Component type="primary" size="sm" disabled>primary-sm-disabled</Component>
        <Component type="link" size="sm">link-sm</Component>
    </>, 
    document.getElementById('app')
);

