'use client';

import React, {useState} from "react";
import {QuestionRequest, QuestionType} from "@/types/survey";
import FiveLikert from "@/components/Survey/Options/FiveLikert";
import MultipleChoice from "@/components/Survey/Options/MultipleChoice";
import Boolean from "@/components/Survey/Options/Boolean";
import ShortAnswer from "@/components/Survey/Options/ShortAnswer";
import Essay from "@/components/Survey/Options/Essay";

type QuestionProps = {
    question: QuestionType;
    onQuestionChange: (question: QuestionRequest) => void;
}

const Question = ({question, onQuestionChange}: QuestionProps) => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (value: string) => {
        const newQuestion = {
            ...question,
            answer: value,
        };

        onQuestionChange(newQuestion);
    };

    switch (question.type) {
        case `FIVE-LIKERT`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <FiveLikert questionId={question.id} options={question.options} onOptionChange={handleOptionChange}/>
                </div>);
        case `MULTIPLE_CHOICE`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <MultipleChoice questionId={question.id} options={question.options} onOptionChange={handleOptionChange}/>
                </div>
            );
        case `BOOLEAN`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <Boolean questionId={question.id} options={question.options} onOptionChange={handleOptionChange}/>
                </div>);
        case `SHORT`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <ShortAnswer/>
                </div>);
        case `ESSAY`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <Essay/>
                </div>);
        default:
            return (<div>
                    <h3>Question Type Error</h3>
                </div>);
    }
}

export default Question;