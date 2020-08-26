import React from 'react';
import ReactDOM from 'react-dom';
import Alert from './../alert';


ReactDOM.render(
    <div>
        <Alert>纯文字</Alert>
        <Alert>
            <div>DIV包裹的文字</div>
        </Alert>
    </div>, 
document.getElementById('app'));

