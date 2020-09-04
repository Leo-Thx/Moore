import * as React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getClsPrefix } from './../_utils/_style.util';
import { displayPrefix } from './../_config/_variables';
import Button from './button';
import { ButtonGroupProps, ButtonProps } from './button.type';


const btnGroupPrefix = 'btn-group';
const ButtonGroup: React.FC<ButtonGroupProps> = props => {
    const { vertical, size, className, children, ...restProps } = props;
    
    const clsPrefix = getClsPrefix(btnGroupPrefix);
    const clsname   = classnames(clsPrefix, {
        [`${clsPrefix}-vertical`]: !!vertical,
        [`${clsPrefix}-${size}`] : !!size
    }, className);

    return (
        <div className={clsname} {...restProps}>
            {
                React.Children.map(children as Array<React.FunctionComponentElement<ButtonProps>>, (iChild) => {
                    if( iChild.type !== Button ) return null;
                    
                    const { type } =  iChild.props,
                        notLinkOrText = type !== 'link' && type !== 'text';

                    return React.cloneElement(iChild, {
                        size: size,
                        type: notLinkOrText ? type: 'default'
                    });
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

Button.displayName = `${displayPrefix}-ButtonGroup`;


export default ButtonGroup;