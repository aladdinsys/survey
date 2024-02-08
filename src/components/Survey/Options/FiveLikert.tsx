'use client'

import {MultipleChoiceOption} from "@/types/survey";

type FiveLikertProps = {
    questionId: number;
    options: Array<MultipleChoiceOption>;
    onOptionChange: (value: string) => void;
}

const FiveLikert = ({ questionId, options, onOptionChange }: Readonly<FiveLikertProps>) => {

    return (
      <div className={"flex flex-row gap-2 "}>
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