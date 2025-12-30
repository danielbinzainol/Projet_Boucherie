import React from 'react';

interface SkeletonCardProps {
  variant?: 'standard' | 'list' | 'rustic';
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ variant = 'standard' }) => {
  if (variant === 'list') {
    return (
      <div className="flex gap-4 rounded-xl bg-white border border-gray-100 p-3 shadow-sm">
        <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-gray-200 animate-pulse" />
        <div className="flex flex-1 flex-col justify-between py-1">
          <div>
            <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse mb-2" />
            <div className="h-3 w-1/4 rounded bg-gray-200 animate-pulse mb-2" />
          </div>
          <div className="h-8 w-full rounded-md bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === 'rustic') {
    return (
      <div className="overflow-hidden rounded-sm bg-[#1c1917] border-2 border-[#44403c]">
        <div className="aspect-square bg-[#292524] animate-pulse" />
        <div className="p-5 space-y-4">
          <div className="h-8 w-3/4 rounded bg-[#292524] animate-pulse" />
          <div className="h-4 w-full rounded bg-[#292524] animate-pulse" />
          <div className="h-12 w-full rounded bg-[#292524] animate-pulse mt-4" />
        </div>
      </div>
    );
  }

  // Standard variant
  return (
    <div className="overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm">
      <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
           <div className="space-y-2 w-full">
              <div className="h-3 w-1/4 rounded bg-gray-200 animate-pulse" />
              <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
           </div>
        </div>
        <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse mt-2" />
      </div>
    </div>
  );
};