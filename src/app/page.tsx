"use client";

import { useState, useCallback } from "react";
import AnalyzerForm from "@/components/AnalyzerForm";
import LoadingSteps from "@/components/LoadingSteps";
import ResultsCard from "@/components/ResultsCard";
import { AnalyzeResponse, AnalysisStep } from "@/types/media";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState<AnalysisStep | null>(null);
    const [result, setResult] = useState<AnalyzeResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async (input: string) => {
        setIsLoading(true);
        setResult(null);
        setError(null);

        // Simulate step progression for visual feedback
        const steps: AnalysisStep[] = [
            "validating",
            "connecting",
            "fetching_metadata",
            "analyzing_media",
        ];

        for (const step of steps) {
            setCurrentStep(step);
            // Small delay between visual step changes
            await new Promise((r) => setTimeout(r, 600));
        }

        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input }),
            });

            const data: AnalyzeResponse = await res.json();

            if (data.success) {
                setCurrentStep("complete");
                setResult(data);
            } else {
                setCurrentStep("error");
                setError(data.error || "Analysis failed.");
            }
        } catch {
            setCurrentStep("error");
            setError("Network error. Could not reach the server.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleReset = () => {
        setResult(null);
        setError(null);
        setCurrentStep(null);
    };

    return (
        <main className="flex flex-col items-center justify-start min-h-screen px-4 py-10 sm:py-16">
            {/* Hero */}
            <header className="text-center mb-10 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/[0.06] ring-1 ring-white/10 text-xs text-white/50 font-medium">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                    Mock Mode
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Torrent Quality
                    </span>
                    <br />
                    <span className="text-white">Inspector</span>
                </h1>
                <p className="mt-3 text-sm text-white/40 leading-relaxed">
                    Paste a magnet link or load a .torrent file to inspect video codec,
                    resolution, bitrate, HDR, and audio quality — instantly.
                </p>
            </header>

            {/* Form */}
            <AnalyzerForm onSubmit={handleAnalyze} isLoading={isLoading} />

            {/* Loading Steps */}
            {currentStep && currentStep !== "complete" && currentStep !== "error" && (
                <div className="mt-8 animate-fade-in-up">
                    <LoadingSteps currentStep={currentStep} />
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="mt-8 w-full max-w-md animate-fade-in-up">
                    <div className="px-5 py-4 rounded-2xl bg-red-500/10 ring-1 ring-red-400/20 text-sm text-red-300">
                        <p className="font-semibold mb-1">⚠ Analysis Failed</p>
                        <p className="text-red-300/70">{error}</p>
                    </div>
                </div>
            )}

            {/* Results */}
            {result?.success && result.torrent && result.media && (
                <div className="mt-8">
                    <ResultsCard torrent={result.torrent} media={result.media} />

                    <div className="text-center mt-6">
                        <button
                            onClick={handleReset}
                            className="
                px-5 py-2.5 text-sm font-medium rounded-xl
                text-white/50 bg-white/[0.04] ring-1 ring-white/10
                hover:text-white/70 hover:bg-white/[0.08]
                transition-all duration-150
              "
                        >
                            ← Analyze another
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="mt-auto pt-12 pb-6 text-center text-xs text-white/20">
                Torrent Quality Inspector · Mock Mode · Built with Next.js
            </footer>
        </main>
    );
}
