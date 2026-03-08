export function LoadingPageContent({ label }: { label: string }) {

  return (
    <div className="min-h-screen bg-[var(--mist)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand)] mx-auto"></div>
        <p className="text-[var(--ink)]/70">{label}</p>
      </div>
    </div>
  );
}
