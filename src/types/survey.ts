export type SurveyType = {
    id: number;
    title: string;
    sections: SectionType[];
    description: string;
}

export type SectionType = {
    id: number;
    title: string;
    questions: QuestionType[];
    description: string;
}

export type QuestionTypeConstant =
    'FIVE-LIKERT' | 'BOOLEAN' | 'SHORT' | 'ESSAY' | 'MULTIPLE_CHOICE' | '';

export type QuestionType = {
    id: number;
    type: QuestionTypeConstant;
    question_text: string;
    options: Array<any>;
    description: string;
}

export type MultipleChoiceOption = {
    value: any;
    label: string;
    nextSection?: string;
}

export type SurveyRequest = {
    id: number;
    sections: Array<SectionRequest>;
}

export type SectionRequest = {
    id: number;
    questions: Array<QuestionRequest>;
}

export type QuestionRequest = {
    id: number;
    answer: any;
}