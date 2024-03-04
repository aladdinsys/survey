'use client';

import React from "react";
import {Question, Section} from "@/types/survey";
import FiveLikert from "@/components/Survey/Answers/FiveLikert";
import SingleSelection from "@/components/Survey/Answers/SingleSelection";
import Boolean from "@/components/Survey/Answers/Boolean";
import ShortAnswer from "@/components/Survey/Answers/ShortAnswer";
import LongAnswer from "@/components/Survey/Answers/LongAnswer";
import MapComponent from "@/components/Survey/Answers/Map";

type QuestionProps = {
    section: Section;
    question: Question;
    onAnswerChange: (sectionId: string, questionId: string, answer: string) => void;
}

const Question = ({section, question, onAnswerChange}: QuestionProps) => {

    const handleAnswerChange = (value: string) => {
        onAnswerChange(section.id, question.id, value);
    };

    const { options } = question;

    switch (question.type) {
        case `FIVE-LIKERT`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <FiveLikert questionId={question.id} answers={question.answers} onAnswerChange={handleAnswerChange}/>
                </div>);
        case `SINGLE_SELECTION`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <SingleSelection questionId={question.id} answers={question.answers} onAnswerChange={handleAnswerChange}/>
                </div>
            );
        case `MULTIPLE_SELECTION`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <SingleSelection questionId={question.id} answers={question.answers} onAnswerChange={handleAnswerChange}/>
                </div>
            );
        case `BOOLEAN`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <Boolean questionId={question.id} answers={question.answers} onAnswerChange={handleAnswerChange}/>
                </div>);
        case `SHORT_ANSWER`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <ShortAnswer onInput={handleAnswerChange} />
                </div>);
        case `LONG_ANSWER`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <LongAnswer onInput={handleAnswerChange}/>
                </div>);
        case `MAP`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <MapComponent center={options?.coordinates} onAnswerChange={handleAnswerChange}/>
                </div>);
        default:
            return (<div>
                    <h3>Question Type Error</h3>
                </div>);
    }
}

export default Question;