'use client';

import React from "react";
import {SectionType, QuestionType, SectionRequest, QuestionRequest} from "@/types/survey";
import Question from "@/components/Survey/Question/Question";

type SectionProps = {
    section: SectionType;
    onChoiceChange: (sectionId: number, questionId: number, answer: any) => void;
}

const Section = ({ section, onChoiceChange }: SectionProps) => {

    return (
        <>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            {section.questions.map((question: QuestionType) =>
                <Question
                    key={question.id}
                    section={section}
                    question={question}
                    onChoiceChange={onChoiceChange}
                />
            )}
        </>
    );
}

export default Section;