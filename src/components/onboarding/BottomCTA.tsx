interface BottomCTAProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function BottomCTA({ label, onClick, disabled }: BottomCTAProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 px-5 pb-8 pt-4 bg-white/80 backdrop-blur-md rounded-t-3xl border-t border-slate-100 shadow-[0_-8px_30px_rgb(26,86,255,0.12)]">
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full bg-fit-primary-container text-white rounded-full py-4 flex justify-center items-center gap-2 font-lexend font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{label}</span>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
    </nav>
  );
}
