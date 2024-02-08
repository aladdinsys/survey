import { create } from 'zustand';

type SectionState = {
    currentSection: number;
    prevSection: number;
    nextSection: number;
    lastSection: number;

    setPrevSection: (prevSection: number) => void;
    setLastSection: (lastSection: number) => void;
    setNextSection: (nextSection: number) => void;

    toPrevSection: () => void;
    toNextSection: () => void;
};

const useSectionStore = create<SectionState>((set) => ({
    currentSection: 0,
    prevSection: 0,
    nextSection: 1,
    lastSection: 10,

    setPrevSection: (prevSection: number) => set({ prevSection }),
    setLastSection: (lastSection: number) => set({ lastSection }),
    setNextSection: (nextSection: number) => set({ nextSection }),

    toPrevSection: () =>
        set((state) => ({
            currentSection: state.prevSection,
            prevSection: state.prevSection,
        })),
    toNextSection: () =>
        set((state) => ({
            currentSection: state.nextSection,
            prevSection: state.currentSection,
            nextSection: state.nextSection + 1,
        })),
}));

export default useSectionStore;
