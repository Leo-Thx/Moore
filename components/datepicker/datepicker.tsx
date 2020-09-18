import * as React from 'react';
import classnames from 'classnames';

import { ComponentPrefix, displayPrefix } from '../_config/_variables';
import { getClsPrefix } from '../_utils/_style.util';
import { DatePickerProps } from './datepicker.type';


const DatePicker: React.FC<DatePickerProps> = ({className, children, ...props}) => {
    let clsPrefix = getClsPrefix(ComponentPrefix.DATE_PICKER),
        clsName = classnames(clsPrefix),
        inputClsName = classnames(getClsPrefix('input', clsPrefix));


    clsName = classnames(clsName, className);
    return (
        <div className={clsName}>
            <input type="text" className={inputClsName}/>
        </div>
    );
};

DatePicker.displayName = `${displayPrefix}-DatePicker`;
DatePicker.defaultProps = {};


export default DatePicker;