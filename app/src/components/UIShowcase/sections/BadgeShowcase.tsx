"use client";

import React from "react";
import Badge from "../../ui/Badge/Badge";

export default function BadgeShowcase() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Badges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </div>
  );
}
