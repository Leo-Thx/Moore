import * as React from 'react';
import classnames from 'classnames';

import { displayPrefix, ComponentPrefix } from '../_config/_variables';
import { InputFunctionComponent } from './input.type';
import { getClsPrefix } from '../_utils/_style.util';
import { TextArea } from './textarea';
import Icon, { IconTypeMap, renderIconNode } from '../icon/icon';
import { IconKeyType, IconProps } from '../icon/icon.type';


const Input: InputFunctionComponent = ({children, className, value, defaultValue, size, type, ...props}) => {
    let { onChange, clearable, prefix, suffix, ...restProps } = props,
        showClearable = !restProps.disabled && !restProps.readOnly && !suffix && clearable,
        clsPrefix     = getClsPrefix(ComponentPrefix.INPUT),
        clsName       = classnames(clsPrefix, {
            [`${clsPrefix}-${size}`]  : size,
            [`${clsPrefix}-prefix`]   : prefix,
            [`${clsPrefix}-suffix`]   : suffix,
            [`${clsPrefix}-clearable`]: showClearable
        }, className);
    
    
    let [val, setVal] = React.useState(value || defaultValue || ''),
        inputRef      = React.useRef<HTMLInputElement>(null),
        handleChange  = React.useCallback((ev)=>{
            setVal(ev.target.value);
            if( typeof onChange === 'function' ) onChange(ev.target.value, ev); 
        }, []),
        handleClear = React.useCallback(()=>{
            setVal('');
            if( typeof onChange === 'function' ) onChange('');
            inputRef.current?.focus();
        }, [showClearable]);

    
    let clearIconCls = `${clsPrefix}-clearable-icon`,
        prefixCls    = `${clsPrefix}--prefix`,
        suffixCls    = `${clsPrefix}--suffix`;
    
    
    const renderFixNode = (fixString: string | React.FunctionComponentElement<IconProps> | IconKeyType, type: 'prefix'|'suffix') => {
        let isIcon = false;

        if( typeof fixString === 'string' ) isIcon = fixString in IconTypeMap;
        else isIcon = true;

        return (
            isIcon 
                ? renderIconNode(fixString as React.FunctionComponentElement<IconProps> | IconKeyType, {
                    className: type==='prefix'? prefixCls: suffixCls
                })
                : <span className={type==='prefix'? prefixCls: suffixCls}>{fixString}</span>
        );
    };

    const renderInput = () => {
        return (
            <span className={clsName}>
                {prefix && renderFixNode(prefix, 'prefix')}
                <input ref={inputRef} type={type} {...restProps} value={val} onChange={handleChange} />
                {showClearable && <Icon type="close" className={clearIconCls} onClick={handleClear}></Icon> }
                {suffix && renderFixNode(suffix, 'suffix')}
            </span>
        )
    };

    return renderInput();
};


Input.TextArea = TextArea;

Input.displayName = `${displayPrefix}-Input`;
Input.defaultProps = {
    type: 'text',
    value: ''
};

export default Input;