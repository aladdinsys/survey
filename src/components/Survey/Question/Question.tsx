'use client';

import React, {useState} from "react";
import {QuestionRequest, QuestionType, SectionRequest, SectionType} from "@/types/survey";
import FiveLikert from "@/components/Survey/Options/FiveLikert";
import MultipleChoice from "@/components/Survey/Options/MultipleChoice";
import Boolean from "@/components/Survey/Options/Boolean";
import ShortAnswer from "@/components/Survey/Options/ShortAnswer";
import Essay from "@/components/Survey/Options/Essay";

type QuestionProps = {
    section: SectionType;
    question: QuestionType;
    onChoiceChange: (sectionId: number, questionId: number, answer: any) => void;
}

const Question = ({section, question, onChoiceChange}: QuestionProps) => {

    const handleOptionChange = (value: string) => {
        onChoiceChange(section.id, question.id, value);
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
                    <ShortAnswer onInput={handleOptionChange} />
                </div>);
        case `ESSAY`:
            return (<div>
                    <h3>{question.question_text}</h3>
                    <Essay onInput={handleOptionChange}/>
                </div>);
        default:
            return (<div>
                    <h3>Question Type Error</h3>
                </div>);
    }
}

export default Question;