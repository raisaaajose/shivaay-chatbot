"use client";

import React from "react";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";

interface ModalShowcaseProps {
  setModalOpen: (open: boolean) => void;
}

export default function ModalShowcase({ setModalOpen }: ModalShowcaseProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Modal</h2>

      <div className="flex gap-4">
        <AnimatedButton variant="secondary" onClick={() => setModalOpen(true)}>
          Open Enhanced Modal
        </AnimatedButton>
      </div>
    </div>
  );
}
