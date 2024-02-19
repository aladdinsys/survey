'use client';

import React, {FC, useEffect} from "react";
import ProceedButton from "@/components/Survey/ProceedButton";
import SurveyTitle from "@/components/Survey/SurveyTitle";
import SectionComponent from "@/components/Survey/Section/Section";
import type {SurveyResponse} from "@/services/types/survey-response";
import {Section, SurveyParam} from "@/types/survey";
import useSectionStateStore from "@/store/section-state";
import useSurveyParamStore from "@/store/survey-params";
import { v4 as uuidv4 } from 'uuid';


interface SurveyProps {
    survey: SurveyResponse;
}
const SurveyComponent: FC<SurveyProps> = ({survey}) => {

    const { currentSection, prevSections,  setCurrentSection, addPrevSection } = useSectionStateStore();
    const { surveyId, setSurveyId, setSections, sections, setQuestion } = useSurveyParamStore();

    const content: Array<Section> = JSON.parse(survey.content);

    useEffect(() => {
        setSurveyId(survey.id);
        setSections(JSON.parse(survey.content));
    }, [setSurveyId, setSections, survey]);

    const onChoiceChange = (sectionId: string, questionId: string, answer: string) => {
        setQuestion(sectionId, questionId, answer);
    }

    const getNextSection = () => {
        const currentIndex = content.findIndex((section: Section) => section.id == currentSection);

        const thisSection = content[currentIndex];

        return thisSection.questions.reduce((acc, question) => {

            const selectedValue = sections[thisSection.id][question.id];

            const result = question.options.filter((option) => option.value == selectedValue)
                                .filter((option) => option.nextSection)
                                .map((option) => option.nextSection! )
                                .sort((a, b) => Number(a) - Number(b))[0];

            return result ? result : acc;

        }, content[currentIndex + 1] ? content[currentIndex + 1].id : currentSection);


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

    const onSubmit = async () => {
        const survey: SurveyParam = { surveyId, sections };

        try {
            const response = await fetch(`/surveys/_doc/${uuidv4()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(survey),
            });


            const updatedResult = await response.json();
            console.log(updatedResult);
        } catch (error) {
            console.error(error);
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