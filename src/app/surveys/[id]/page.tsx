import React from "react";
import {get} from "@/services/fetch";
import {Response} from "@/services/types/response";
import {SurveyResponse} from "@/services/types/survey-response";
import SurveyComponent from "@/components/Survey/SurveyComponent";

const Survey = async (props: any) => {

    const response: Response<SurveyResponse> = await get<Response<SurveyResponse>>(`/open-api/survey/${props.params.id}`);
    const surveyResponse: SurveyResponse = response.result;

    return (
        <SurveyComponent survey={surveyResponse}/>
    );
}
export default Survey;