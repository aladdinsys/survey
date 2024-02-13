'use client';

import React, {FC, useEffect} from "react";
import ProceedButton from "@/components/Survey/ProceedButton";
import SurveyTitle from "@/components/Survey/SurveyTitle";
import Section from "@/components/Survey/Section/Section";
import type {SurveyResponse} from "@/apis/interfaces/survey";
import {SectionType, SurveyRequest} from "@/types/survey";
import useSectionStore from "@/store/survey";
import useSectionRequestStore from "@/store/section-request";

interface SurveyProps {
    survey: SurveyResponse;
}
const SurveyComponent: FC<SurveyProps> = ({survey}) => {

    const { currentSection, toPrevSection, toNextSection  } = useSectionStore();
    const { id, setId, setSections, sections, setQuestion } = useSectionRequestStore();

    useEffect(() => {
        setId(survey.id);
        setSections(JSON.parse(survey.content));
    }, [setId, setSections, survey]);

    const onSubmit = () => {
        const survey: SurveyRequest = {
            id: id,
            sections: sections.map((section) => ({
                id: section.id,
                questions: section.questions.map((question) => ({
                    id: question.id,
                    answer: question.answer,
                })),
            })),
        }

        // TODO send survey to server
        console.log(survey);
    }

    const onChoiceChange = (sectionId: number, questionId: number, answer: any) => {
        setQuestion(sectionId, questionId, answer);
    }

    const content: Array<SectionType> = JSON.parse(survey.content);

    return (
        <>
            <SurveyTitle title={survey.title} description={survey.description}>

            </SurveyTitle>
            <div className={`flex flex-col p-4 gap-2 select-none`}>
                {content.map((section: SectionType) =>
                    currentSection == section.id &&
                    <div key={section.id} className={`flex flex-col gap-2`}>
                        <Section section={section} onChoiceChange={onChoiceChange} />
                    </div>
                )}
            </div>
            <div className={`flex flex-row gap-2`}>
                <ProceedButton text={'이전'} handle={toPrevSection}/>
                <ProceedButton text={'다음'} handle={toNextSection}/>
            </div>
            <ProceedButton text={"보내기"} handle={onSubmit}/>
        </>
    );
}

export default SurveyComponent;