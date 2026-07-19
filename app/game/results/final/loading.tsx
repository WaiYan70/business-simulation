import Navbar from "@/components/layout/Navbar";

export default function FinalResultsLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        quarter={8}
        totalQuarters={8}
        brandAsHeading={false}
        completed
      />
      <main
        className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:py-8"
        aria-busy="true"
        aria-label="Loading final game report"
      >
        <div className="space-y-4 border-b border-border pb-7" aria-hidden="true">
          <div className="h-4 w-40 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
          <div className="h-12 w-full max-w-2xl animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
          <div className="h-5 w-full max-w-xl animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
          <div className="grid gap-8 md:grid-cols-2" aria-hidden="true">
            {[0, 1].map((column) => (
              <div key={column} className="space-y-4">
                <div className="h-7 w-48 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
                {[0, 1, 2, 3, 4].map((row) => (
                  <div
                    key={row}
                    className="h-12 animate-pulse rounded-sm bg-muted motion-reduce:animate-none"
                  />
                ))}
              </div>
            ))}
          </div>
          <div
            className="h-80 animate-pulse rounded-xl bg-muted motion-reduce:animate-none"
            aria-hidden="true"
          />
        </div>
      </main>
    </div>
  );
}
