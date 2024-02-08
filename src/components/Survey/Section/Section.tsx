'use client';

import React, {useEffect, useState} from "react";
import {SectionType, QuestionType, QuestionRequest, SectionRequest} from "@/types/survey";
import ProceedButton from "@/components/Survey/ProceedButton";
import Question from "@/components/Survey/Question/Question";
import useSectionStore from "@/store/survey";

type SectionsProps = {
    sections: Array<SectionType>;
    onSectionChange: (section: SectionRequest) => void;
}

const Section = ({ sections, onSectionChange }: SectionsProps) => {

    const { currentSection, prevSection, nextSection, toPrevSection, toNextSection  } = useSectionStore();

    return (
        <div className={`flex flex-col p-4 gap-2 select-none`}>
            {sections.map((section: SectionType) =>
                currentSection == section.id &&
                <div key={section.id}>
                    <h2>{section.title}</h2>
                    <p>{section.description}</p>
                    {section.questions.map((question: QuestionType) =>
                        <Question
                            key={question.id}
                            question={question}
                        />
                    )}
                </div>
            )}
            <div className={`flex flex-row gap-2`}>
                <ProceedButton text={'이전'} handle={toPrevSection} />
                <ProceedButton text={'다음'} handle={toNextSection} />
            </div>
        </div>
    );
}

export default Section;