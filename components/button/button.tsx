import React from 'react';
import classnames from 'classnames';

export enum ButtonSize {
    Large = 'lg',
    Default = 'md',
    Small = 'sm'
};

export enum ButtonType {
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


type ButtonProps = Partial<ButtonBase>;


const Button: React.FC<ButtonProps> = props => {
    const { disabled } = props;
    const classname = classnames('moore-btn', {
        'moore-btn-disabled': disabled
    });

    return (
        <button className={classname}>{props.children}</button>
    )
};


Button.defaultProps = {
    type: ButtonType.Default,
    size: ButtonSize.Default
};

export default Button;

