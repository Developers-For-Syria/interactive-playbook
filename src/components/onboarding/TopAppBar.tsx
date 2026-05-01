interface TopAppBarProps {
  onBack?: () => void;
  onSkip?: () => void;
  showBack?: boolean;
}

export function TopAppBar({ onBack, onSkip, showBack = true }: TopAppBarProps) {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 flex flex-row-reverse justify-between items-center px-5 h-16 bg-white border-b border-slate-100 shadow-[0_8px_30px_rgb(26,86,255,0.08)]">
      <div className="flex items-center gap-3">
        {onSkip && (
          <button
            onClick={onSkip}
            className="font-lexend text-sm font-medium text-slate-400 hover:bg-slate-50 transition-colors px-3 py-1 rounded-lg"
          >
            تخطى
          </button>
        )}
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 text-fit-primary-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        )}
      </div>
      <span className="font-lexend text-xl font-bold text-fit-primary-container">FitnessOnboarding</span>
    </header>
  );
}
