function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow dark:bg-gray-800">

      <div className="h-[210px] bg-gray-200 dark:bg-gray-700" />

      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />

        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />

        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />

        <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
      </div>

    </div>
  );
}

export default SkeletonCard;