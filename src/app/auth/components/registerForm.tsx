"use client";

import React from "react";

import { Progress } from "@/components/ui/progress";


import { useRegisterFormStore } from "../stores/useRegisterFormStore";
import { OnBoardingStepForm } from "./onbordingStepForm";
import { SetPasswordStepForm } from "./setPasswordStepForm";
import { ConfirmOTPStepForm } from "./confirmOTPstepForm";
import { RegisterEmailStepForm } from "./registerEmailStep";



export const RegisterForm = () => {
  const step = useRegisterFormStore((state) => state.step);

  const progress = (step / 4) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RegisterEmailStepForm />;
      case 2:
        return <ConfirmOTPStepForm />;
      case 3:
        return <SetPasswordStepForm />;
      case 4:
        return <OnBoardingStepForm />;
    }
  };

  return (
    <div>
      {renderStep()}
      <div className="mt-8 w-full">
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
};

export default RegisterForm;