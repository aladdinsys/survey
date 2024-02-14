'use client';

import React from "react";
import type {Section, Question } from "@/types/survey";
import QuestionComponent from "@/components/Survey/Question/Question";

type SectionProps = {
    section: Section;
    onChoiceChange: (sectionId: number, questionId: number, answer: string) => void;
}

const Section = ({ section, onChoiceChange }: SectionProps) => {

    return (
        <>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            {section.questions.map((question: Question) =>
                <QuestionComponent
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