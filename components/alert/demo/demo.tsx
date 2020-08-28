import React from 'react';
import ReactDOM from 'react-dom';
import Alert from './../alert';
import './../../index.scss';


ReactDOM.render(
    <div>
        <Alert showIcon>纯文字</Alert>
        <br />
        <Alert icon="check-circle" type="success" closeable>纯文字</Alert>
        <br />
        <Alert title="这是Title" closeable closeText="关闭">
            <div>DIV包裹的文字</div>
        </Alert>
        <br />
        <Alert title="这是Title" type="error" closeable showIcon closeText="关闭">
            <div>DIV包裹的文字</div>
        </Alert>
    </div>, 
document.getElementById('app'));

