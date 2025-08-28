/**
 * Quick test to ensure all styled components work correctly
 */

import React from "react";
import {
  GlassContainer,
  GradientText,
  AnimatedSection,
  FeatureCard,
  GlowingButton,
  HeroBadge,
  FloatingElement,
} from "../lib/styled-components";

export const ComponentTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <AnimatedSection delay={0.2}>
        <GradientText
          as="h1"
          variant="hero"
          className="text-4xl font-bold mb-8 text-center"
        >
          Component Test
        </GradientText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <GlassContainer variant="light" className="p-6">
            <h3 className="text-lg font-semibold mb-3">Light Glass</h3>
            <p>Testing glassmorphism effects</p>
          </GlassContainer>

          <GlassContainer variant="medium" glow className="p-6">
            <h3 className="text-lg font-semibold mb-3">
              Medium Glass with Glow
            </h3>
            <p>Enhanced glass with glow animation</p>
          </GlassContainer>

          <GlassContainer variant="strong" className="p-6">
            <h3 className="text-lg font-semibold mb-3">Strong Glass</h3>
            <p>Maximum blur effect</p>
          </GlassContainer>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <GlowingButton variant="primary" shimmer>
            Primary Button
          </GlowingButton>

          <GlowingButton variant="secondary" size="lg">
            Secondary Button
          </GlowingButton>

          <GlowingButton variant="accent" size="sm">
            Accent Button
          </GlowingButton>
        </div>

        <div className="mb-8 text-center">
          <HeroBadge icon="🚀">Hero Badge Component</HeroBadge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FeatureCard
            icon="💬"
            title="AI Conversations"
            description="Natural language interactions"
            color="blue"
          />

          <FeatureCard
            icon="🌍"
            title="Multilingual Support"
            description="Global accessibility features"
            color="emerald"
          />
        </div>

        <div className="flex justify-center space-x-8">
          <FloatingElement duration={2} distance={15}>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
              ✨
            </div>
          </FloatingElement>

          <FloatingElement duration={3} distance={20}>
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl">
              🌟
            </div>
          </FloatingElement>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ComponentTest;
