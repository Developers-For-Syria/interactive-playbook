export function StepSuccess() {
  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full min-h-[60vh]">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(26, 86, 255, 0.05) 0%, transparent 70%)' }} />
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="w-24 h-24 bg-fit-primary-container rounded-full flex items-center justify-center mb-8 shadow-[0_12px_40px_rgba(26,86,255,0.3)] border-4 border-white">
          <span className="material-symbols-outlined text-white !text-5xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 700" }}>check</span>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(26,86,255,0.04)] border border-slate-50 w-full">
          <h1 className="text-[32px] font-extrabold text-fit-text-primary mb-4">شكراً لوقتك 🎉</h1>
          <p className="text-lg font-semibold text-fit-text-secondary leading-relaxed">
            بناءً على إجاباتك، سيتم تصميم برنامج خاص بك يناسب هدفك ونمط حياتك. التزامك هو العامل الأهم — ونحن معك خطوة بخطوة.
          </p>
          <div className="mt-8 p-4 bg-fit-primary-light border-r-4 border-fit-primary-container rounded-xl flex items-start gap-4">
            <span className="material-symbols-outlined text-fit-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            <p className="text-right text-sm font-semibold text-fit-primary-dark">
              لقد أتممت 100% من بياناتك الأساسية. برنامجك التدريبي جاهز للتحميل الآن.
            </p>
          </div>
        </div>
        <div className="mt-12 w-full max-w-[280px]">
          <img className="w-full h-full object-contain drop-shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhkswdvzFcDTH38JIiRu-Sq6xerWeCDfyit8KIkMgUPG9OacgNDTM9h8P-Kn4zJ8GdCYvap-sbKEMJSq-_MJu299BvN_R4mkHJeaIZBqdLB5A_tOPf5ADZcq0KK9LmC3Yf60sdmyGXsW6SpkEh5Rs69nE7VYYyFsNLo6RJhhxA__M63Nojec-hY_S2GIZzStvZr_9u10YcuAJuI5s8jBZVUmN9dyD3Mbbn3A-fdrPx6P5vTiyoSCoyaLlRvlkYT0PAZBPeGTS1Tkxj" alt="Success" />
        </div>
      </div>
    </div>
  );
}
