"use client";

import { AnalysisStep } from "@/types/media";

interface LoadingStepsProps {
    currentStep: AnalysisStep;
}

const STEPS: { key: AnalysisStep; label: string; icon: string }[] = [
    { key: "validating", label: "Validating input", icon: "🔍" },
    { key: "connecting", label: "Connecting to peers", icon: "🌐" },
    { key: "fetching_metadata", label: "Fetching metadata", icon: "📡" },
    { key: "analyzing_media", label: "Analyzing media", icon: "🎬" },
];

function stepIndex(step: AnalysisStep): number {
    return STEPS.findIndex((s) => s.key === step);
}

export default function LoadingSteps({ currentStep }: LoadingStepsProps) {
    const activeIdx = stepIndex(currentStep);

    return (
        <div className="w-full max-w-md mx-auto space-y-3">
            {STEPS.map((step, idx) => {
                const isActive = idx === activeIdx;
                const isDone = idx < activeIdx || currentStep === "complete";

                return (
                    <div
                        key={step.key}
                        className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500
              ${isActive ? "bg-white/10 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-500/10" : ""}
              ${isDone ? "opacity-60" : ""}
              ${!isActive && !isDone ? "opacity-30" : ""}
            `}
                    >
                        {/* status indicator */}
                        <div className="relative flex-shrink-0">
                            {isDone ? (
                                <span className="text-green-400 text-lg">✓</span>
                            ) : isActive ? (
                                <span className="inline-block animate-spin-slow text-lg">{step.icon}</span>
                            ) : (
                                <span className="text-white/30 text-lg">{step.icon}</span>
                            )}
                        </div>

                        {/* label */}
                        <span
                            className={`text-sm font-medium ${isActive ? "text-cyan-300" : isDone ? "text-white/60" : "text-white/30"
                                }`}
                        >
                            {step.label}
                        </span>

                        {/* active bar */}
                        {isActive && (
                            <div className="ml-auto w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full w-full bg-gradient-to-r from-cyan-400 to-violet-400 animate-loading-bar" />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
