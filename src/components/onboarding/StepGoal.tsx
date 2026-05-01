import type { OnboardingData } from './types';

interface Props {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
}

const goals = [
  { id: 'fitness', emoji: '🏃', label: 'تحسين اللياقة العامة' },
  { id: 'sculpt', emoji: '✨', label: 'شد ونحت الجسم' },
  { id: 'muscle', emoji: '💪', label: 'زيادة الكتلة العضلية' },
  { id: 'fat-loss', emoji: '🔥', label: 'خسارة الدهون' },
];

export function StepGoal({ data, onChange }: Props) {
  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-[26px] font-extrabold leading-[1.3] text-fit-text-primary mb-2">ما هو هدفك الرئيسي؟</h1>
        <p className="text-base text-fit-text-secondary">اختر هدفاً واحداً يعكس طموحك الحقيقي</p>
      </div>
      <div className="space-y-4 mb-8">
        {goals.map((g) => {
          const selected = data.goal === g.id;
          return (
            <button
              key={g.id}
              onClick={() => onChange({ goal: g.id })}
              className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all active:scale-[0.98] ${
                selected
                  ? 'bg-fit-primary-light border-fit-primary-container shadow-[0_8px_20px_rgba(26,86,255,0.12)]'
                  : 'bg-white border-fit-card-border hover:border-fit-primary-container'
              }`}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-2xl ${selected ? 'bg-white' : 'bg-fit-surface'}`}>
                {g.emoji}
              </div>
              <div className="flex-grow text-right">
                <span className={`text-lg font-semibold ${selected ? 'text-fit-primary-container' : 'text-fit-text-primary'}`}>{g.label}</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected ? 'border-fit-primary-container' : 'border-fit-disabled'
              }`}>
                {selected && <div className="w-3 h-3 bg-fit-primary-container rounded-full" />}
              </div>
            </button>
          );
        })}
      </div>
      <div className="space-y-4 mb-8">
        <label className="text-sm font-semibold text-fit-text-primary block px-1">كم المدة التي تريد الوصول فيها لهدفك؟</label>
        <input
          type="text"
          value={data.goalDuration}
          onChange={(e) => onChange({ goalDuration: e.target.value })}
          className="w-full h-14 bg-white border-2 border-fit-card-border rounded-xl px-4 text-base focus:border-fit-primary-container focus:ring-4 focus:ring-fit-primary-light outline-none transition-all text-right"
          placeholder="مثلاً: 3 أشهر"
        />
      </div>
    </div>
  );
}
