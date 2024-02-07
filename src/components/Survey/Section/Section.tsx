'use client';

import React, {useState} from "react";
import {SectionType, QuestionType} from "@/types/survey";
import ProceedButton from "@/components/Survey/ProceedButton";
import Question from "@/components/Survey/Question";
import {useRecoilState} from "recoil";
import {surveyAnswerState} from "@/recoil/SurveyAnswerAtom";

type SectionsProps = {
    sections: Array<SectionType>;
}

const Section = ({ sections }: SectionsProps) => {

    const [sectionId, setSectionId] = useState(1);
    const [values, setValues] = useState({});

    const handleSectionChange = (id: number) => {

    }

    const nextSection = () => {
        if (sectionId == sections.length) {
            return;
        }

        setSectionId(prevState => prevState + 1);
    }
    const prevSection = () => {
        if (sectionId == sections[0].id) {
            return;
        }
        setSectionId(prevState => prevState - 1);
    }

    const onChange = (questionId: number, value: string) => {
        setValues(prevState => {
            return {
                ...prevState,
                [questionId]: value
            }
        });
    }

    return (
        <div className={`flex flex-col p-4 gap-2 select-none`}>
            {sections.map((section: SectionType) =>
                sectionId == section.id &&
                <div key={section.id}>
                    <h2>{section.title}</h2>
                    <p>{section.description}</p>
                    {section.questions.map((question: QuestionType) =>
                        <Question
                            key={question.id}
                            question={question}
                            onQuestionChange={values}
                        />
                    )}
                </div>
            )}
            <div className={`flex flex-row gap-2`}>
                <ProceedButton text={'이전'} handle={prevSection} />
                <ProceedButton text={'다음'} handle={nextSection} />
            </div>
        </div>
    );
}

export default Section;