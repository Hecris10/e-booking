import { Input } from './input';

const EditableInput = ({
    value,
    onChange,
    isEditing,
    textClassName,
    inputClassName,
}: {
    value: string;
    onChange: (value: string) => void;
    isEditing: boolean;
    textClassName?: string;
    inputClassName?: string;
}) => {
    if (isEditing)
        return (
            <Input
                className={inputClassName}
                defaultValue={value}
                onChange={(e) => onChange(e.target.value)}
            />
        );
    return <span className={textClassName}>{value}</span>;
};
