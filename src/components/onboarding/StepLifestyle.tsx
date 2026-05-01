import type { OnboardingData } from './types';

interface Props {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
}

export function StepLifestyle({ data, onChange }: Props) {
  return (
    <div className="w-full">
      <div className="mb-10 text-right">
        <h1 className="text-[26px] font-extrabold leading-[1.3] text-fit-text-primary mb-2">نمط حياتك</h1>
        <p className="text-base text-fit-text-secondary">التفاصيل اليومية تؤثر على نتائجك</p>
      </div>

      <div className="mb-10 rounded-3xl overflow-hidden shadow-lg border border-fit-card-border bg-white p-2">
        <img alt="Lifestyle" className="w-full h-40 object-cover rounded-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuVuVr8dptKv45-qJaAOJmEr3M2hhoM0gy8ocMfJMV2vTdQUPQq6XhIgWjPcbJTnyoBpASxih1zFk1J0hlmBM7eAQgJdeI450V5DvvuktjVtwgbjn-kZI-4Ovfyb4ODdDJfYzu-7R9J-nKO95VVT3s7EJ3AjOEVhh-V8N0_qAyMw_xpYRfEVdjQk4cUOWmoIfCzUfn1ovVoY-I2wmF76d8lrmG-lGDBba6l8yCJ4g7mC61JJWDsFlwXI7rzOMX8NoYR3cVJH7S9AOk" />
      </div>

      {/* Sleep */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-fit-text-primary mb-2">كم ساعة تنام يومياً؟</h3>
        <div className="bg-white rounded-2xl p-6 border border-fit-card-border shadow-sm flex items-center justify-between">
          <button
            onClick={() => onChange({ sleepHours: Math.min(12, data.sleepHours + 1) })}
            className="w-12 h-12 rounded-full border-2 border-fit-primary-container text-fit-primary-container flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <div className="text-center">
            <span className="text-[32px] font-extrabold text-fit-primary-container block">{data.sleepHours}</span>
            <span className="text-sm font-semibold text-fit-text-muted">ساعات</span>
          </div>
          <button
            onClick={() => onChange({ sleepHours: Math.max(1, data.sleepHours - 1) })}
            className="w-12 h-12 rounded-full border-2 border-fit-disabled text-fit-disabled flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
        </div>
      </section>

      {/* Work Nature */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-fit-text-primary mb-2">طبيعة عملك؟</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'office', emoji: '💼', label: 'مكتبي' },
            { id: 'active', emoji: '🚶', label: 'نشاط وحركة' },
          ].map((w) => {
            const selected = data.workNature === w.id;
            return (
              <button
                key={w.id}
                onClick={() => onChange({ workNature: w.id })}
                className={`rounded-2xl p-6 text-center flex flex-col items-center gap-2 border-2 transition-colors ${
                  selected
                    ? 'bg-fit-primary-light border-fit-primary-container shadow-md'
                    : 'bg-white border-fit-card-border hover:border-fit-primary-light'
                }`}
              >
                <div className="text-3xl">{w.emoji}</div>
                <span className={`text-sm font-semibold ${selected ? 'text-fit-primary-container' : 'text-fit-text-secondary'}`}>{w.label}</span>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  selected ? 'bg-fit-primary-container' : 'border border-fit-disabled'
                }`}>
                  {selected && <span className="material-symbols-outlined text-[12px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Stress */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-fit-text-primary">مستوى التوتر لديك</h3>
          <span className="text-[22px] font-bold text-fit-primary-container">{data.stressLevel}</span>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-fit-card-border shadow-sm">
          <input
            type="range"
            min={1}
            max={10}
            value={data.stressLevel}
            onChange={(e) => onChange({ stressLevel: Number(e.target.value) })}
            className="mb-2 w-full"
          />
          <div className="flex justify-between w-full text-sm font-semibold text-fit-text-muted">
            <span>مرتفع</span>
            <span>منخفض</span>
          </div>
        </div>
      </section>

      <div className="bg-fit-primary-light border-r-4 border-fit-primary-container p-4 rounded-lg flex gap-4 items-start">
        <span className="material-symbols-outlined text-fit-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
        <p className="text-sm font-semibold text-fit-on-primary-fixed-variant leading-relaxed">النوم الكافي وإدارة التوتر يساعدان جسمك على التعافي وحرق الدهون بشكل أكثر كفاءة.</p>
      </div>
    </div>
  );
}
