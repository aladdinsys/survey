import React from "react";
import {get} from "@/services/fetch";
import {Response} from "@/services/types/response";
import {SurveyResponse} from "@/services/types/survey-response";
import SurveyComponent from "@/components/Survey/SurveyComponent";

export default async function Page() {

    const response: Response<SurveyResponse> = await get<Response<SurveyResponse>>(`/open-api/survey/ba68cd2c-ce90-4174-9691-b746c24cfae0`);
    const surveyResponse: SurveyResponse = response.result;

    return (
        <>
            <SurveyComponent survey={surveyResponse}/>
        </>
    );
}
