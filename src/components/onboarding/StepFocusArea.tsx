import type { OnboardingData } from './types';

interface Props {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
}

const areas = [
  { id: 'full', label: 'الجسم كامل' },
  { id: 'arms', label: 'الذراعين' },
  { id: 'chest', label: 'الصدر' },
  { id: 'abs', label: 'البطن' },
  { id: 'legs', label: 'الأرجل' },
  { id: 'back', label: 'الظهر' },
];

export function StepFocusArea({ data, onChange }: Props) {
  const toggle = (id: string) => {
    const next = data.focusAreas.includes(id)
      ? data.focusAreas.filter((a) => a !== id)
      : [...data.focusAreas, id];
    onChange({ focusAreas: next });
  };

  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <h1 className="text-[26px] font-extrabold leading-[1.3] text-fit-text-primary mb-2">اختر المنطقة التي تريد التركيز عليها</h1>
        <p className="text-base text-fit-text-secondary">يمكنك اختيار أكثر من خيار</p>
      </div>
      <div className="grid grid-cols-12 gap-4 items-start">
        <div className="col-span-7 flex flex-col gap-3">
          {areas.map((area) => {
            const selected = data.focusAreas.includes(area.id);
            return (
              <button
                key={area.id}
                onClick={() => toggle(area.id)}
                className={`relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                  selected
                    ? 'bg-white border-fit-primary-container shadow-[0_4px_12px_rgba(26,86,255,0.08)]'
                    : 'bg-white border-transparent hover:border-fit-primary-light'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selected ? 'border-fit-primary-container bg-fit-primary-container' : 'border-fit-card-border'
                  }`}>
                    {selected && <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'wght' 700" }}>check</span>}
                  </div>
                  <span className={`text-lg font-semibold ${selected ? 'text-fit-primary-container' : 'text-fit-text-primary'}`}>{area.label}</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="col-span-5 relative flex justify-center pt-4">
          <div className="relative w-full max-w-[160px]">
            <img alt="Body Silhouette" className="w-full h-auto opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5FS0x0g4zZcIEuXJ0R2FZNhGnBBEWGrB4fscRrbwG8RTpCT-HyGtzuB4_bI-mSMX-RlT0hDVTxgrjm7Xvvs0c9a5-BhvywCP_O3JYu7ksOHPR_0EStuXYpC9ADtmpIaHc_3XASSikNXpRSAGrtyQ_1GolIl9h7btS2ihXK8gjoc7G5mcyzHGDV5Fg1yeeW0lM0GyMurQhp3DWOpk56P5BYHj2ho3njmApxaKroqgLh97PRqk7ZqtZBeSO1SsqNrVsplNKNrcNLoOp" />
            <div className="absolute top-[20%] left-0 w-3 h-3 bg-fit-primary-container rounded-full ring-4 ring-fit-primary-light/50" />
            <div className="absolute top-[40%] left-[20%] w-3 h-3 bg-fit-primary-container rounded-full ring-4 ring-fit-primary-light/50" />
            <div className="absolute top-[65%] left-[40%] w-3 h-3 bg-fit-primary-container rounded-full ring-4 ring-fit-primary-light/50" />
          </div>
        </div>
      </div>
      <div className="mt-6 bg-fit-primary-light/30 border-r-4 border-fit-primary-container p-4 rounded-xl flex items-start gap-3">
        <span className="material-symbols-outlined text-fit-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
        <p className="text-sm font-semibold text-fit-primary-dark">سيقوم مدربنا الذكي بتصميم خطة تمارين تستهدف المناطق المختارة لضمان أفضل النتائج.</p>
      </div>
    </div>
  );
}
