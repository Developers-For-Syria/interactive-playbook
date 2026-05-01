import type { OnboardingData } from './types';

interface Props {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
}

const conditions = [
  { id: 'diabetes', label: 'سكري' },
  { id: 'blood-pressure', label: 'ضغط الدم' },
  { id: 'heart', label: 'مشاكل قلب' },
  { id: 'joints', label: 'مشاكل مفاصل' },
  { id: 'asthma', label: 'ربو' },
  { id: 'none', label: 'لا يوجد' },
];

export function StepHealth({ data, onChange }: Props) {
  const toggleCondition = (id: string) => {
    if (id === 'none') {
      onChange({ healthConditions: data.healthConditions.includes('none') ? [] : ['none'] });
      return;
    }
    const without = data.healthConditions.filter((c) => c !== 'none');
    const next = without.includes(id) ? without.filter((c) => c !== id) : [...without, id];
    onChange({ healthConditions: next });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold leading-[1.3] text-fit-text-primary mb-2">حالتك الصحية</h1>
        <p className="text-base text-fit-text-secondary">نحتاج هذه المعلومات لضمان سلامتك أثناء التمرين</p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="text-sm font-semibold text-fit-text-primary block mb-3">هل تعاني من أي حالة صحية مزمنة؟</label>
          <div className="flex flex-wrap gap-3">
            {conditions.map((c) => {
              const selected = data.healthConditions.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCondition(c.id)}
                  className={`px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all ${
                    selected
                      ? 'border-fit-primary-container bg-fit-primary-light text-fit-primary-container'
                      : 'border-slate-100 bg-white text-fit-text-secondary hover:border-fit-primary-light'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-fit-text-primary block mb-2">هل تتناول أي أدوية بشكل منتظم؟</label>
          <textarea
            value={data.medications}
            onChange={(e) => onChange({ medications: e.target.value })}
            className="w-full bg-fit-surface border-2 border-slate-100 rounded-xl p-4 text-base text-fit-text-primary placeholder:text-fit-text-muted focus:border-fit-primary-container focus:ring-0 transition-all outline-none"
            placeholder="اذكر الأدوية إن وجدت..."
            rows={2}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-fit-text-primary block mb-2">هل عندك إصابات سابقة أو حالية؟</label>
          <textarea
            value={data.injuries}
            onChange={(e) => onChange({ injuries: e.target.value })}
            className="w-full bg-fit-surface border-2 border-slate-100 rounded-xl p-4 text-base text-fit-text-primary placeholder:text-fit-text-muted focus:border-fit-primary-container focus:ring-0 transition-all outline-none"
            placeholder="مثل: إصابة في الركبة، ألم أسفل الظهر..."
            rows={2}
          />
        </div>

        <div className="p-4 bg-fit-primary-light border-r-4 border-fit-primary-container rounded-lg flex gap-3 items-start">
          <span className="material-symbols-outlined text-fit-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          <p className="text-sm font-semibold text-fit-on-primary-fixed-variant leading-relaxed">هذه البيانات سرية تماماً وتساعد مدربك الذكي على تصميم برنامج رياضي آمن وفعال.</p>
        </div>
      </div>
    </div>
  );
}
