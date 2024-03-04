export type SurveyType = {
    id: string;
    title: string;
    sections: Section[];
    description: string;
}

export type Section = {
    id: string;
    title: string;
    questions: Question[];
    description: string;
}

export type QuestionType =
    'FIVE-LIKERT' | 'BOOLEAN' |
    'SHORT_ANSWER' | 'LONG_ANSWER' |
    'SINGLE_SELECTION' | 'MULTIPLE_SELECTION' |
    'MAP' |
    '';

export type Question = {
    id: string;
    type: QuestionType;
    question_text: string;
    answers: Array<Answer>;
    description: string;
    options?: Options;
}

export type Options = {
    coordinates?: [number, number];
}

export type Answer = {
    label: string;
    value: string;
    nextSection?: string;
}

export type SurveyParam = {
    surveyId: string;
    sections: SectionParam;
}

export type SectionParam = {
    [key: string]: QuestionParam;
}

export type QuestionParam = {
    [key: string]: any;
}