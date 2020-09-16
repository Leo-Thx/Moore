import * as React from 'react';
import { displayPrefix } from '../_config/_variables';
import { DatePickerProps } from './datepicker.type';


const DatePicker: React.FC<DatePickerProps> = ({className, ...props}) => {
    
    return (
        <div></div>
    );
};

DatePicker.displayName = `${displayPrefix}-DatePicker`;
DatePicker.defaultProps = {};


export default DatePicker;