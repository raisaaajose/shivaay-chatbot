"use client";

import React from "react";
import Card from "../../ui/Card/Card";
import Badge from "../../ui/Badge/Badge";
import ErrorBoundary from "../../ui/ErrorBoundary/ErrorBoundary";

export default function ErrorBoundaryShowcase() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Error Boundary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="md">
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Normal Component</h4>
            <p className="text-slate-400 text-sm">
              This component works normally and won&apos;t trigger the error
              boundary.
            </p>
            <div className="flex gap-2">
              <Badge variant="success">Working</Badge>
              <Badge variant="primary">Normal</Badge>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Error Boundary Demo</h4>
            <p className="text-slate-400 text-sm">
              Error boundaries catch JavaScript errors anywhere in the component
              tree and display a fallback UI instead of crashing the entire app.
            </p>
            <ErrorBoundary>
              <div className="p-3 bg-slate-800 rounded">
                <p className="text-green-400 text-sm">
                  ✓ Protected by ErrorBoundary
                </p>
              </div>
            </ErrorBoundary>
          </div>
        </Card>
      </div>
    </div>
  );
}
