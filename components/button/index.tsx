import React from 'react';

import '@style/index';
import styles from './button.scss';


type ButtonProps = {
    classname?: string;
};


const Button: React.FC<ButtonProps> = (props) => {
    return (
        <div>{ props }</div>
    )
};

export default Button;

