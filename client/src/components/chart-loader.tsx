import { Skeleton } from "@/components/ui/skeleton"

export const ChartLoader = () => {
  return (
    <div className="flex flex-col space-y-3 p-4">
      {/* Simulate the chart title */}
      <Skeleton className="h-6 w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded" />

      {/* Main chart area */}
      <div className="relative">
        <Skeleton className="h-[300px] w-full rounded-xl" />

        {/* Simulating X and Y axis lines */}
        <div className="absolute bottom-0 left-0 w-full h-2">
          <Skeleton className="h-full rounded-b-xl" />
        </div>
        <div className="absolute top-0 bottom-0 left-0 w-2">
          <Skeleton className="w-full rounded-l-xl" />
        </div>
      </div>

      {/* Simulate X-axis labels */}
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* Optional: Simulate a legend for the chart */}
      <div className="flex space-x-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  )

}