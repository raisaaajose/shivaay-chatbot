"use client";

import React from "react";
import Card from "../../ui/Card/Card";
import LoadingSkeleton from "../../ui/LoadingSkeleton/LoadingSkeleton";

export default function SkeletonShowcase() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Loading Skeletons</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card padding="md">
          <div className="space-y-3">
            <LoadingSkeleton variant="circular" width={48} height={48} />
            <LoadingSkeleton variant="text" lines={3} />
            <div className="flex gap-2">
              <LoadingSkeleton variant="rounded" width={80} height={32} />
              <LoadingSkeleton variant="rounded" width={80} height={32} />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="space-y-3">
            <LoadingSkeleton variant="rectangular" width="100%" height={120} />
            <LoadingSkeleton variant="text" lines={2} />
          </div>
        </Card>

        <Card padding="md">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LoadingSkeleton variant="circular" width={40} height={40} />
              <div className="flex-1 space-y-2">
                <LoadingSkeleton variant="text" width="60%" />
                <LoadingSkeleton variant="text" width="40%" />
              </div>
            </div>
            <LoadingSkeleton variant="text" lines={3} />
          </div>
        </Card>
      </div>
    </div>
  );
}
