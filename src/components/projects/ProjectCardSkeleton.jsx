export default function ProjectCardSkeleton() {
  return (
    <div className="project-card-skeleton rounded-2xl overflow-hidden">
      <div className="aspect-[16/10] project-skeleton-shimmer" />
      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full project-skeleton-shimmer" />
          <div className="h-5 w-20 rounded-full project-skeleton-shimmer" />
        </div>
        <div className="h-6 w-3/4 rounded-lg project-skeleton-shimmer" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded project-skeleton-shimmer" />
          <div className="h-4 w-5/6 rounded project-skeleton-shimmer" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-14 rounded-full project-skeleton-shimmer" />
          <div className="h-6 w-16 rounded-full project-skeleton-shimmer" />
          <div className="h-6 w-12 rounded-full project-skeleton-shimmer" />
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-14 rounded-xl project-skeleton-shimmer" />
          <div className="h-14 rounded-xl project-skeleton-shimmer" />
        </div>
      </div>
    </div>
  )
}
