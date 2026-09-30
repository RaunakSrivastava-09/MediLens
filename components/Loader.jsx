export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="w-8 h-8 border-2 border-mint-tint border-t-forest rounded-full animate-spin" />
      <p className="text-sm text-ink-soft">{label}</p>
    </div>
  );
}
