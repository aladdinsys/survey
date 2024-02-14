import { create } from 'zustand';
import {SectionParam, Section, QuestionParam} from "@/types/survey";

type SurveyParam = {
    id: number;

    setSurveyId: (id: number) => void;
    setSections: (sections: Array<Section>) => void;

    sections: Array<SectionParam>;
    setQuestion: (sectionId: number, questionId: number, answer: string) => void;
}

const useSurveyParamStore = create<SurveyParam>((set) => ({
    id: 0,
    sections: [],

    setSurveyId: (id: number) => { set({id: id}); },
    setSections: (sections: Array<Section>) => {
        set({sections: sections.map((section) => ({id: section.id, questions: section.questions.map((question) => ({id: question.id, answer: null}))}))});
    },
    setQuestion: (sectionId: number, questionId: number, answer: string) => {
        set((state) => ({
            sections: state.sections.map((sectionParam) => {
                if (sectionParam.id === sectionId) {
                    return {
                        ...sectionParam,
                        questions: sectionParam.questions.map((questionParam: QuestionParam) => {
                            if (questionParam.id === questionId) {
                                return {
                                    ...questionParam,
                                    answer,
                                };
                            }
                            return questionParam;
                        }),
                    };
                }
                return sectionParam;
            }),
        })
        );
    }
}));
export default useSurveyParamStore;
