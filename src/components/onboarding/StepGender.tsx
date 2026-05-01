import type { OnboardingData } from './types';

interface Props {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
}

export function StepGender({ data, onChange }: Props) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full text-right mb-12">
        <h1 className="font-cairo text-[32px] font-extrabold leading-[1.3] text-fit-text-primary mb-2">ما هو جنسك؟</h1>
        <p className="text-lg font-semibold text-fit-text-secondary">ساعدنا نتعرف عليك أكثر</p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <button
          onClick={() => onChange({ gender: 'male' })}
          className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all active:scale-95 relative overflow-hidden ${
            data.gender === 'male'
              ? 'bg-fit-primary-light border-fit-primary-container shadow-[0_8px_30px_rgb(26,86,255,0.12)]'
              : 'bg-white border-fit-card-border hover:border-fit-primary-light'
          }`}
        >
          {data.gender === 'male' && (
            <div className="absolute top-3 left-3 bg-fit-primary-container text-white rounded-full w-6 h-6 flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
            </div>
          )}
          <div className="w-full aspect-[4/5] mb-4 overflow-hidden rounded-lg bg-white/50">
            <img alt="رجل" className={`w-full h-full object-cover ${data.gender !== 'male' ? 'grayscale opacity-70' : 'opacity-90'} transition-all`} src="https://lh3.googleusercontent.com/aida-public/AB6AXuArji0C2PXoj5v9p81G_F8LrcInoW8oX1hSnhfI0_F7Kz5lh3So_x3R1ykCeknVH5a5TrXl1bZxPDrb40pTddhcwpwZKIvU0nIC-iOn4S5c1Kq2qO6F06gVWaZxTXLVBw0GSv5ftrfww84sga6ShRGZ4s7trZXEUru8T7W2HvclZANRsfQ9ShPLBxHRBJXITM97IgR_RYDC1JVTspTuD2bTvt1xQmN1L7BG3lMeZ1YCdz-QDjFBSCENnxNe_fQP3yz1iMN-C0bcXtVS" />
          </div>
          <span className={`text-[22px] font-bold ${data.gender === 'male' ? 'text-fit-primary-container' : 'text-fit-text-primary'}`}>رجل</span>
        </button>
        <button
          onClick={() => onChange({ gender: 'female' })}
          className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all active:scale-95 relative overflow-hidden ${
            data.gender === 'female'
              ? 'bg-fit-primary-light border-fit-primary-container shadow-[0_8px_30px_rgb(26,86,255,0.12)]'
              : 'bg-white border-fit-card-border hover:border-fit-primary-light'
          }`}
        >
          {data.gender === 'female' && (
            <div className="absolute top-3 left-3 bg-fit-primary-container text-white rounded-full w-6 h-6 flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
            </div>
          )}
          <div className="w-full aspect-[4/5] mb-4 overflow-hidden rounded-lg bg-fit-surface">
            <img alt="أنثى" className={`w-full h-full object-cover ${data.gender !== 'female' ? 'grayscale opacity-70' : 'opacity-90'} transition-all`} src="https://lh3.googleusercontent.com/aida-public/AB6AXuB37ecnd92VuNlvT1PMvJ9JsYLQakGpfn7a30by9dGZW3aATiSmlji_gfbkkPm6pj5QBudcJKg0hbz50143DraW8qX1K6UFMI_fMymiTcQUrSl9NlYJiOlEc64NEvcFI7E1bFBfDCr5zLPqevJOfgDaDswTvm3Mcby1S_Wdoi1LgtDRdcgz-jcL1OG6FIdAePUD9Mvlq7NG8YSbpMAPp6AmAhW5BlOKxfFnyIhDBb1ET1F_uB7Zajp0LvVZkF34isPjgAOgjrB6fIH0" />
          </div>
          <span className={`text-[22px] font-bold ${data.gender === 'female' ? 'text-fit-primary-container' : 'text-fit-text-primary'}`}>أنثى</span>
        </button>
      </div>
      <div className="mt-8 w-full p-4 bg-fit-surface-container-low rounded-xl border-r-4 border-fit-primary-container">
        <div className="flex gap-2">
          <span className="material-symbols-outlined text-fit-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          <p className="text-base text-fit-on-surface-variant">يساعدنا تحديد الجنس في ضبط معادلات حرق السعرات الحرارية وتوصيات التمارين بدقة أكبر لجسمك.</p>
        </div>
      </div>
    </div>
  );
}
