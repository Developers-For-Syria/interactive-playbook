import type { OnboardingData } from './types';

interface Props {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
}

export function StepBasicInfo({ data, onChange }: Props) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-[26px] font-extrabold leading-[1.3] text-fit-text-primary mb-2">معلوماتك الأساسية</h2>
        <p className="text-base text-fit-text-secondary">أدخل بياناتك بدقة للحصول على برنامج مناسب</p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-fit-text-secondary mb-2 pr-1">الاسم الكامل</label>
          <div className="relative">
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-white focus:border-fit-primary-container focus:ring-0 transition-all outline-none text-lg font-semibold text-fit-text-primary"
              placeholder="مثال: محمد أحمد"
            />
            <div className="absolute inset-y-0 left-4 flex items-center text-fit-text-muted">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
        </div>
        <div className="bg-fit-surface-container-low p-4 rounded-2xl border border-slate-100 shadow-sm">
          <label className="block text-sm font-semibold text-fit-text-secondary mb-3">العمر</label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={data.age}
              onChange={(e) => onChange({ age: Number(e.target.value) })}
              className="flex-1 h-14 bg-white border-2 border-transparent focus:border-fit-primary-container rounded-xl text-center text-[32px] font-extrabold text-fit-primary-container transition-all outline-none"
            />
            <span className="text-[22px] font-bold text-fit-text-muted">سنة</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm hover:border-fit-primary-light transition-colors">
            <label className="block text-sm font-semibold text-fit-text-secondary mb-2">الطول</label>
            <div className="flex items-baseline gap-1">
              <input
                type="number"
                value={data.height || ''}
                onChange={(e) => onChange({ height: Number(e.target.value) })}
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-[26px] font-extrabold text-fit-text-primary text-center"
                placeholder="170"
              />
              <span className="text-fit-text-muted text-sm font-semibold">سم</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm hover:border-fit-primary-light transition-colors">
            <label className="block text-sm font-semibold text-fit-text-secondary mb-2">الوزن الحالي</label>
            <div className="flex items-baseline gap-1">
              <input
                type="number"
                value={data.weight || ''}
                onChange={(e) => onChange({ weight: Number(e.target.value) })}
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-[26px] font-extrabold text-fit-text-primary text-center"
                placeholder="75"
              />
              <span className="text-fit-text-muted text-sm font-semibold">كغ</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-fit-primary-light border-r-4 border-fit-primary-container rounded-lg flex gap-3">
          <span className="material-symbols-outlined text-fit-primary-container">info</span>
          <p className="text-sm font-semibold text-fit-on-primary-fixed-variant">هذه البيانات تساعدنا في حساب السعرات الحرارية بدقة وتصميم خطة تمرين آمنة لك.</p>
        </div>
      </div>
    </div>
  );
}
