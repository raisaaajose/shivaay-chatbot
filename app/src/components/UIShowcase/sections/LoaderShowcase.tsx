"use client";

import React from "react";
import Loader from "../../ui/Loader/Loader";

export default function LoaderShowcase() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Loaders</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-300">Small</h4>
          <Loader variant="inline" size="sm" />
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-300">Medium</h4>
          <Loader variant="inline" size="md" />
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-300">Large</h4>
          <Loader variant="inline" size="lg" />
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-300">Extra Large</h4>
          <Loader variant="inline" size="xl" />
        </div>
      </div>

      <div className="space-y-4">
        <Loader variant="inline" text="Loading with text..." />
      </div>
    </div>
  );
}
