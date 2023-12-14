import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

export const EditableText = ({
    text,
    setText,
    placeholder,
}: {
    text: string;
    setText: (text: string) => void;
    placeholder: string;
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputText, setInputText] = useState(text);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setText(inputText);
            setIsEditing(false);
        }
    };
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    return React.createElement(
        'div',
        { className: 'flex gap-2' },
        React.createElement('p', { className: 'text-lg font-bold' }, text),
        React.createElement(
            'button',
            { onClick: () => setIsEditing(true), className: 'text-lg font-bold text-slate-400' },
            '\u270E'
        ),
        isEditing &&
            React.createElement('input', {
                ref: inputRef,
                className: 'text-lg font-bold',
                value: inputText,
                onChange: handleTextChange,
                onKeyDown: handleKeyDown,
                onBlur: () => {
                    setIsEditing(false);
                    setText(inputText);
                },
                placeholder: placeholder,
            })
    );
};
//# sourceMappingURL=editable-text.js.map
