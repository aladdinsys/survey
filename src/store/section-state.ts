import { create } from 'zustand';

type SectionState = {
    currentSection: string;
    prevSections: string[];

    setCurrentSection: (currentSection: string) => void;

    addPrevSection: (section: string) => void;
    setPrevSections: (prevSections: string[]) => void;
};

const useSectionStateStore = create<SectionState>((set) => ({
    currentSection: '1',
    prevSections: [],

    setCurrentSection: (currentSection: string) => set({ currentSection }),
    addPrevSection: (section: string) => set((state) => ({
        prevSections: [...state.prevSections, section]
    })),

    setPrevSections: (prevSections: string[]) => set({ prevSections }),

}));

export default useSectionStateStore;
