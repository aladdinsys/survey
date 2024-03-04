'use client'

import {Answer} from "@/types/survey";

type SingleSelectionProps = {
    answers: Array<Answer>;
    questionId: string;
    onAnswerChange: (value: string) => void;
}

const SingleSelection = ({ answers, questionId, onAnswerChange }: Readonly<SingleSelectionProps>) => {

    return (
        <div>
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

export default SingleSelection;