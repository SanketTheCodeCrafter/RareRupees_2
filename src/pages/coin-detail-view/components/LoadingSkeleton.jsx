import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Image Skeleton */}
      <div className="h-80 bg-muted/50 animate-pulse" />
      
      {/* Header Skeleton */}
      <div className="px-6 py-4 space-y-3">
        <div className="h-8 bg-muted/50 rounded-md animate-pulse" />
        <div className="flex space-x-3">
          <div className="h-6 w-16 bg-muted/50 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-muted/50 rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 bg-muted/50 rounded animate-pulse" />
              <div className="h-4 bg-muted/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="space-y-4 px-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-4 space-y-3 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted/50 rounded-lg" />
              <div className="h-5 w-32 bg-muted/50 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted/50 rounded" />
              <div className="h-4 w-3/4 bg-muted/50 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;