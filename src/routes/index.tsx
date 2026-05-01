import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TopAppBar } from "../components/onboarding/TopAppBar";
import { ProgressBar } from "../components/onboarding/ProgressBar";
import { BottomCTA } from "../components/onboarding/BottomCTA";
import { StepGender } from "../components/onboarding/StepGender";
import { StepBasicInfo } from "../components/onboarding/StepBasicInfo";
import { StepFocusArea } from "../components/onboarding/StepFocusArea";
import { StepGoal } from "../components/onboarding/StepGoal";
import { StepFitnessLevel } from "../components/onboarding/StepFitnessLevel";
import { StepSchedule } from "../components/onboarding/StepSchedule";
import { StepDiet } from "../components/onboarding/StepDiet";
import { StepHealth } from "../components/onboarding/StepHealth";
import { StepLifestyle } from "../components/onboarding/StepLifestyle";
import { StepNotes } from "../components/onboarding/StepNotes";
import { StepSuccess } from "../components/onboarding/StepSuccess";
import { initialData, type OnboardingData } from "../components/onboarding/types";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "FitnessOnboarding - برنامجك الرياضي المخصص" },
      { name: "description", content: "أجب على بعض الأسئلة وسنصمم لك برنامج لياقة بدنية مخصص" },
    ],
  }),
});

const TOTAL_STEPS = 11;

function Index() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [direction, setDirection] = useState(1);

  const onChange = useCallback((partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const next = () => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;
  const isSuccess = step === TOTAL_STEPS - 1;

  const ctaLabels = [
    'التالي', 'التالي', 'التالي', 'التالي', 'التالي',
    'التالي', 'التالي', 'التالي', 'التالي', 'التالي',
    'إرسال البيانات',
  ];

  const steps = [
    <StepGender key="gender" data={data} onChange={onChange} />,
    <StepBasicInfo key="basic" data={data} onChange={onChange} />,
    <StepFocusArea key="focus" data={data} onChange={onChange} />,
    <StepGoal key="goal" data={data} onChange={onChange} />,
    <StepFitnessLevel key="level" data={data} onChange={onChange} />,
    <StepSchedule key="schedule" data={data} onChange={onChange} />,
    <StepDiet key="diet" data={data} onChange={onChange} />,
    <StepHealth key="health" data={data} onChange={onChange} />,
    <StepLifestyle key="lifestyle" data={data} onChange={onChange} />,
    <StepNotes key="notes" data={data} onChange={onChange} />,
    <StepSuccess key="success" />,
  ];

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-fit-surface font-cairo antialiased flex flex-col items-center">
      <ProgressBar progress={progress} />
      <TopAppBar
        onBack={step > 0 && !isSuccess ? back : undefined}
        onSkip={!isSuccess ? next : undefined}
        showBack={step > 0 && !isSuccess}
      />
      <main className="w-full max-w-[480px] mt-16 px-5 pt-12 pb-32 flex-grow">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomCTA
        label={isSuccess ? 'إرسال البيانات' : 'التالي'}
        onClick={isSuccess ? () => alert('تم إرسال البيانات بنجاح! 🎉') : next}
      />
    </div>
  );
}
