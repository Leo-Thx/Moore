import * as React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getClsPrefix } from './../_utils/_style.util';
import { ButtonProps } from './button';

interface BaseButtonGroupProp {
    vertical : boolean;
    size     : 'sm' | 'lg';
    className: string;
};

type ButtonGroupProps = Partial<BaseButtonGroupProp> & Omit<React.DOMAttributes<HTMLDivElement>, 'onClick'>;


const ButtonGroup: React.FC<ButtonGroupProps> = props => {
    const { vertical, size, className, children, ...restProps } = props;
    const clsPrefix                                             = getClsPrefix('btn-group');

    const clsname = classnames(className, clsPrefix, {
        [`${clsPrefix}-vertical`]: !!vertical,
        [`${clsPrefix}-${size}`] : !!size
    });

    return (
        <div className={clsname} {...restProps}>
            {
                React.Children.map(children as Array<React.ReactNode>, (iChild) => {
                    return React.cloneElement(iChild as React.FunctionComponentElement<ButtonProps>, {
                        size: size
                    })
                })
            }
        </div>
    );
};

ButtonGroup.defaultProps = {
    vertical: false
};


ButtonGroup.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ])
};


export default ButtonGroup;
export { ButtonGroupProps };