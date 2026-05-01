import type { OnboardingData } from './types';

interface Props {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
}

const dietOptions = [
  { id: 'keto', label: 'كيتو' },
  { id: 'vegan', label: 'نباتي' },
  { id: 'fasting', label: 'صيام متقطع' },
  { id: 'none', label: 'لا يوجد' },
  { id: 'other', label: 'أخرى' },
];

export function StepDiet({ data, onChange }: Props) {
  const toggleDiet = (id: string) => {
    const next = data.dietTypes.includes(id)
      ? data.dietTypes.filter((d) => d !== id)
      : [...data.dietTypes, id];
    onChange({ dietTypes: next });
  };

  return (
    <div className="w-full">
      <section className="mb-8 text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-fit-primary-light rounded-full opacity-50 blur-xl" />
          <div className="relative w-full h-full bg-white rounded-3xl shadow-lg flex items-center justify-center border border-fit-primary-light">
            <span className="material-symbols-outlined text-fit-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
          </div>
        </div>
        <h1 className="text-[26px] font-extrabold leading-[1.3] text-fit-text-primary mb-2">نمطك الغذائي</h1>
        <p className="text-base text-fit-text-secondary">معلوماتك الغذائية تساعدنا نصمم برنامج متكامل</p>
      </section>

      <div className="space-y-8">
        <div>
          <label className="text-sm font-semibold text-fit-text-primary block mb-2 px-1">كيف تصف نظام أكلك الحالي؟</label>
          <textarea
            value={data.dietDescription}
            onChange={(e) => onChange({ dietDescription: e.target.value })}
            className="w-full bg-fit-surface border-2 border-slate-100 rounded-xl p-4 text-base text-fit-text-primary placeholder:text-fit-text-muted focus:border-fit-primary-container focus:ring-0 transition-all outline-none"
            placeholder="مثلاً: أعتمد على الوجبات السريعة، أو أطبخ في المنزل غالباً..."
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-fit-text-primary block mb-2 px-1">كم وجبة تأكل باليوم؟</label>
          <div className="flex items-center justify-between bg-fit-surface-container-low p-2 rounded-2xl border-2 border-slate-50">
            <button
              onClick={() => onChange({ mealsPerDay: Math.min(10, data.mealsPerDay + 1) })}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-fit-primary-container active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[22px] font-bold text-fit-primary-container">{data.mealsPerDay}</span>
              <span className="text-base text-fit-text-secondary">وجبات</span>
            </div>
            <button
              onClick={() => onChange({ mealsPerDay: Math.max(1, data.mealsPerDay - 1) })}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-fit-text-muted active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-fit-text-primary block mb-2 px-1">هل تتبع نظاماً غذائياً معيناً؟</label>
          <div className="flex flex-wrap gap-3">
            {dietOptions.map((opt) => {
              const selected = data.dietTypes.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleDiet(opt.id)}
                  className={`inline-flex items-center px-6 py-2 rounded-full border-2 text-sm font-semibold cursor-pointer transition-all ${
                    selected
                      ? 'border-fit-primary-container bg-fit-primary-light text-fit-primary-container'
                      : 'border-slate-100 bg-white text-fit-text-secondary'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-fit-text-primary block mb-2 px-1">هل عندك حساسية أو أطعمة لا تتناولها؟</label>
          <textarea
            value={data.allergies}
            onChange={(e) => onChange({ allergies: e.target.value })}
            className="w-full bg-fit-surface border-2 border-slate-100 rounded-xl p-4 text-base text-fit-text-primary placeholder:text-fit-text-muted focus:border-fit-primary-container focus:ring-0 transition-all outline-none"
            placeholder="مثل: المكسرات، اللاكتوز، الأسماك..."
            rows={2}
          />
        </div>

        <div className="p-4 bg-white rounded-2xl border-r-4 border-fit-primary-container shadow-sm flex gap-4 items-start">
          <span className="material-symbols-outlined text-fit-primary-container mt-1">lightbulb</span>
          <p className="text-sm font-semibold text-fit-on-surface-variant leading-relaxed">تخصيص وجباتك حسب تفضيلاتك يزيد من التزامك بالبرنامج بنسبة ٤٠٪ أسرع!</p>
        </div>
      </div>
    </div>
  );
}
