'use client'

import {Option} from "@/types/survey";

type MultipleChoiceProps = {
    options: Array<Option>;
    questionId: string;
    onOptionChange: (value: string) => void;
}

const MultipleChoice = ({ options, questionId, onOptionChange }: Readonly<MultipleChoiceProps>) => {

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

export default MultipleChoice;