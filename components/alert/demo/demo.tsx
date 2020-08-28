import React from 'react';
import ReactDOM from 'react-dom';
import Alert from './../alert';
import './../../index.scss';


ReactDOM.render(
    <div>
        <Alert>纯文字</Alert>
        <Alert icon="info-circle" type="success" closeable>纯文字</Alert>
        <Alert title="这是Title">
            <div>DIV包裹的文字</div>
        </Alert>
    </div>, 
document.getElementById('app'));

