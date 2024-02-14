import { create } from 'zustand';

type SectionState = {
    currentSection: number;
    prevSections: number[];

    setCurrentSection: (currentSection: number) => void;

    addPrevSection: (section: number) => void;
    setPrevSections: (prevSections: number[]) => void;
};

const useSectionStateStore = create<SectionState>((set) => ({
    currentSection: 1,
    prevSections: [],

    setCurrentSection: (currentSection: number) => set({ currentSection }),
    addPrevSection: (section: number) => set((state) => ({
        prevSections: [...state.prevSections, section]
    })),

    setPrevSections: (prevSections: number[]) => set({ prevSections }),

}));

export default useSectionStateStore;
