import * as React from 'react';
import classnames from 'classnames';

import { displayPrefix, ComponentPrefix } from '../_config/_variables';
import { TextAreaProps } from './input.type';
import { getClsPrefix } from '../_utils/_style.util';

const TextArea: React.FC<TextAreaProps> = ({children, className, value, ...props}) => {
    let { disabled, readOnly, placeholder, ...restProps } = props,
        clsPrefix = getClsPrefix(ComponentPrefix.INPUT),
        clsName = classnames(clsPrefix, {
            [`${clsPrefix}-disabled`]: disabled
        }, className);

    const renderInput = () => {
        return (
            <textarea className={clsName} {...restProps} placeholder={placeholder} value={value} />
        )
    }

    return renderInput();
};


TextArea.displayName = `${displayPrefix}-InputTextArea`;
TextArea.defaultProps = {};

export { TextArea };