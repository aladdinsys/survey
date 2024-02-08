'use client'

import {MultipleChoiceOption} from "@/types/survey";

type BooleanProps = {
    options: Array<MultipleChoiceOption>;
    questionId: number;
    onOptionChange: (value: string) => void;
}

const Boolean = ({ options, questionId, onOptionChange }: Readonly<BooleanProps>) => {

    return (
        <div className={"flex flex-row gap-2 p-2"}>
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