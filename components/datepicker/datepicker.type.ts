type BaseDatePickerProps = {
    className?: string;
};


type DatePickerProps = BaseDatePickerProps & Pick<React.HTMLAttributes<HTMLDivElement>, 'style'>;


export {
    DatePickerProps
}