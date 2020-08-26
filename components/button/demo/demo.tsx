import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './../../index.scss';

import Button from './../button';
import ButtonGroup from './../buttonGroup';


ReactDOM.render(
    <>
        <div>
            <Button className="my-class" type="primary" onClick={e=>console.info(e)}>primary</Button>
            <Button type="danger">danger</Button>
            <Button>default</Button>
            <Button type="link" href="http://www.baidu.com">baidu.com</Button>
            <Button type="link">link</Button>
            <Button type="text">text</Button>
        </div>

        <div>
            <Button type="primary" ghost>primary</Button>
            <Button type="danger" ghost>danger</Button>
            <Button type="text" danger>text</Button>
            <Button type="link" danger>link</Button>
        </div>
        
        <div>
            <Button disabled>disabled</Button>
            <Button type="primary" disabled>primary-disabled</Button>
            <Button type="danger" disabled>danger-disabled</Button>
            <Button type="link" disabled>link-disabled</Button>
            <Button type="text" disabled>text-disabled</Button>
        </div>

        <div>
            <Button type="primary" size="lg">Primary</Button>
            <Button type="danger">Danger</Button>
            <Button type="primary" size="sm">Default</Button>
            <Button disabled block>block</Button>
        </div>
        
        <div>
            <ButtonGroup>
                <Button>Text</Button>
            </ButtonGroup>
            <ButtonGroup><Button>Text</Button></ButtonGroup>
            <hr />
            <ButtonGroup size="sm">
                <Button type="primary">primary</Button>
                <Button>default</Button>
                <Button type="danger">danger</Button>
                <Button size="lg">default</Button>
                <Button size="lg">default</Button>
            </ButtonGroup>
            <br />

            <ButtonGroup size="lg" vertical>
                <Button type="primary">primary</Button>
                <Button>default</Button>
                <Button type="danger">danger</Button>
                <Button size="lg">default</Button>
                <Button size="lg">default</Button>
            </ButtonGroup>

            <ButtonGroup vertical>
                <Button type="primary">primary</Button>
                <Button>default</Button>
                <Button type="danger">danger</Button>
                <Button size="lg">default</Button>
                <Button size="lg">default</Button>
            </ButtonGroup>

            <ButtonGroup size="sm" vertical>
                <Button type="primary">primary</Button>
                <Button>default</Button>
                <Button type="danger">danger</Button>
                <Button size="lg">default</Button>
                <Button size="lg">default</Button>
            </ButtonGroup>
        </div>
    </>, 
    document.getElementById('app')
);

