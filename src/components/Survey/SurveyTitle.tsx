import React from "react";

interface SurveyTitleProps {
    title: string;
    description?: string;
}
const SurveyTitle: React.FC<SurveyTitleProps> = ({title, description}) => {

    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
        </>
    );
}

export default SurveyTitle;