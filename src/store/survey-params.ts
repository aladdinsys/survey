import { create } from 'zustand';
import {SectionParam, Section} from "@/types/survey";

type SurveyParam = {
    id: number;

    setSurveyId: (id: number) => void;
    setSections: (sections: Array<Section>) => void;

    sections: Array<SectionParam>;
    setQuestion: (sectionId: number, questionId: number, answer: any) => void;
}

const useSurveyParamStore = create<SurveyParam>((set) => ({
    id: 0,
    sections: [],

    setSurveyId: (id: number) => { set({id: id}); },
    setSections: (sections: Array<Section>) => {
        set({sections: sections.map((section) => ({id: section.id, questions: section.questions.map((question) => ({id: question.id, answer: null}))}))});
    },
    setQuestion: (sectionId: number, questionId: number, answer: any) => {
        set((state) => ({
            sections: state.sections.map((s) => {
                if (s.id === sectionId) {
                    return {
                        ...s,
                        questions: s.questions.map((q) => {
                            if (q.id === questionId) {
                                return {
                                    ...q,
                                    answer,
                                };
                            }
                            return q;
                        }),
                    };
                }
                return s;
            }),
        })
        );
    }
}));
export default useSurveyParamStore;
