'use client'

import {Answer} from "@/types/survey";

type BooleanProps = {
    questionId: string;
    answers: Array<Answer>;
    onAnswerChange: (value: string) => void;
}

const Boolean = ({ questionId, answers, onAnswerChange }: Readonly<BooleanProps>) => {
    return (
        <div className={"flex flex-row gap-2 p-2"}>
            {answers.map((answer, index) =>
                <label key={index}>
                    <input type="radio" name={String(questionId)} value={answer.value}
                           onChange={() => onAnswerChange(answer.value)}/>
                    {answer.label}
                </label>
            )}
        </div>
    );
}

export default Boolean;