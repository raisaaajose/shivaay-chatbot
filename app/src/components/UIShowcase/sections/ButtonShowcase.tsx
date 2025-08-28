"use client";

import React from "react";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";
import { Save, Trash2, Check, Code } from "lucide-react";
import useNotification from "../../ui/Notification/Notification";

export default function ButtonShowcase() {
  const { notify } = useNotification();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Animated Buttons</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatedButton
          variant="primary"
          onClick={() => notify("Primary button clicked", "info")}
        >
          Primary
        </AnimatedButton>
        <AnimatedButton
          variant="secondary"
          onClick={() => notify("Secondary button clicked", "info")}
        >
          Secondary
        </AnimatedButton>
        <AnimatedButton
          variant="success"
          onClick={() => notify("Success!", "success")}
        >
          Success
        </AnimatedButton>
        <AnimatedButton
          variant="danger"
          onClick={() => notify("Danger!", "error")}
        >
          Danger
        </AnimatedButton>
        <AnimatedButton
          variant="warning"
          onClick={() => notify("Warning!", "warning")}
        >
          Warning
        </AnimatedButton>
        <AnimatedButton variant="ghost" disabled>
          Disabled
        </AnimatedButton>
        <AnimatedButton
          variant="outline"
          icon={<Save />}
          onClick={() => notify("Saved!", "success")}
        >
          Save
        </AnimatedButton>
        <AnimatedButton
          variant="danger"
          icon={<Trash2 />}
          onClick={() => notify("Deleted!", "error")}
          size="lg"
        >
          Delete
        </AnimatedButton>
        <AnimatedButton variant="success" icon={<Check />} loading size="sm">
          Loading...
        </AnimatedButton>
        <AnimatedButton
          onClick={() => notify("Icon button clicked!", "info")}
          icon={<Code />}
          size="icon"
          variant="primary"
        />
      </div>
    </div>
  );
}
