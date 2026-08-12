export default function GameSessionLoading({ label }: { label: string }) {
  return (
    <main
      className="flex min-h-[50vh] items-center justify-center px-6"
      aria-busy="true"
      aria-live="polite"
    >
      <p>{label}</p>
    </main>
  );
}
