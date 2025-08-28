"use client";

import React from "react";
import Card from "../../ui/Card/Card";
import { Star, Zap } from "lucide-react";
import useNotification from "../../ui/Notification/Notification";

export default function CardShowcase() {
  const { notify } = useNotification();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Cards</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card variant="default" padding="md">
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Default Card</h4>
            <p className="text-slate-400 text-sm">
              A simple card with default styling and padding.
            </p>
          </div>
        </Card>

        <Card variant="elevated" padding="lg" hoverable>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <h4 className="font-semibold text-white">Elevated Card</h4>
            </div>
            <p className="text-slate-400 text-sm">
              An elevated card with hover effects and more padding.
            </p>
          </div>
        </Card>

        <Card
          variant="interactive"
          padding="lg"
          clickable
          onClick={() => notify("Interactive card clicked!", "info")}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-400" />
              <h4 className="font-semibold text-white">Interactive Card</h4>
            </div>
            <p className="text-slate-400 text-sm">
              Click this card to see the interaction feedback.
            </p>
          </div>
        </Card>

        <Card variant="default" padding="sm" disabled>
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Disabled Card</h4>
            <p className="text-slate-400 text-sm">
              This card is disabled and not interactive.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
