import { create } from 'zustand';

type SectionState = {
    currentSection: number;
    prevSections: number[];

    setCurrentSection: (currentSection: number) => void;
    addPrevSection: (prevSection: number[]) => void;
};

const useSectionStateStore = create<SectionState>((set) => ({
    currentSection: 1,
    prevSections: [],

    setCurrentSection: (currentSection: number) => set({ currentSection }),
    addPrevSection: (prevSection: number[]) => set({ prevSections: [...prevSection] }),

}));

export default useSectionStateStore;
