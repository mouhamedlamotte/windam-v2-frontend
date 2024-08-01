import { create } from "zustand";

interface RegisterFormState {
    step: number;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
  }


export  const useRegisterFormStore = create<RegisterFormState>((set) => ({
    step:1,
    setStep: (step: number) => set({ step }),
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),
  }));