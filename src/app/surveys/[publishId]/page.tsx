import React, {Suspense} from "react";
import {get} from "@/services/fetch";
import {Response} from "@/services/types/response";
import {SurveyResponse} from "@/services/types/survey-response";
import SurveyComponent from "@/components/Survey/SurveyComponent";

type Params = {
    params: {
        publishId: string;
    }
}

export default async function Survey({ params: { publishId } }: Params) {

    const response: Response<SurveyResponse> = await get<Response<SurveyResponse>>(`/open-api/survey/${publishId}`);
    const surveyResponse: SurveyResponse = response.result;

    return (
        <>
            <Suspense fallback={<div className={"w-full h-full bg-red-300"}>Loading...</div>}>
                <SurveyComponent survey={surveyResponse}/>
            </Suspense>
        </>

    );
}
