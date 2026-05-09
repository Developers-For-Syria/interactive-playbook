import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { initialData, type OnboardingData } from "../components/onboarding/types";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "FitnessOnboarding - برنامجك الرياضي المخصص" },
      { name: "description", content: "أجب على بعض الأسئلة وسنصمم لك برنامج لياقة بدنية مخصص" },
    ],
  }),
});

const TOTAL_STEPS = 12;

// Inline color constants
const C = {
  primary: '#003fd1',
  primaryContainer: '#1a56ff',
  primaryLight: '#E8EFFE',
  primaryDark: '#1240CC',
  surface: '#F8F9FF',
  surfaceLow: '#f3f2ff',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  cardBorder: '#E2E8F0',
  onSurfaceVariant: '#434656',
  onPrimaryFixedVariant: '#0037b9',
  disabled: '#CBD5E1',
};

// Google Sheets Web App URL - Replace this with your deployed Apps Script URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzAnJBV6lzV7clG_0Wb2kuLPIDFBkWWHzYWBZxCL91HgWmTguStc6iCcZ0Hs3F10x9_Lw/exec';

function Index() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const submitToGoogleSheets = useCallback(async () => {
    if (GOOGLE_SHEETS_URL.includes('YOUR_SCRIPT_ID')) {
      alert('يرجى إعداد رابط Google Sheets أولاً!\n\n1. انسخ كود google-apps-script.gs\n2. انشره كـ Web App\n3. ضع الرابط في GOOGLE_SHEETS_URL');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Use GET with query params to avoid CORS preflight issues
      const params = new URLSearchParams({ data: JSON.stringify(data) });
      const url = `${GOOGLE_SHEETS_URL}?${params.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSubmitStatus('success');
        alert('تم إرسال البيانات بنجاح! 🎉');
      } else {
        throw new Error(result.message || 'Unknown error');
      }
    } catch (error) {
      setSubmitStatus('error');
      alert('حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [data]);

  const handleSuccessClick = useCallback(() => {
    if (isSubmitting) return;
    void submitToGoogleSheets();
  }, [isSubmitting, submitToGoogleSheets]);

  const onChange = useCallback((partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const next = () => { if (step < TOTAL_STEPS - 1) { setDirection(1); setStep((s) => s + 1); } };
  const back = () => { if (step > 0) { setDirection(-1); setStep((s) => s - 1); } };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;
  const isSuccess = step === TOTAL_STEPS - 1;

  return (
    <div style={{ fontFamily: "'Cairo', sans-serif", backgroundColor: C.surface }} className="min-h-screen antialiased flex flex-col items-center">
      {/* Progress */}
      <div className="fixed top-0 inset-x-0 mx-auto w-full max-w-[480px] z-[60] h-1.5" style={{ backgroundColor: C.cardBorder }}>
        <div className="h-full rounded-l-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: C.primaryContainer }} />
      </div>
      {/* Header */}
      <header className="fixed top-0 inset-x-0 mx-auto w-full max-w-[480px] z-50 flex justify-between items-center px-5 h-16 bg-white border-b border-slate-100 shadow-[0_8px_30px_rgb(26,86,255,0.08)]">
        <div className="flex items-center gap-3">
          {!isSuccess && <button onClick={next} className="text-sm font-medium text-slate-400 hover:bg-slate-50 transition-colors px-3 py-1 rounded-lg" style={{ fontFamily: "'Lexend', sans-serif" }}>تخطى</button>}
          {step > 0 && !isSuccess && <button onClick={back} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all" style={{ color: C.primaryContainer }}><span className="material-symbols-outlined">arrow_forward</span></button>}
        </div>
        <span style={{ fontFamily: "'Lexend', sans-serif", color: C.primaryContainer }} className="text-xl font-bold">FitnessOnboarding</span>
        <div className="w-3"></div>
      </header>
      {/* Main */}
      <main className="w-full max-w-[480px] mt-16 px-5 pt-12 pb-32 flex-grow">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={step} custom={direction} initial={{ opacity: 0, x: direction * -60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * 60 }} transition={{ duration: 0.25, ease: 'easeInOut' }}>
            {step === 0 && <IntroStep onNext={next} />}
            {step === 1 && <GenderStep data={data} onChange={onChange} />}
            {step === 2 && <BasicInfoStep data={data} onChange={onChange} />}
            {step === 3 && <FocusAreaStep data={data} onChange={onChange} />}
            {step === 4 && <GoalStep data={data} onChange={onChange} />}
            {step === 5 && <FitnessLevelStep data={data} onChange={onChange} />}
            {step === 6 && <ScheduleStep data={data} onChange={onChange} />}
            {step === 7 && <DietStep data={data} onChange={onChange} />}
            {step === 8 && <HealthStep data={data} onChange={onChange} />}
            {step === 9 && <LifestyleStep data={data} onChange={onChange} />}
            {step === 10 && <NotesStep data={data} onChange={onChange} />}
            {step === 11 && <SuccessStep />}
          </motion.div>
        </AnimatePresence>
      </main>
      {/* Bottom CTA - hidden on intro step */}
      {step > 0 && (
        <nav className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-[480px] z-50 px-5 pb-8 pt-4 bg-white/80 backdrop-blur-md rounded-t-3xl border-t border-slate-100 shadow-[0_-8px_30px_rgb(26,86,255,0.12)]">
          <button 
            onClick={isSuccess ? handleSuccessClick : next} 
            disabled={isSubmitting}
            className="w-full rounded-full py-4 flex justify-center items-center gap-2 font-bold text-lg text-white hover:brightness-110 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed" 
            style={{ backgroundColor: C.primaryContainer, fontFamily: "'Lexend', sans-serif" }}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin material-symbols-outlined">sync</span>
                <span>جاري الإرسال...</span>
              </>
            ) : (
              <>
                <span>{isSuccess ? (submitStatus === 'success' ? 'تم الإرسال ✓' : 'إرسال البيانات') : 'التالي'}</span>
                {!isSuccess && <span className="material-symbols-outlined">arrow_back</span>}
              </>
            )}
          </button>
        </nav>
      )}

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-2 sm:gap-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 px-3 sm:px-4 py-2">
        <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap hidden sm:inline">تواصل معي</span>
        <a
          href="https://wa.me/4915750042211"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-10 sm:h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300"
          aria-label="تواصل معنا عبر واتساب"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </a>
      </div>
    </div>
  );
}

// --- Intro Step ---
function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex flex-col px-4">
      {/* Hero Section */}
      <div className="text-right mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg sm:text-2xl font-bold shadow-lg">
            TC
          </div>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold" style={{ color: C.primaryContainer }}>فريق TCNS</h1>
            <p className="text-xs sm:text-sm font-semibold" style={{ color: C.textMuted }}>للياقة البدنية والتغذية</p>
          </div>
        </div>
        <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-4" style={{ color: C.textPrimary }}>مرحباً بك في فريق TCNS</h2>
      </div>

      {/* Coach Info */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border shadow-sm mb-6" style={{ borderColor: C.cardBorder }}>
        <div className="flex items-start gap-3 sm:gap-4 mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0">
            <img src="/images/success.png" alt="نادر العثمان" className="w-full h-full object-cover" />
          </div>
          <div className="text-right flex-1">
            <h3 className="text-base sm:text-lg font-bold" style={{ color: C.textPrimary }}>نادر العثمان</h3>
            <p className="text-xs sm:text-sm font-semibold" style={{ color: C.textSecondary }}>مدرب كمال أجسام ولياقة بدنية معتمد</p>
            <p className="text-xs font-medium mt-1" style={{ color: C.textMuted }}>خبرة 10+ سنوات</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-right" style={{ color: C.textSecondary }}>
          بدأت رحلتي كلاعب بطولات البوكسينغ والجمنازيوم بعدها طورت نفسي بالدراسة والتخصص في مجال التدريب والتغذية لأحول شغفي إلى أسلوب حياة ومهنة أساعد فيها غيري
        </p>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-bold mb-4 text-right" style={{ color: C.textPrimary }}>خلال مسيرتي اشتغلت مع أكثر من 300 شخص وقدرنا نحقق:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {[
            { emoji: '💪', text: 'تحسين الشكل وبناء الجسم' },
            { emoji: '🔥', text: 'خسارة الدهون بشكل صحي' },
            { emoji: '⚡', text: 'رفع اللياقة البدنية' },
            { emoji: '✨', text: 'زيادة الثقة بالنفس' },
            { emoji: '🌟', text: 'تحسين نمط الحياة' },
            { emoji: '🏆', text: 'تجنب حلول قاسية مثل العمليات' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-2 sm:p-3 border flex items-center gap-2" style={{ borderColor: C.cardBorder }}>
              <span className="text-lg sm:text-xl">{item.emoji}</span>
              <span className="text-xs sm:text-sm font-semibold" style={{ color: C.textSecondary }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-5 border mb-6" style={{ borderColor: C.primaryLight }}>
        <h3 className="text-sm sm:text-base font-bold mb-3 text-right" style={{ color: C.primaryContainer }}>فريق TCNS المتكامل يضم:</h3>
        <div className="space-y-2">
          {[
            { icon: 'medical_services', text: 'دكتور عام لمتابعة الحالة الصحية' },
            { icon: 'healing', text: 'أخصائية علاج فيزيائي' },
            { icon: 'monitoring', text: 'دكتوراة عامة لمتابعة شاملة' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xs sm:text-sm" style={{ color: C.primaryContainer }}>{item.icon}</span>
              <span className="text-xs sm:text-sm font-semibold" style={{ color: C.textSecondary }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border shadow-sm mb-6 text-right" style={{ borderColor: C.cardBorder }}>
        <h3 className="text-base sm:text-lg font-bold mb-4" style={{ color: C.textPrimary }}>شو رح تاخذ معنا؟</h3>
        <div className="space-y-3">
          {[
            'برنامج تدريبي مخصص حسب هدفك',
            'نظام غذائي مناسب لك',
            'متابعة مستمرة وتعديل حسب تقدمك',
            'توجيه ودعم خلال رحلتك',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold" style={{ backgroundColor: C.primaryContainer }}>✓</span>
              <span className="text-xs sm:text-sm font-semibold" style={{ color: C.textSecondary }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Message */}
      <div className="text-right mb-8">
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: C.textSecondary }}>
          <strong style={{ color: C.textPrimary }}>قبل ما نبدأ:</strong> الأسئلة التالية مهمة جداً لأنها تساعدنا نفهم وضعك الحالي ونحدد أفضل خطة لك بدقة. كل ماكانت إجاباتك أوضح وصريحة كل ماكانت نتيجتك معنا أفضل
        </p>
      </div>

      {/* Start Button */}
      <div className="mt-auto">
        <button 
          onClick={onNext}
          className="w-full rounded-full py-3 sm:py-4 flex justify-center items-center gap-2 font-bold text-base sm:text-lg text-white hover:brightness-110 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
          style={{ backgroundColor: C.primaryContainer, fontFamily: "'Lexend', sans-serif" }}
        >
          <span className="text-sm sm:text-base">عبي البيانات وخليّنا نبلش رحلتك</span>
          <span className="material-symbols-outlined text-lg sm:text-xl">arrow_back</span>
        </button>
      </div>
    </div>
  );
}

// --- Step Props ---
interface StepProps { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void; }

// --- Step 1: Gender ---
function GenderStep({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full text-right mb-12">
        <h1 className="text-[32px] font-extrabold leading-[1.3] mb-2" style={{ color: C.textPrimary }}>ما هو جنسك؟</h1>
        <p className="text-lg font-semibold" style={{ color: C.textSecondary }}>ساعدنا نتعرف عليك أكثر</p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {(['male', 'female'] as const).map((g) => {
          const selected = data.gender === g;
          return (
            <button key={g} onClick={() => onChange({ gender: g })} className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all active:scale-95 relative overflow-hidden`} style={{ backgroundColor: selected ? C.primaryLight : '#fff', borderColor: selected ? C.primaryContainer : C.cardBorder }}>
              {selected && <div className="absolute top-3 right-3 rounded-full w-6 h-6 flex items-center justify-center text-white" style={{ backgroundColor: C.primaryContainer }}><span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span></div>}
              <div className="w-full aspect-[4/5] mb-4 overflow-hidden rounded-lg" style={{ backgroundColor: selected ? 'rgba(255,255,255,0.5)' : C.surface }}>
                <img alt={g === 'male' ? 'رجل' : 'أنثى'} className={`w-full h-full object-cover transition-all ${!selected ? 'grayscale opacity-70' : 'opacity-90'}`} src={g === 'male' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuArji0C2PXoj5v9p81G_F8LrcInoW8oX1hSnhfI0_F7Kz5lh3So_x3R1ykCeknVH5a5TrXl1bZxPDrb40pTddhcwpwZKIvU0nIC-iOn4S5c1Kq2qO6F06gVWaZxTXLVBw0GSv5ftrfww84sga6ShRGZ4s7trZXEUru8T7W2HvclZANRsfQ9ShPLBxHRBJXITM97IgR_RYDC1JVTspTuD2bTvt1xQmN1L7BG3lMeZ1YCdz-QDjFBSCENnxNe_fQP3yz1iMN-C0bcXtVS' : 'https://lh3.googleusercontent.com/aida-public/AB6AXuB37ecnd92VuNlvT1PMvJ9JsYLQakGpfn7a30by9dGZW3aATiSmlji_gfbkkPm6pj5QBudcJKg0hbz50143DraW8qX1K6UFMI_fMymiTcQUrSl9NlYJiOlEc64NEvcFI7E1bFBfDCr5zLPqevJOfgDaDswTvm3Mcby1S_Wdoi1LgtDRdcgz-jcL1OG6FIdAePUD9Mvlq7NG8YSbpMAPp6AmAhW5BlOKxfFnyIhDBb1ET1F_uB7Zajp0LvVZkF34isPjgAOgjrB6fIH0'} />
              </div>
              <span className="text-[22px] font-bold" style={{ color: selected ? C.primaryContainer : C.textPrimary }}>{g === 'male' ? 'رجل' : 'أنثى'}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-8 w-full p-4 rounded-xl border-r-4" style={{ backgroundColor: C.surfaceLow, borderColor: C.primaryContainer }}>
        <div className="flex gap-2">
          <span className="material-symbols-outlined" style={{ color: C.primaryContainer, fontVariationSettings: "'FILL' 1" }}>info</span>
          <p className="text-base" style={{ color: C.onSurfaceVariant }}>يساعدنا تحديد الجنس في ضبط معادلات حرق السعرات الحرارية وتوصيات التمارين بدقة أكبر لجسمك.</p>
        </div>
      </div>
    </div>
  );
}

// --- Step 2: Basic Info ---
function BasicInfoStep({ data, onChange }: StepProps) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-[26px] font-extrabold leading-[1.3] mb-2" style={{ color: C.textPrimary }}>معلوماتك الأساسية</h2>
        <p className="text-base" style={{ color: C.textSecondary }}>أدخل بياناتك بدقة للحصول على برنامج مناسب</p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 pr-1" style={{ color: C.textSecondary }}>الاسم الكامل</label>
          <div className="relative">
            <input type="text" value={data.name} onChange={(e) => onChange({ name: e.target.value })} className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-white focus:border-blue-500 focus:ring-0 transition-all outline-none text-lg font-semibold" style={{ color: C.textPrimary }} placeholder="مثال: محمد أحمد" />
            <div className="absolute inset-y-0 right-4 flex items-center" style={{ color: C.textMuted }}><span className="material-symbols-outlined">person</span></div>
          </div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-100 shadow-sm" style={{ backgroundColor: C.surfaceLow }}>
          <label className="block text-sm font-semibold mb-3" style={{ color: C.textSecondary }}>العمر</label>
          <div className="flex items-center gap-4">
            <input type="number" value={data.age} onChange={(e) => onChange({ age: Number(e.target.value) })} className="flex-1 h-14 bg-white border-2 border-transparent focus:border-blue-500 rounded-xl text-center text-[32px] font-extrabold transition-all outline-none" style={{ color: C.primaryContainer }} />
            <span className="text-[22px] font-bold" style={{ color: C.textMuted }}>سنة</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm">
            <label className="block text-sm font-semibold mb-2" style={{ color: C.textSecondary }}>الطول</label>
            <div className="flex items-baseline gap-1">
              <input type="number" value={data.height || ''} onChange={(e) => onChange({ height: Number(e.target.value) })} className="w-full bg-transparent border-none p-0 focus:ring-0 text-[26px] font-extrabold text-center outline-none" style={{ color: C.textPrimary }} placeholder="170" />
              <span className="text-sm font-semibold" style={{ color: C.textMuted }}>سم</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm">
            <label className="block text-sm font-semibold mb-2" style={{ color: C.textSecondary }}>الوزن الحالي</label>
            <div className="flex items-baseline gap-1">
              <input type="number" value={data.weight || ''} onChange={(e) => onChange({ weight: Number(e.target.value) })} className="w-full bg-transparent border-none p-0 focus:ring-0 text-[26px] font-extrabold text-center outline-none" style={{ color: C.textPrimary }} placeholder="75" />
              <span className="text-sm font-semibold" style={{ color: C.textMuted }}>كغ</span>
            </div>
          </div>
        </div>
        <InfoTip text="هذه البيانات تساعدنا في حساب السعرات الحرارية بدقة وتصميم خطة تمرين آمنة لك." />
      </div>
    </div>
  );
}

// --- Step 3: Focus Area ---
const areas = ['الجسم كامل', 'الذراعين', 'الصدر', 'البطن', 'الأرجل', 'الظهر'];
function FocusAreaStep({ data, onChange }: StepProps) {
  const toggle = (a: string) => {
    const next = data.focusAreas.includes(a) ? data.focusAreas.filter((x) => x !== a) : [...data.focusAreas, a];
    onChange({ focusAreas: next });
  };
  return (
    <div className="w-full">
      <div className="mb-10 text-right">
        <h1 className="text-[26px] font-extrabold leading-[1.3] mb-2" style={{ color: C.textPrimary }}>اختر المنطقة التي تريد التركيز عليها</h1>
        <p className="text-base" style={{ color: C.textSecondary }}>يمكنك اختيار أكثر من خيار</p>
      </div>
      <div className="flex flex-col gap-3">
        {areas.map((a) => {
          const sel = data.focusAreas.includes(a);
          return (
            <button key={a} onClick={() => toggle(a)} className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all active:scale-[0.98]" style={{ backgroundColor: '#fff', borderColor: sel ? C.primaryContainer : 'transparent', boxShadow: sel ? '0 4px 12px rgba(26,86,255,0.08)' : 'none' }}>
              <span className="text-lg font-semibold" style={{ color: sel ? C.primaryContainer : C.textPrimary }}>{a}</span>
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ borderColor: sel ? C.primaryContainer : C.cardBorder, backgroundColor: sel ? C.primaryContainer : 'transparent' }}>
                {sel && <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'wght' 700" }}>check</span>}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-6"><InfoTip text="سيقوم مدربنا الذكي بتصميم خطة تمارين تستهدف المناطق المختارة لضمان أفضل النتائج." /></div>
    </div>
  );
}

// --- Step 4: Goal ---
const goals = [
  { id: 'fitness', emoji: '🏃', label: 'تحسين اللياقة العامة' },
  { id: 'sculpt', emoji: '✨', label: 'شد ونحت الجسم' },
  { id: 'muscle', emoji: '💪', label: 'زيادة الكتلة العضلية' },
  { id: 'fat-loss', emoji: '🔥', label: 'خسارة الدهون' },
];
function GoalStep({ data, onChange }: StepProps) {
  return (
    <div className="w-full">
      <div className="mb-8 text-right">
        <h1 className="text-[26px] font-extrabold leading-[1.3] mb-2" style={{ color: C.textPrimary }}>ما هو هدفك الرئيسي؟</h1>
        <p className="text-base" style={{ color: C.textSecondary }}>اختر هدفاً واحداً يعكس طموحك الحقيقي</p>
      </div>
      <div className="space-y-4 mb-8">
        {goals.map((g) => {
          const sel = data.goal === g.id;
          return (
            <button key={g.id} onClick={() => onChange({ goal: g.id })} className="w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all active:scale-[0.98]" style={{ backgroundColor: sel ? C.primaryLight : '#fff', borderColor: sel ? C.primaryContainer : C.cardBorder }}>
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ borderColor: sel ? C.primaryContainer : C.disabled }}>
                {sel && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: C.primaryContainer }} />}
              </div>
              <div className="flex-grow text-right"><span className="text-lg font-semibold" style={{ color: sel ? C.primaryContainer : C.textPrimary }}>{g.label}</span></div>
              <div className="w-12 h-12 flex items-center justify-center rounded-lg text-2xl" style={{ backgroundColor: sel ? '#fff' : C.surface }}>{g.emoji}</div>
            </button>
          );
        })}
      </div>
      <div>
        <label className="text-sm font-semibold block px-1 mb-2" style={{ color: C.textPrimary }}>كم المدة التي تريد الوصول فيها لهدفك؟</label>
        <input type="text" value={data.goalDuration} onChange={(e) => onChange({ goalDuration: e.target.value })} className="w-full h-14 bg-white border-2 rounded-xl px-4 text-base focus:ring-4 outline-none transition-all text-right" style={{ borderColor: C.cardBorder, color: C.textPrimary }} placeholder="مثلاً: 3 أشهر" />
      </div>
    </div>
  );
}

// --- Step 5: Fitness Level ---
const levels = [
  { id: 'beginner', emoji: '🌱', label: 'مبتدئ', desc: 'لم أتمرن من قبل أو توقفت لفترة طويلة' },
  { id: 'intermediate', emoji: '⚡', label: 'متوسط', desc: 'أقوم بالتمارين بشكل متقطع (3-6 أشهر)' },
  { id: 'advanced', emoji: '🏆', label: 'متقدم', desc: 'أتدرب بانتظام منذ أكثر من سنة' },
];
function FitnessLevelStep({ data, onChange }: StepProps) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold leading-[1.3]" style={{ color: C.textPrimary }}>ما هو مستواك الرياضي الحالي؟</h1>
        <p className="text-base mt-2" style={{ color: C.textSecondary }}>سنقوم بتخصيص خطتك التدريبية بناءً على خبرتك.</p>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        {levels.map((l) => {
          const sel = data.fitnessLevel === l.id;
          return (
            <button key={l.id} onClick={() => onChange({ fitnessLevel: l.id })} className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all active:scale-[0.98]" style={{ backgroundColor: sel ? C.primaryLight : '#fff', borderColor: sel ? C.primaryContainer : C.cardBorder }}>
              <div className="text-right">
                <h3 className="text-lg font-semibold" style={{ color: sel ? C.primaryContainer : C.textPrimary }}>{l.label}</h3>
                <p className="text-sm font-semibold" style={{ color: sel ? C.primaryDark : C.textMuted }}>{l.desc}</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full text-2xl" style={{ backgroundColor: sel ? C.primaryContainer : C.primaryLight, color: sel ? '#fff' : undefined }}>{l.emoji}</div>
              {sel && <span className="material-symbols-outlined" style={{ color: C.primaryContainer, fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            </button>
          );
        })}
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-lg font-semibold block mb-2" style={{ color: C.textPrimary }}>هل سبق والتزمت ببرنامج تدريبي؟</label>
          <div className="flex p-1 rounded-full w-full border" style={{ backgroundColor: C.surfaceLow, borderColor: C.cardBorder }}>
            {[{ v: true, l: 'نعم، فعلت' }, { v: false, l: 'لا، هذه أول مرة' }].map((o) => (
              <button key={String(o.v)} onClick={() => onChange({ hadProgram: o.v })} className="flex-1 py-2.5 rounded-full text-sm font-semibold transition-all" style={{ backgroundColor: data.hadProgram === o.v ? C.primaryContainer : 'transparent', color: data.hadProgram === o.v ? '#fff' : C.textSecondary }}>{o.l}</button>
            ))}
          </div>
        </div>
        <Stepper label="كم يوم تتمرن حالياً في الأسبوع؟" value={data.weeklyDays} unit="أيام" min={0} max={7} onChange={(v) => onChange({ weeklyDays: v })} />
      </div>
    </div>
  );
}

// --- Step 6: Schedule ---
const days = ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];
const times = [{ id: 'morning', icon: 'wb_sunny', label: 'صباحاً' }, { id: 'afternoon', icon: 'wb_twilight', label: 'ظهراً' }, { id: 'evening', icon: 'dark_mode', label: 'مساءً' }];
const durations = ['30 دقيقة', '45 دقيقة', '60 دقيقة', '90+ دقيقة'];
function ScheduleStep({ data, onChange }: StepProps) {
  const toggleDay = (d: string) => {
    const next = data.preferredDays.includes(d) ? data.preferredDays.filter((x) => x !== d) : [...data.preferredDays, d];
    onChange({ preferredDays: next });
  };
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold leading-[1.3]" style={{ color: C.textPrimary }}>أين ومتى تتمرن؟</h1>
        <p className="text-base mt-2" style={{ color: C.textSecondary }}>ساعدنا في تصميم جدول واقعي يناسب نمط حياتك.</p>
      </div>
      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-3" style={{ color: C.textMuted }}>مكان التمرين</h2>
        <div className="grid grid-cols-2 gap-4">
          {[{ id: 'home', icon: 'home', label: 'المنزل' }, { id: 'gym', icon: 'fitness_center', label: 'النادي الرياضي' }].map((loc) => {
            const sel = data.workoutLocation === loc.id;
            return (
              <button key={loc.id} onClick={() => onChange({ workoutLocation: loc.id })} className="flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all active:scale-[0.98]" style={{ backgroundColor: sel ? C.primaryLight : '#fff', borderColor: sel ? C.primaryContainer : C.cardBorder }}>
                <div className="w-16 h-16 mb-2 flex items-center justify-center rounded-full transition-transform" style={{ backgroundColor: sel ? C.primaryContainer : C.primaryLight, color: sel ? '#fff' : C.primaryContainer }}><span className="material-symbols-outlined text-3xl">{loc.icon}</span></div>
                <span className="text-lg font-semibold" style={{ color: sel ? C.primaryContainer : C.textPrimary }}>{loc.label}</span>
              </button>
            );
          })}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-3" style={{ color: C.textMuted }}>أيام التمرين</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((d) => {
            const sel = data.preferredDays.includes(d);
            return <button key={d} onClick={() => toggleDay(d)} className="min-w-[56px] py-3 rounded-2xl border-2 text-sm font-semibold transition-all active:scale-95" style={{ backgroundColor: sel ? C.primaryContainer : '#fff', color: sel ? '#fff' : C.textPrimary, borderColor: sel ? C.primaryContainer : C.cardBorder }}>{d}</button>;
          })}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-3" style={{ color: C.textMuted }}>الوقت المفضل</h2>
        <div className="flex gap-3">
          {times.map((t) => {
            const sel = data.preferredTime === t.id;
            return (
              <button key={t.id} onClick={() => onChange({ preferredTime: t.id })} className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95" style={{ backgroundColor: sel ? C.primaryLight : '#fff', borderColor: sel ? C.primaryContainer : C.cardBorder }}>
                <span className="material-symbols-outlined text-2xl" style={{ color: sel ? C.primaryContainer : C.textMuted }}>{t.icon}</span>
                <span className="text-sm font-semibold" style={{ color: sel ? C.primaryContainer : C.textPrimary }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3" style={{ color: C.textMuted }}>مدة الجلسة</h2>
        <div className="grid grid-cols-2 gap-3">
          {durations.map((d) => {
            const sel = data.sessionDuration === d;
            return <button key={d} onClick={() => onChange({ sessionDuration: d })} className="py-3 rounded-xl border-2 text-sm font-semibold transition-all active:scale-95" style={{ backgroundColor: sel ? C.primaryLight : '#fff', borderColor: sel ? C.primaryContainer : C.cardBorder, color: sel ? C.primaryContainer : C.textPrimary }}>{d}</button>;
          })}
        </div>
      </section>
    </div>
  );
}

// --- Step 7: Diet ---
const dietOptions = ['كيتو', 'نباتي', 'صيام متقطع', 'لا يوجد', 'أخرى'];
function DietStep({ data, onChange }: StepProps) {
  const toggleDiet = (d: string) => {
    const next = data.dietTypes.includes(d) ? data.dietTypes.filter((x) => x !== d) : [...data.dietTypes, d];
    onChange({ dietTypes: next });
  };
  return (
    <div className="w-full">
      <section className="mb-8 text-right">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full opacity-50 blur-xl" style={{ backgroundColor: C.primaryLight }} />
          <div className="relative w-full h-full bg-white rounded-3xl shadow-lg flex items-center justify-center border overflow-hidden" style={{ borderColor: C.primaryLight }}>
            <img src="/images/nutrition.jpg" alt="نمطك الغذائي" className="w-full h-full object-cover" />
          </div>
        </div>
        <h1 className="text-[26px] font-extrabold leading-[1.3] mb-2" style={{ color: C.textPrimary }}>نمطك الغذائي</h1>
        <p className="text-base" style={{ color: C.textSecondary }}>معلوماتك الغذائية تساعدنا نصمم برنامج متكامل</p>
      </section>
      <div className="space-y-8">
        <div>
          <label className="text-sm font-semibold block mb-2 px-1" style={{ color: C.textPrimary }}>كيف تصف نظام أكلك الحالي؟</label>
          <textarea value={data.dietDescription} onChange={(e) => onChange({ dietDescription: e.target.value })} className="w-full border-2 border-slate-100 rounded-xl p-4 text-base focus:border-blue-500 focus:ring-0 transition-all outline-none" style={{ backgroundColor: C.surface, color: C.textPrimary }} placeholder="مثلاً: أعتمد على الوجبات السريعة..." rows={3} />
        </div>
        <Stepper label="كم وجبة تأكل باليوم؟" value={data.mealsPerDay} unit="وجبات" min={1} max={10} onChange={(v) => onChange({ mealsPerDay: v })} />
        <div>
          <label className="text-sm font-semibold block mb-2 px-1" style={{ color: C.textPrimary }}>هل تتبع نظاماً غذائياً معيناً؟</label>
          <div className="flex flex-wrap gap-3">
            {dietOptions.map((d) => {
              const sel = data.dietTypes.includes(d);
              return <button key={d} onClick={() => toggleDiet(d)} className="px-6 py-2 rounded-full border-2 text-sm font-semibold transition-all" style={{ backgroundColor: sel ? C.primaryLight : '#fff', borderColor: sel ? C.primaryContainer : '#e2e8f0', color: sel ? C.primaryContainer : C.textSecondary }}>{d}</button>;
            })}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold block mb-2 px-1" style={{ color: C.textPrimary }}>حساسية أو أطعمة لا تتناولها؟</label>
          <textarea value={data.allergies} onChange={(e) => onChange({ allergies: e.target.value })} className="w-full border-2 border-slate-100 rounded-xl p-4 text-base focus:border-blue-500 focus:ring-0 transition-all outline-none" style={{ backgroundColor: C.surface, color: C.textPrimary }} placeholder="مثل: المكسرات، اللاكتوز..." rows={2} />
        </div>
        <InfoTip text="تخصيص وجباتك حسب تفضيلاتك يزيد من التزامك بالبرنامج بنسبة ٤٠٪ أسرع!" icon="lightbulb" />
      </div>
    </div>
  );
}

// --- Step 8: Health ---
const conditions = ['سكري', 'ضغط الدم', 'مشاكل قلب', 'مشاكل مفاصل', 'ربو', 'لا يوجد'];
function HealthStep({ data, onChange }: StepProps) {
  const toggle = (c: string) => {
    if (c === 'لا يوجد') { onChange({ healthConditions: data.healthConditions.includes(c) ? [] : [c] }); return; }
    const w = data.healthConditions.filter((x) => x !== 'لا يوجد');
    const next = w.includes(c) ? w.filter((x) => x !== c) : [...w, c];
    onChange({ healthConditions: next });
  };
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold leading-[1.3] mb-2" style={{ color: C.textPrimary }}>حالتك الصحية</h1>
        <p className="text-base" style={{ color: C.textSecondary }}>نحتاج هذه المعلومات لضمان سلامتك أثناء التمرين</p>
      </div>
      <div className="space-y-8">
        <div>
          <label className="text-sm font-semibold block mb-3" style={{ color: C.textPrimary }}>هل تعاني من أي حالة صحية مزمنة؟</label>
          <div className="flex flex-wrap gap-3">
            {conditions.map((c) => {
              const sel = data.healthConditions.includes(c);
              return <button key={c} onClick={() => toggle(c)} className="px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all" style={{ backgroundColor: sel ? C.primaryLight : '#fff', borderColor: sel ? C.primaryContainer : '#e2e8f0', color: sel ? C.primaryContainer : C.textSecondary }}>{c}</button>;
            })}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: C.textPrimary }}>هل تتناول أي أدوية بشكل منتظم؟</label>
          <textarea value={data.medications} onChange={(e) => onChange({ medications: e.target.value })} className="w-full border-2 border-slate-100 rounded-xl p-4 text-base focus:border-blue-500 focus:ring-0 transition-all outline-none" style={{ backgroundColor: C.surface, color: C.textPrimary }} placeholder="اذكر الأدوية إن وجدت..." rows={2} />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: C.textPrimary }}>إصابات سابقة أو حالية؟</label>
          <textarea value={data.injuries} onChange={(e) => onChange({ injuries: e.target.value })} className="w-full border-2 border-slate-100 rounded-xl p-4 text-base focus:border-blue-500 focus:ring-0 transition-all outline-none" style={{ backgroundColor: C.surface, color: C.textPrimary }} placeholder="مثل: إصابة في الركبة..." rows={2} />
        </div>
        <InfoTip text="هذه البيانات سرية تماماً وتساعد مدربك الذكي على تصميم برنامج آمن وفعال." />
      </div>
    </div>
  );
}

// --- Step 9: Lifestyle ---
function LifestyleStep({ data, onChange }: StepProps) {
  return (
    <div className="w-full">
      <div className="mb-8 text-right">
        <h1 className="text-[26px] font-extrabold leading-[1.3] mb-2" style={{ color: C.textPrimary }}>نمط حياتك</h1>
        <p className="text-base" style={{ color: C.textSecondary }}>التفاصيل اليومية تؤثر على نتائجك</p>
      </div>
      <Stepper label="كم ساعة تنام يومياً؟" value={data.sleepHours} unit="ساعات" min={1} max={12} onChange={(v) => onChange({ sleepHours: v })} />
      <section className="my-8">
        <h3 className="text-lg font-semibold mb-2" style={{ color: C.textPrimary }}>طبيعة عملك؟</h3>
        <div className="grid grid-cols-2 gap-4">
          {[{ id: 'office', emoji: '💼', label: 'مكتبي' }, { id: 'active', emoji: '🚶', label: 'نشاط وحركة' }].map((w) => {
            const sel = data.workNature === w.id;
            return (
              <button key={w.id} onClick={() => onChange({ workNature: w.id })} className="rounded-2xl p-6 text-right flex flex-col items-center gap-2 border-2 transition-colors" style={{ backgroundColor: sel ? C.primaryLight : '#fff', borderColor: sel ? C.primaryContainer : C.cardBorder }}>
                <div className="text-3xl">{w.emoji}</div>
                <span className="text-sm font-semibold" style={{ color: sel ? C.primaryContainer : C.textSecondary }}>{w.label}</span>
              </button>
            );
          })}
        </div>
      </section>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold" style={{ color: C.textPrimary }}>مستوى التوتر</h3>
          <span className="text-[22px] font-bold" style={{ color: C.primaryContainer }}>{data.stressLevel}</span>
        </div>
        <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: C.cardBorder }}>
          <input type="range" min={1} max={10} value={data.stressLevel} onChange={(e) => onChange({ stressLevel: Number(e.target.value) })} className="mb-2 w-full" />
          <div className="flex justify-between w-full text-sm font-semibold" style={{ color: C.textMuted }}><span>منخفض</span><span>مرتفع</span></div>
        </div>
      </section>
      <InfoTip text="النوم الكافي وإدارة التوتر يساعدان جسمك على التعافي وحرق الدهون بشكل أكثر كفاءة." />
    </div>
  );
}

// --- Step 10: Notes ---
function NotesStep({ data, onChange }: StepProps) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold leading-[1.3] mb-2" style={{ color: C.textPrimary }}>ملاحظات إضافية</h1>
        <p className="text-base" style={{ color: C.textSecondary }}>أي تفاصيل إضافية تساعدنا في تخصيص برنامجك</p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: C.textPrimary }}>في شيء تريد أن نركز عليه أكثر؟</label>
          <textarea value={data.focusNotes} onChange={(e) => onChange({ focusNotes: e.target.value })} className="w-full min-h-[120px] p-4 rounded-xl border-2 border-slate-100 bg-white focus:border-blue-500 focus:ring-0 transition-all text-base outline-none" style={{ color: C.textPrimary }} placeholder="مثلاً: تقوية عضلات الظهر، تحسين المرونة..." />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: C.textPrimary }}>القياسات الحالية (اختياري)</label>
          <input type="text" value={data.measurements} onChange={(e) => onChange({ measurements: e.target.value })} className="w-full p-4 rounded-xl border-2 border-slate-100 bg-white focus:border-blue-500 focus:ring-0 transition-all text-base outline-none" style={{ color: C.textPrimary }} placeholder="الخصر، الصدر، الأرداف (سم)" />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: C.textPrimary }}>أي تفاصيل أخرى تريد إضافتها؟</label>
          <textarea value={data.additionalNotes} onChange={(e) => onChange({ additionalNotes: e.target.value })} className="w-full min-h-[100px] p-4 rounded-xl border-2 border-slate-100 bg-white focus:border-blue-500 focus:ring-0 transition-all text-base outline-none" style={{ color: C.textPrimary }} placeholder="أي ملاحظات صحية أو رياضية أخرى..." />
        </div>
      </div>
    </div>
  );
}

// --- Step 11: Success ---
function SuccessStep() {
  return (
    <div className="flex flex-col items-center justify-end text-right w-full min-h-[60vh]">
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 border-4 border-white" style={{ backgroundColor: C.primaryContainer, boxShadow: '0 12px 40px rgba(26,86,255,0.3)' }}>
        <span className="material-symbols-outlined text-white !text-5xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 700" }}>check</span>
      </div>
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-50 w-full">
        <h1 className="text-[32px] font-extrabold mb-4" style={{ color: C.textPrimary }}>شكراً لوقتك 🎉</h1>
        <p className="text-lg font-semibold leading-relaxed" style={{ color: C.textSecondary }}>بناءً على إجاباتك، سيتم تصميم برنامج خاص بك يناسب هدفك ونمط حياتك.</p>
        <div className="mt-8"><InfoTip text="لقد أتممت 100% من بياناتك الأساسية. برنامجك التدريبي جاهز للتحميل الآن." /></div>
      </div>
      <div className="mt-12 w-full max-w-[280px]">
        <img className="w-full h-full object-contain drop-shadow-2xl" src="/images/gym.jpg" alt="Success" />
      </div>
    </div>
  );
}

// --- Shared Components ---
function InfoTip({ text, icon = 'info' }: { text: string; icon?: string }) {
  return (
    <div className="p-4 rounded-xl border-r-4 flex gap-3 items-start" style={{ backgroundColor: C.primaryLight, borderColor: C.primaryContainer }}>
      <span className="material-symbols-outlined mt-0.5" style={{ color: C.primaryContainer, fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      <p className="text-sm font-semibold leading-relaxed" style={{ color: C.onPrimaryFixedVariant }}>{text}</p>
    </div>
  );
}

function Stepper({ label, value, unit, min, max, onChange }: { label: string; value: number; unit: string; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: C.textPrimary }}>{label}</h3>
      <div className="bg-white rounded-2xl p-6 border shadow-sm flex items-center justify-between" style={{ borderColor: C.cardBorder }}>
        <button onClick={() => onChange(Math.min(max, value + 1))} className="w-12 h-12 rounded-full border-2 flex items-center justify-center active:scale-90 transition-transform" style={{ borderColor: C.disabled, color: C.disabled }}><span className="material-symbols-outlined">remove</span></button>
        <div className="text-center">
          <span className="text-[32px] font-extrabold block" style={{ color: C.primaryContainer }}>{value}</span>
          <span className="text-sm font-semibold" style={{ color: C.textMuted }}>{unit}</span>
        </div>
        <button onClick={() => onChange(Math.max(min, value - 1))} className="w-12 h-12 rounded-full border-2 flex items-center justify-center active:scale-90 transition-transform" style={{ borderColor: C.primaryContainer, color: C.primaryContainer }}><span className="material-symbols-outlined">add</span></button>
      </div>
    </div>
  );
}
