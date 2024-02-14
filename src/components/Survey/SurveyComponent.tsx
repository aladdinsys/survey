'use client';

import React, {FC, useEffect} from "react";
import ProceedButton from "@/components/Survey/ProceedButton";
import SurveyTitle from "@/components/Survey/SurveyTitle";
import SectionComponent from "@/components/Survey/Section/Section";
import type {SurveyResponse} from "@/apis/interfaces/survey-response";
import {Section, SurveyParam} from "@/types/survey";
import useSectionStateStore from "@/store/section-state";
import useSurveyParamStore from "@/store/survey-params";

interface SurveyProps {
    survey: SurveyResponse;
}
const SurveyComponent: FC<SurveyProps> = ({survey}) => {

    const { currentSection, addPrevSection, setCurrentSection } = useSectionStateStore();
    const { id, setSurveyId, setSections, sections, setQuestion } = useSurveyParamStore();

    useEffect(() => {
        setSurveyId(survey.id);
        setSections(JSON.parse(survey.content));
    }, [setSurveyId, setSections, survey]);

    const onSubmit = () => {
        const survey: SurveyParam = {
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

    const getNextSection = () => {
        const thisSection = content.find((section: Section) => section.id == currentSection) as Section;
        const answerRequests = sections.find((section) => section.id == currentSection)?.questions;

        return thisSection.questions.reduce((acc, question) => {
            if (question.type == 'MULTIPLE_CHOICE') {
                const answer = answerRequests?.find((answer) => answer.id == question.id)?.answer;
                const option = question.options.find((option) => option.value == answer);
                if (option?.nextSection) {
                    return option.nextSection;
                }
            }
            return acc;
        }, 0);

    }

    const toPrev = () => {

    }
    const toNext = () => {
        const nextSection = getNextSection();
        console.log(nextSection);
        setCurrentSection(nextSection);
    }

    const content: Array<Section> = JSON.parse(survey.content);

    return (
        <>
            <SurveyTitle title={survey.title} description={survey.description}>

            </SurveyTitle>
            <div className={`flex flex-col p-4 gap-2 select-none`}>
                {content.map((section: Section) =>
                    currentSection == section.id &&
                    <div key={section.id} className={`flex flex-col gap-2`}>
                        <SectionComponent section={section} onChoiceChange={onChoiceChange} />
                    </div>
                )}
            </div>
            <div className={`flex flex-row gap-2`}>
                <ProceedButton text={'이전'} handle={toPrev}/>
                <ProceedButton text={'다음'} handle={toNext}/>
            </div>
            <ProceedButton text={"보내기"} handle={onSubmit}/>
        </>
    );
}

export default SurveyComponent;