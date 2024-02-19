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
    'FIVE-LIKERT' | 'BOOLEAN' | 'SHORT' | 'ESSAY' | 'MULTIPLE_CHOICE' | '';

export type Question = {
    id: string;
    type: QuestionType;
    question_text: string;
    options: Array<Option>;
    description: string;
}

export type Option = {
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