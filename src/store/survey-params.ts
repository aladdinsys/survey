import { create } from 'zustand';
import {SectionParam, Section, QuestionParam} from "@/types/survey";

type SurveyParam = {
    surveyId: string;

    setSurveyId: (id: string) => void;
    setSections: (sections: Array<Section>) => void;

    sections: SectionParam;
    setQuestion: (sectionId: string, questionId: string, answer: string) => void;
}

const useSurveyParamStore = create<SurveyParam>((set) => ({
    surveyId: '',
    sections: {},

    setSurveyId: (id: string) => { set({surveyId: id}); },
    setSections: (sections: Array<Section>) => {
        set({
            sections: sections.reduce((prevSectionParam: SectionParam, section) => {
                prevSectionParam[section.id] = section.questions.reduce((prevQuestionParam: QuestionParam, question) => {
                    prevQuestionParam[question.id] = null;
                    return prevQuestionParam;
                }, {});
                return prevSectionParam;
            }, {})
        });
    },
    setQuestion: (sectionId: string, questionId: string, answer: string) => {
        set((state) => {
            const newSections = {...state.sections};
            newSections[sectionId][questionId] = answer;
            return {sections: newSections};
        });
    }
}));
export default useSurveyParamStore;
