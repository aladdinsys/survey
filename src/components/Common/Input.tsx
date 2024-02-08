import React, {FC, useEffect, useRef} from 'react';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({ value, onChange }) => {
    const inputRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.innerHTML = value;
        }
    }, [value]);

    const handleContentChange = () => {
        if (inputRef.current) {
            onChange(inputRef.current.textContent || '');
        }
    };

    const handleBlur = () => {
        if (inputRef.current) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(inputRef.current);
            range.collapse(false); // set the cursor to the end
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    };

    return (
        <div
            ref={inputRef}
            contentEditable
            className="custom-input"
            onInput={handleContentChange}
            onBlur={handleBlur}
        />
    );
};

export default Input;