import { IconComAttrType } from '../icon/icon.type';

type BaseInputProps = {
    type?     : 'text'|'password'|'url'|'email'|'date'|'number'|'tel',
    clearable?: boolean;
    
    size?       : 'sm'|'lg';
    value       : string|number;
    defaultValue: string;

    prefix?: IconComAttrType;
    suffix?: IconComAttrType;

    onChange: (val:string|number, ev?: React.ChangeEvent) => void;
};

type BaseTextAreaProps = {

};


type TextAreaProps = Partial<BaseTextAreaProps> & React.TextareaHTMLAttributes<HTMLTextAreaElement>

type InputProps = Partial<BaseInputProps> & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'|'size'>;


type InputFunctionComponent = React.FunctionComponent<InputProps> & {
    TextArea: React.FunctionComponent<TextAreaProps>
};


export {
    InputProps, InputFunctionComponent,
    TextAreaProps
}