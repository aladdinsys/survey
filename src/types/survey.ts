export type SurveyType = {
    id: number;
    title: string;
    sections: Section[];
    description: string;
}

export type Section = {
    id: number;
    title: string;
    questions: Question[];
    description: string;
}

export type QuestionType =
    'FIVE-LIKERT' | 'BOOLEAN' | 'SHORT' | 'ESSAY' | 'MULTIPLE_CHOICE' | '';

export type Question = {
    id: number;
    type: QuestionType;
    question_text: string;
    options: Array<any>;
    description: string;
}

export type Option = {
    label: string;
    value: any;
}

export type MultipleChoiceOption = Option & {
    nextSection?: string;
}







export type SurveyParam = {
    id: number;
    sections: Array<SectionParam>;
}

export type SectionParam = {
    id: number;
    questions: Array<QuestionParam>;
}

export type QuestionParam = {
    id: number;
    answer: any;
}