'use client'

import {MultipleChoiceOption} from "@/types/survey";

type FiveLikertProps = {
    options: Array<MultipleChoiceOption>;
    questionId: number;
    onOptionChange: (value: string) => void;
}

const FiveLikert = ({ options, questionId, onOptionChange }: Readonly<FiveLikertProps>) => {

    return (
      <div>
          {options.map((option, index) =>
            <label key={index}>
                <input type="radio" name={String(questionId)} value={option.value} onChange={() => onOptionChange(option.value)} />
                {option.label}
            </label>
          )}
      </div>
    );
}

export default FiveLikert;