import React from "react";
import {get} from "@/apis/fetch";
import {Response} from "@/apis/interfaces/response";
import {SurveyResponse} from "@/apis/interfaces/survey";
import SurveyComponent from "@/components/Survey/SurveyComponent";


const Survey = async (props: any) => {

    const response: Response<SurveyResponse> = await get<Response<SurveyResponse>>(`/open-api/survey/${props.params.id}`);
    const surveyResponse: SurveyResponse = response.result;

    return (
        <SurveyComponent survey={surveyResponse}/>
    );
}
export default Survey;