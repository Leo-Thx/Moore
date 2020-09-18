import { Moment } from 'moment';

type BaseDatePickerProps = {
    className? : string;
    format     : string;
    placeholder: string;
    readonly   : boolean;
    disabled   : boolean;
    value      : string|Moment
    clearable  : boolean;
    type       : 'year'|'month'|'week'
};


type DatePickerProps = Partial<BaseDatePickerProps> & Pick<React.HTMLAttributes<HTMLDivElement>, 'style'>;


export {
    DatePickerProps
}