const ReviewSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[wave_1.5s_infinite]" />
            </div>

            {/* Name + stars */}
            <div className="space-y-2 flex-1">
              <div className="h-3 w-32 bg-gray-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[wave_1.5s_infinite]" />
              </div>
              <div className="h-3 w-20 bg-gray-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[wave_1.5s_infinite]" />
              </div>
            </div>
          </div>

          {/* Comment lines */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[wave_1.5s_infinite]" />
            </div>
            <div className="h-4 w-5/6 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[wave_1.5s_infinite]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSkeleton;
