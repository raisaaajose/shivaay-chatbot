"use client";

import React from "react";
import Badge from "../ui/Badge/Badge";
import Loader from "../ui/Loader/Loader";
import Modal from "../ui/Modal/Modal";
import {
  BadgeShowcase,
  ButtonShowcase,
  CardShowcase,
  FormShowcase,
  LoaderShowcase,
  SkeletonShowcase,
  ErrorBoundaryShowcase,
  ModalShowcase,
} from "./sections";

export default function UIPage() {
  const selectOptions = [
    { value: "", label: "Select an option" },
    { value: "one", label: "Option One" },
    { value: "two", label: "Option Two" },
    { value: "three", label: "Option Three", disabled: true },
  ];
  const [loading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [selectedOption1, setSelectedOption1] = React.useState("");
  const [selectedOption2, setSelectedOption2] = React.useState("");
  const [selectedOption3, setSelectedOption3] = React.useState("one");
  const [selectedOption4, setSelectedOption4] = React.useState("");

  return (
    <div className="container-sidebar-aware p-6 space-y-12">
      {loading && <Loader variant="overlay" text="Loading components..." />}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Enhanced Demo Modal"
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            This is an improved modal with better styling and accessibility. It
            includes proper focus management and can be closed using the escape
            key or clicking outside.
          </p>
          <div className="flex gap-2">
            <Badge variant="primary">New</Badge>
            <Badge variant="success">Improved</Badge>
            <Badge variant="outline">Beta</Badge>
          </div>
        </div>
      </Modal>

      <BadgeShowcase />

      <ButtonShowcase />

      <CardShowcase />

      <FormShowcase
        selectOptions={selectOptions}
        selectedOption1={selectedOption1}
        setSelectedOption1={setSelectedOption1}
        selectedOption2={selectedOption2}
        setSelectedOption2={setSelectedOption2}
        selectedOption3={selectedOption3}
        setSelectedOption3={setSelectedOption3}
        selectedOption4={selectedOption4}
        setSelectedOption4={setSelectedOption4}
      />

      <LoaderShowcase />

      <SkeletonShowcase />

      <ErrorBoundaryShowcase />

      <ModalShowcase setModalOpen={setModalOpen} />
    </div>
  );
}
