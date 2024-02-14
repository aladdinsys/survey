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

    const { currentSection, prevSections,  setCurrentSection, addPrevSection, setPrevSections, } = useSectionStateStore();
    const { id, setSurveyId, setSections, sections, setQuestion } = useSurveyParamStore();

    const content: Array<Section> = JSON.parse(survey.content);

    useEffect(() => {
        setSurveyId(survey.id);
        setSections(JSON.parse(survey.content));
    }, [setSurveyId, setSections, survey]);

    const onChoiceChange = (sectionId: number, questionId: number, answer: any) => {
        setQuestion(sectionId, questionId, answer);
    }

    const getNextSection = () => {
        const currentIndex = content.findIndex((section: Section) => section.id == currentSection);

        const thisSection = content[currentIndex];
        const nextSection = content[currentIndex + 1];
        const answerRequests = sections.find((section) => section.id == currentSection)?.questions;

        return thisSection.questions.reduce((acc, question) => {
            const answer = answerRequests?.find((answer) => answer.id == question.id)?.answer;
            const option = question.options.find((option) => option.value == answer);
            if (option?.nextSection) {
                return option.nextSection;
            }

            return acc;
        }, nextSection.id);

    }

    const toPrev = () => {
        const latestPrev = prevSections.pop();
        if(latestPrev === undefined) return;
        setCurrentSection(latestPrev);
    }

    const toNext = () => {
        const nextSection = getNextSection();
        addPrevSection(currentSection);
        setCurrentSection(nextSection);
    }

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
    }

    return (
        <main className={`flex flex-col items-center`}>
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
                <ProceedButton text={"보내기"} className={currentSection !== content[content.length - 1].id ? `hidden` : `bg-green-500`} handle={onSubmit}/>
            </div>
        </main>
    );
}

export default SurveyComponent;