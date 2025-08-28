/**
 * Example Usage of Shivaay Design System Components
 * This file demonstrates how to use the enhanced UI components with landing page aesthetics
 */

import React from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../components/ui/AnimatedButton/AnimatedButton";
import Card from "../components/ui/Card/Card";
import {
  GlassContainer,
  GradientText,
  AnimatedSection,
  FeatureCard,
  GlowingButton,
  HeroBadge,
  FloatingElement,
} from "../lib/styled-components";
import { containerVariants, itemVariants } from "../lib/animations";

export const DesignSystemExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Hero Section with Glassmorphism */}
      <AnimatedSection className="text-center mb-16">
        <HeroBadge icon="🚀" className="mb-8">
          Shivaay Design System
        </HeroBadge>

        <GradientText
          as="h1"
          variant="hero"
          className="text-6xl font-bold mb-6"
        >
          Beautiful UI Components
        </GradientText>

        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Experience the power of glassmorphism, smooth animations, and gradient
          aesthetics inspired by our landing page design.
        </p>

        <div className="flex gap-4 justify-center">
          <GlowingButton variant="primary" size="lg" shimmer>
            Get Started
          </GlowingButton>

          <AnimatedButton variant="glass" size="lg">
            Learn More
          </AnimatedButton>
        </div>
      </AnimatedSection>

      {/* Glass Containers Example */}
      <AnimatedSection className="mb-16">
        <GradientText
          as="h2"
          variant="primary"
          className="text-3xl font-bold mb-8 text-center"
        >
          Glass Containers
        </GradientText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassContainer variant="light" className="p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-400">
              Light Glass
            </h3>
            <p className="text-gray-300">
              Subtle glassmorphism effect with light background blur.
            </p>
          </GlassContainer>

          <GlassContainer variant="medium" className="p-6" glow>
            <h3 className="text-lg font-semibold mb-3 text-purple-400">
              Medium Glass with Glow
            </h3>
            <p className="text-gray-300">
              Enhanced glass effect with animated glow border.
            </p>
          </GlassContainer>

          <GlassContainer variant="strong" className="p-6">
            <h3 className="text-lg font-semibold mb-3 text-cyan-400">
              Strong Glass
            </h3>
            <p className="text-gray-300">
              Maximum glass effect with heavy background blur.
            </p>
          </GlassContainer>
        </div>
      </AnimatedSection>

      {/* Enhanced Cards */}
      <AnimatedSection className="mb-16">
        <GradientText
          as="h2"
          variant="secondary"
          className="text-3xl font-bold mb-8 text-center"
        >
          Enhanced Cards
        </GradientText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="glass" hoverable glow className="p-6">
            <h3 className="text-xl font-semibold mb-3">Glass Card</h3>
            <p className="text-gray-300">
              Elegant card with glassmorphism effects and hover animations.
            </p>
          </Card>

          <Card variant="gradient" hoverable className="p-6">
            <h3 className="text-xl font-semibold mb-3">Gradient Card</h3>
            <p className="text-gray-300">
              Beautiful gradient background with smooth transitions.
            </p>
          </Card>

          <Card variant="feature" hoverable className="p-6">
            <h3 className="text-xl font-semibold mb-3">Feature Card</h3>
            <p className="text-gray-300">
              Special styling for feature highlights with enhanced effects.
            </p>
          </Card>
        </div>
      </AnimatedSection>

      {/* Feature Cards Grid */}
      <AnimatedSection className="mb-16">
        <GradientText
          as="h2"
          variant="accent"
          className="text-3xl font-bold mb-8 text-center"
        >
          Feature Showcase
        </GradientText>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <FeatureCard
              icon="💬"
              title="AI Conversations"
              description="Natural language interactions powered by advanced AI models"
              color="blue"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon="🌍"
              title="Multilingual"
              description="Support for multiple languages with seamless translation"
              color="emerald"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon="🔍"
              title="Smart Search"
              description="Vector-powered semantic search for accurate results"
              color="purple"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon="🚀"
              title="High Performance"
              description="Optimized for speed and smooth user experience"
              color="orange"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon="🎨"
              title="Beautiful Design"
              description="Modern glassmorphism UI with stunning visual effects"
              color="cyan"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon="🔒"
              title="Secure & Private"
              description="Enterprise-grade security with data protection"
              color="rose"
            />
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Button Variants */}
      <AnimatedSection className="mb-16">
        <GradientText
          as="h2"
          variant="primary"
          className="text-3xl font-bold mb-8 text-center"
        >
          Enhanced Buttons
        </GradientText>

        <div className="flex flex-wrap gap-4 justify-center">
          <AnimatedButton variant="primary" shimmer glow>
            Primary Button
          </AnimatedButton>

          <AnimatedButton variant="glass" size="lg">
            Glass Button
          </AnimatedButton>

          <AnimatedButton variant="gradient" glow>
            Gradient Button
          </AnimatedButton>

          <AnimatedButton variant="outline" size="sm">
            Outline Button
          </AnimatedButton>

          <GlowingButton variant="secondary" shimmer>
            Glowing Button
          </GlowingButton>
        </div>
      </AnimatedSection>

      {/* Floating Elements */}
      <AnimatedSection className="text-center">
        <GradientText
          as="h2"
          variant="hero"
          className="text-3xl font-bold mb-8"
        >
          Floating Animations
        </GradientText>

        <div className="flex justify-center space-x-8">
          <FloatingElement duration={2} distance={15}>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl animate-glow">
              ✨
            </div>
          </FloatingElement>

          <FloatingElement duration={3} distance={20}>
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl animate-pulse-glow">
              🌟
            </div>
          </FloatingElement>

          <FloatingElement duration={2.5} distance={12}>
            <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-xl animate-shimmer">
              💫
            </div>
          </FloatingElement>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default DesignSystemExample;
