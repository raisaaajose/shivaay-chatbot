"use client";

import React from "react";
import AnimatedButton from "../ui/AnimatedButton/AnimatedButton";
import Card from "../ui/Card/Card";
import Input from "../ui/Input/Input";
import Select from "../ui/Select/Select";
import Textarea from "../ui/Textarea/Textarea";
import Badge from "../ui/Badge/Badge";
import LoadingSkeleton from "../ui/LoadingSkeleton/LoadingSkeleton";
import ErrorBoundary from "../ui/ErrorBoundary/ErrorBoundary";
import { Save, Trash2, Check, Code, Star, Heart, Zap } from "lucide-react";
import useNotification from "../ui/Notification/Notification";
import Loader from "../ui/Loader/Loader";
import Modal from "../ui/Modal/Modal";

export default function UIPage() {
  const selectOptions = [
    { value: "", label: "Select an option" },
    { value: "one", label: "Option One" },
    { value: "two", label: "Option Two" },
    { value: "three", label: "Option Three", disabled: true },
  ];
  const { notify } = useNotification();
  const [loading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [selectedOption1, setSelectedOption1] = React.useState("");
  const [selectedOption2, setSelectedOption2] = React.useState("");
  const [selectedOption3, setSelectedOption3] = React.useState("one");
  const [selectedOption4, setSelectedOption4] = React.useState("");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
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

      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      <section className="space-y-6">
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
      </section>

      <section className="space-y-6">
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
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Form Inputs</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Input
              placeholder="Enter your email"
              helperText="We'll never share your email address."
            />

            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              helperText="Required for account creation."
              required
            />

            <Input
              label="Current Value"
              value="Read-only value"
              readOnly
              helperText="This field cannot be edited."
            />

            <Input
              label="With Icon"
              icon={<Heart className="h-4 w-4" />}
              placeholder="Enter your favorite thing"
              helperText="Tell us what you love most."
            />

            <Input
              label="Error State"
              error="This email address is already taken"
              placeholder="john@example.com"
              helperText="This won't show when there's an error."
            />

            <Input
              label="Disabled Input"
              disabled
              placeholder="This is disabled"
              helperText="Cannot interact with this field."
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              helperText="Must be at least 8 characters long."
            />
          </div>

          <div className="space-y-6">
            <Select
              options={selectOptions}
              value={selectedOption1}
              onChange={setSelectedOption1}
              helperText="Choose from available options."
            />

            <Select
              id="country"
              label="Country"
              options={selectOptions}
              value={selectedOption2}
              onChange={setSelectedOption2}
              helperText="Select your country of residence."
              required
            />

            <Select
              label="Pre-selected"
              options={selectOptions}
              value={selectedOption3}
              onChange={setSelectedOption3}
              helperText="This select has a default value."
            />

            <Select
              label="Error State"
              error="Please select a valid option"
              options={selectOptions}
              value={selectedOption4}
              onChange={setSelectedOption4}
              helperText="This won't show when there's an error."
            />

            <Select
              label="Disabled Select"
              options={selectOptions}
              value=""
              onChange={() => {}}
              disabled
              helperText="This select is disabled."
            />

            <Textarea
              placeholder="Tell us about yourself..."
              helperText="Maximum 500 characters."
              resize="vertical"
            />

            <Textarea
              id="bio"
              label="Biography"
              placeholder="Write a short bio..."
              helperText="This will be displayed on your profile."
              required
              resize="none"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
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
      </section>

      <section className="space-y-6">
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
              <LoadingSkeleton
                variant="rectangular"
                width="100%"
                height={120}
              />
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
      </section>

      <section className="space-y-6">
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
                Error boundaries catch JavaScript errors anywhere in the
                component tree and display a fallback UI instead of crashing the
                entire app.
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
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Modal</h2>

        <div className="flex gap-4">
          <AnimatedButton
            variant="secondary"
            onClick={() => setModalOpen(true)}
          >
            Open Enhanced Modal
          </AnimatedButton>
        </div>
      </section>
    </div>
  );
}
