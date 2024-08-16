import { create } from "zustand";

type UserInfo = {
  otp? : string;
  pk?: number;
  email?: string;
  password?: string;
} | null;

interface RegisterFormState {
    step: number;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    setUserInfo: (userInfo: UserInfo) => void;
    userInfo: UserInfo;
  }


export  const useRegisterFormStore = create<RegisterFormState>((set) => ({
    step:1,
    userInfo:null,
    setUserInfo: (userInfo) => set({ userInfo }),
    setStep: (step: number) => set({ step }),
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),
  }));