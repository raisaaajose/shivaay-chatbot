import Image from "next/image";

export default function Branding() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 w-1/2 p-8 xl:p-12 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="flex flex-col items-center gap-8 z-10 relative">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse" />
          <Image
            src="/icon.svg"
            alt="Shivaay Logo"
            width={120}
            height={120}
            className="w-24 h-24 xl:w-30 xl:h-30 relative z-10"
            style={{ boxShadow: "none" }}
          />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl xl:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            Welcome to Shivaay
          </h2>
          <p className="text-lg xl:text-xl text-gray-300 text-center max-w-sm leading-relaxed">
            Your intelligent AI companion for seamless conversations and smart
            automation
          </p>
        </div>

        {/* Features list */}
        <div className="space-y-3 mt-8">
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="text-sm xl:text-base">
              Advanced AI Conversations
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full" />
            <span className="text-sm xl:text-base">Smart Automation</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm xl:text-base">24/7 Availability</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 w-full text-center text-xs text-gray-400 opacity-70 z-10">
        © {new Date().getFullYear()} Shivaay. All rights reserved.
      </div>
    </div>
  );
}
