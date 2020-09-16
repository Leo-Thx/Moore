import React from 'react';
import Button from './../button';
import ButtonGroup from './../buttonGroup';
import Icon from './../../icon/icon';

export default function ButtonDemo() {
    return (
        <>
            <div>
                <Button type="primary" icon={<Icon type="close"></Icon>}>Primary</Button>
                <Button type="primary" icon="info-circle"></Button>
                <Button type="primary"><Icon type="close"></Icon></Button>
                <Button type="primary"><Icon type="close-circle" />Primary</Button>

                <Button icon="close">Primary</Button>
                <Button className="my-class" type="primary" onClick={e=>console.info(e)}>primary</Button>
                <Button type="danger">danger</Button>
                <Button>default</Button>
                <Button type="link" href="http://www.baidu.com">baidu.com</Button>
                <Button type="link">link</Button>
                <Button type="text">text</Button>
            </div><br />

            <div>
                <Button type="primary" ghost>primary</Button>
                <Button type="danger" ghost>danger</Button>
                <Button type="text" danger>text</Button>
                <Button type="link" danger>link</Button>
            </div><br />
            
            <div>
                <Button disabled>disabled</Button>
                <Button type="primary" disabled>primary-disabled</Button>
                <Button type="danger" disabled>danger-disabled</Button>
                <Button type="link" disabled>link-disabled</Button>
                <Button type="text" disabled>text-disabled</Button>
            </div><br />

            <div>
                <Button type="primary" size="lg">Primary</Button>
                <Button size="lg" icon="close">Default</Button>
                <Button size="lg" icon="info-circle"></Button>
                <Button type="danger">Danger</Button>
                <Button type="primary" size="sm">Default</Button>
                <Button size="sm" icon="close">Default</Button>
                <Button disabled block>block</Button>
            </div><br />
            
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
                    <Button icon="check-circle"></Button>
                </ButtonGroup>
                <br /><br />

                <ButtonGroup size="lg" vertical>
                    <Button type="primary">primary</Button>
                    <Button size="lg" icon="info-circle"></Button>
                    <Button>default</Button>
                    <Button type="danger">danger</Button>
                    <Button size="lg">default</Button>
                    <Button size="lg">default</Button>
                </ButtonGroup>&nbsp;

                <ButtonGroup vertical>
                    <Button type="primary">primary</Button>
                    <Button>default</Button>
                    <Button type="danger">danger</Button>
                    <Button size="lg">default</Button>
                    <Button size="lg">default</Button>
                </ButtonGroup>&nbsp;

                <ButtonGroup size="sm" vertical>
                    <Button type="primary">primary</Button>
                    <Button>default</Button>
                    <Button type="danger">danger</Button>
                    <Button size="lg" icon="close">default</Button>
                    <Button size="lg">default</Button>
                </ButtonGroup>
            </div>
        </>
    )
}
