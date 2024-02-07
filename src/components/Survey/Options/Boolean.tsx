'use client'

import {MultipleChoiceOption} from "@/types/survey";

type BooleanProps = {
    options: Array<MultipleChoiceOption>;
    questionId: number;
    onOptionChange: (value: string) => void;
}

const Boolean = ({ options, questionId, onOptionChange }: Readonly<BooleanProps>) => {

    return (
        <div>
            {options.map((option, index) =>
                <label key={index}>
                    <input type="radio" name={String(questionId)} value={option.value}
                           onChange={() => onOptionChange(option.value)}/>
                    {option.label}
                </label>
            )}
        </div>
    );
}

export default Boolean;