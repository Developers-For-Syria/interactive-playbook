import type { OnboardingData } from './types';

interface Props {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
}

const days = [
  { id: 'sat', label: 'سبت' },
  { id: 'sun', label: 'أحد' },
  { id: 'mon', label: 'اثنين' },
  { id: 'tue', label: 'ثلاثاء' },
  { id: 'wed', label: 'أربعاء' },
  { id: 'thu', label: 'خميس' },
  { id: 'fri', label: 'جمعة' },
];

const times = [
  { id: 'morning', icon: 'wb_sunny', label: 'صباحاً' },
  { id: 'afternoon', icon: 'wb_twilight', label: 'ظهراً' },
  { id: 'evening', icon: 'dark_mode', label: 'مساءً' },
];

const durations = [
  { id: '30', label: '30 دقيقة' },
  { id: '45', label: '45 دقيقة' },
  { id: '60', label: '60 دقيقة' },
  { id: '90', label: '90+ دقيقة' },
];

export function StepSchedule({ data, onChange }: Props) {
  const toggleDay = (id: string) => {
    const next = data.preferredDays.includes(id)
      ? data.preferredDays.filter((d) => d !== id)
      : [...data.preferredDays, id];
    onChange({ preferredDays: next });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold leading-[1.3] text-fit-text-primary">أين ومتى تتمرن؟</h1>
        <p className="text-base text-fit-text-secondary mt-2">ساعدنا في تصميم جدول واقعي يناسب نمط حياتك.</p>
      </div>

      {/* Location */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-fit-text-muted mb-3">مكان التمرين المفضل</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'home', icon: 'home', label: 'المنزل' },
            { id: 'gym', icon: 'fitness_center', label: 'النادي الرياضي' },
          ].map((loc) => {
            const selected = data.workoutLocation === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => onChange({ workoutLocation: loc.id })}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all active:scale-[0.98] ${
                  selected
                    ? 'bg-fit-primary-light border-fit-primary-container shadow-md'
                    : 'bg-white border-fit-card-border hover:border-fit-primary-container'
                }`}
              >
                <div className={`w-16 h-16 mb-2 flex items-center justify-center rounded-full transition-transform ${
                  selected ? 'bg-fit-primary-container text-white scale-110' : 'bg-fit-primary-light text-fit-primary-container'
                }`}>
                  <span className="material-symbols-outlined text-3xl">{loc.icon}</span>
                </div>
                <span className={`text-lg font-semibold ${selected ? 'text-fit-primary-container' : 'text-fit-text-primary'}`}>{loc.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Preferred Days */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-fit-text-muted mb-3">أيام التمرين المفضلة</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((d) => {
            const selected = data.preferredDays.includes(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggleDay(d.id)}
                className={`min-w-[56px] py-3 rounded-2xl border-2 text-sm font-semibold transition-all active:scale-95 ${
                  selected
                    ? 'bg-fit-primary-container text-white border-fit-primary-container shadow-md'
                    : 'bg-white text-fit-text-primary border-fit-card-border'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Time */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-fit-text-muted mb-3">الوقت المفضل</h2>
        <div className="flex gap-3">
          {times.map((t) => {
            const selected = data.preferredTime === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onChange({ preferredTime: t.id })}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                  selected
                    ? 'bg-fit-primary-light border-fit-primary-container'
                    : 'bg-white border-fit-card-border'
                }`}
              >
                <span className={`material-symbols-outlined text-2xl ${selected ? 'text-fit-primary-container' : 'text-fit-text-muted'}`}>{t.icon}</span>
                <span className={`text-sm font-semibold ${selected ? 'text-fit-primary-container' : 'text-fit-text-primary'}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Duration */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-fit-text-muted mb-3">مدة الجلسة</h2>
        <div className="grid grid-cols-2 gap-3">
          {durations.map((d) => {
            const selected = data.sessionDuration === d.id;
            return (
              <button
                key={d.id}
                onClick={() => onChange({ sessionDuration: d.id })}
                className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all active:scale-95 ${
                  selected
                    ? 'bg-fit-primary-light border-fit-primary-container text-fit-primary-container'
                    : 'bg-white border-fit-card-border text-fit-text-primary'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
