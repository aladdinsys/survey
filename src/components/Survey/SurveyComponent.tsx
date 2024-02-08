'use client';

import React, {FC} from "react";
import ProceedButton from "@/components/Survey/ProceedButton";
import SurveyTitle from "@/components/Survey/SurveyTitle";
import Section from "@/components/Survey/Section/Section";
import type {SurveyResponse} from "@/apis/interfaces/survey";
import {SectionRequest} from "@/types/survey";

interface SurveyProps {
    survey: SurveyResponse;
}
const SurveyComponent: FC<SurveyProps> = ({survey}) => {


    const onSubmit = () => {

    }

    const onSectionChange = (section: SectionRequest) => {

        console.log(section);
    }

    return (
        <>
            <SurveyTitle title={survey.title} description={survey.description}>

            </SurveyTitle>
            <Section sections={JSON.parse(survey.content)} onSectionChange={onSectionChange} >

            </Section>
            <ProceedButton text={"보내기"} handle={onSubmit}/>
        </>
    );
}

export default SurveyComponent;