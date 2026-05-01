import type { OnboardingData } from './types';

interface Props {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
}

const levels = [
  { id: 'beginner', emoji: '🌱', label: 'مبتدئ', desc: 'لم أتمرن من قبل أو توقفت لفترة طويلة' },
  { id: 'intermediate', emoji: '⚡', label: 'متوسط', desc: 'أقوم بالتمارين بشكل متقطع (3-6 أشهر)' },
  { id: 'advanced', emoji: '🏆', label: 'متقدم', desc: 'أتدرب بانتظام منذ أكثر من سنة' },
];

export function StepFitnessLevel({ data, onChange }: Props) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold leading-[1.3] text-fit-text-primary">ما هو مستواك الرياضي الحالي؟</h1>
        <p className="text-base text-fit-text-secondary mt-2">سنقوم بتخصيص خطتك التدريبية بناءً على خبرتك الحالية.</p>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        {levels.map((l) => {
          const selected = data.fitnessLevel === l.id;
          return (
            <button
              key={l.id}
              onClick={() => onChange({ fitnessLevel: l.id })}
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all active:scale-[0.98] ${
                selected
                  ? 'bg-fit-primary-light border-fit-primary-container shadow-[0_8px_20px_rgba(26,86,255,0.12)]'
                  : 'bg-white border-fit-card-border hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl ${
                  selected ? 'bg-fit-primary-container text-white' : 'bg-fit-primary-light'
                }`}>{l.emoji}</div>
                <div className="text-right">
                  <h3 className={`text-lg font-semibold ${selected ? 'text-fit-primary-container' : 'text-fit-text-primary'}`}>{l.label}</h3>
                  <p className={`text-sm font-semibold ${selected ? 'text-fit-primary-dark' : 'text-fit-text-muted'}`}>{l.desc}</p>
                </div>
              </div>
              {selected && <span className="material-symbols-outlined text-fit-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            </button>
          );
        })}
      </div>

      <div className="bg-fit-primary-container/5 border-r-4 border-fit-primary-container p-4 rounded-lg flex gap-4 items-start mb-8">
        <span className="material-symbols-outlined text-fit-primary-container">info</span>
        <p className="text-sm font-semibold text-fit-on-surface-variant">اختيار المستوى الصحيح يساعدنا في حمايتك من الإصابات وتحقيق نتائج أسرع.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-lg font-semibold text-fit-text-primary block mb-2">هل سبق والتزمت ببرنامج تدريبي من قبل؟</label>
          <div className="flex bg-fit-surface-container-low p-1 rounded-full w-full border border-fit-card-border">
            <button
              onClick={() => onChange({ hadProgram: true })}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                data.hadProgram === true ? 'bg-fit-primary-container text-white shadow-sm' : 'text-fit-text-secondary hover:text-fit-text-primary'
              }`}
            >نعم، فعلت</button>
            <button
              onClick={() => onChange({ hadProgram: false })}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                data.hadProgram === false ? 'bg-fit-primary-container text-white shadow-sm' : 'text-fit-text-secondary hover:text-fit-text-primary'
              }`}
            >لا، هذه أول مرة</button>
          </div>
        </div>

        <div>
          <label className="text-lg font-semibold text-fit-text-primary block mb-2">كم يوم تتمرن حالياً في الأسبوع؟</label>
          <div className="flex items-center justify-between bg-white border-2 border-fit-card-border p-3 rounded-2xl">
            <button
              onClick={() => onChange({ weeklyDays: Math.min(7, data.weeklyDays + 1) })}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-fit-primary-light text-fit-primary-container active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[22px] font-bold text-fit-primary-container leading-none">{data.weeklyDays}</span>
              <span className="text-xs font-bold tracking-wider text-fit-text-muted">أيام</span>
            </div>
            <button
              onClick={() => onChange({ weeklyDays: Math.max(0, data.weeklyDays - 1) })}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-fit-text-muted active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
