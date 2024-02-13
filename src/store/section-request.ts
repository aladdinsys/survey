import { create } from 'zustand';
import {SectionRequest, SectionType} from "@/types/survey";

type SurveyRequest = {
    id: number;

    setId: (id: number) => void;
    setSections: (sections: Array<SectionType>) => void;

    sections: Array<SectionRequest>;
    setQuestion: (sectionId: number, questionId: number, answer: any) => void;
}

const useSectionRequestStore = create<SurveyRequest>((set) => ({
    id: 0,
    sections: [],

    setId: (id: number) => { set({id: id}); },
    setSections: (sections: Array<SectionType>) => {
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
export default useSectionRequestStore;
