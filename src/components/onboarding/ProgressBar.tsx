interface ProgressBarProps {
  progress: number; // 0-100
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-[60] h-1.5 bg-fit-progress-track">
      <div
        className="h-full bg-fit-primary-container rounded-l-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
