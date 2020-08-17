import React from 'react';
import classnames from 'classnames';

import styles from './button.scss';

enum ButtonSize {
    Large = 'lg',
    Default = 'md',
    Small = 'sm'
};

enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link',
    Text = 'text',
    Dashed = 'dashed'
};


type ButtonBase = {
    classname: string;
    size: ButtonSize;
    disabled: boolean;
    type: ButtonType;
    href: string;
    loading: boolean;
    onClick: (event: MouseEvent) => void;
    icon: React.ReactNode,
    children: React.ReactNode
};


type ButtonProps = Partial<ButtonBase|HTMLElement>;


const Button: React.FC<ButtonProps> = props => {
    return (
        <div>{ props.children }</div>
    )
};


Button.defaultProps = {};

export default Button;

