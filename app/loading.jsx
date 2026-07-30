export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 rounded-full border-2 border-primary/25 border-t-primary animate-spin"
          aria-hidden
        />
        <p className="text-sm text-muted-foreground tracking-wide">Loading...</p>
      </div>
    </div>
  )
}
