"use client";

import React from "react";
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";
import Textarea from "../../ui/Textarea/Textarea";
import { Heart } from "lucide-react";

interface FormShowcaseProps {
  selectOptions: Array<{ value: string; label: string; disabled?: boolean }>;
  selectedOption1: string;
  setSelectedOption1: (value: string) => void;
  selectedOption2: string;
  setSelectedOption2: (value: string) => void;
  selectedOption3: string;
  setSelectedOption3: (value: string) => void;
  selectedOption4: string;
  setSelectedOption4: (value: string) => void;
}

export default function FormShowcase({
  selectOptions,
  selectedOption1,
  setSelectedOption1,
  selectedOption2,
  setSelectedOption2,
  selectedOption3,
  setSelectedOption3,
  selectedOption4,
  setSelectedOption4,
}: FormShowcaseProps) {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
