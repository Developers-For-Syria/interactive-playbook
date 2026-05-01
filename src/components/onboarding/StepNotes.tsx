import type { OnboardingData } from './types';

interface Props {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
}

export function StepNotes({ data, onChange }: Props) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold leading-[1.3] text-fit-text-primary mb-2">ملاحظات إضافية</h1>
        <p className="text-base text-fit-text-secondary">أي تفاصيل إضافية تساعدنا في تخصيص برنامجك</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-fit-text-primary block mb-2">في شيء تريد أن نركز عليه أكثر؟</label>
          <textarea
            value={data.focusNotes}
            onChange={(e) => onChange({ focusNotes: e.target.value })}
            className="w-full min-h-[120px] p-4 rounded-xl border-2 border-slate-100 bg-white focus:border-fit-primary-container focus:ring-0 transition-all text-base placeholder:text-fit-text-muted outline-none"
            placeholder="مثلاً: تقوية عضلات الظهر، تحسين المرونة..."
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-fit-text-primary block mb-2">القياسات الحالية (اختياري)</label>
          <div className="relative">
            <input
              type="text"
              value={data.measurements}
              onChange={(e) => onChange({ measurements: e.target.value })}
              className="w-full p-4 pr-12 rounded-xl border-2 border-slate-100 bg-white focus:border-fit-primary-container focus:ring-0 transition-all text-base placeholder:text-fit-text-muted outline-none"
              placeholder="الخصر، الصدر، الأرداف (سم)"
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-fit-text-muted">straighten</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-fit-text-primary block mb-2">أي تفاصيل أخرى تريد إضافتها؟</label>
          <textarea
            value={data.additionalNotes}
            onChange={(e) => onChange({ additionalNotes: e.target.value })}
            className="w-full min-h-[100px] p-4 rounded-xl border-2 border-slate-100 bg-white focus:border-fit-primary-container focus:ring-0 transition-all text-base placeholder:text-fit-text-muted outline-none"
            placeholder="أي ملاحظات صحية أو رياضية أخرى..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(26,86,255,0.04)] border border-slate-50 flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-fit-primary-light flex items-center justify-center text-fit-primary-container">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <h3 className="text-sm font-semibold text-fit-text-primary">دعم مستمر</h3>
            <p className="text-xs font-bold text-fit-text-muted">فريقنا معك في كل خطوة</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(26,86,255,0.04)] border border-slate-50 flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-fit-primary-light flex items-center justify-center text-fit-primary-container">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <h3 className="text-sm font-semibold text-fit-text-primary">تحليل دقيق</h3>
            <p className="text-xs font-bold text-fit-text-muted">خطة مفصلة بناءً على بياناتك</p>
          </div>
        </div>
      </div>
    </div>
  );
}
