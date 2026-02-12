"use client";

import { useState, useRef } from "react";

interface AnalyzerFormProps {
    onSubmit: (input: string) => void;
    isLoading: boolean;
}

export default function AnalyzerForm({ onSubmit, isLoading }: AnalyzerFormProps) {
    const [input, setInput] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) onSubmit(input.trim());
    };

    const handleFileClick = () => {
        // TODO: In real implementation, read the .torrent file and extract
        //       its info hash or pass the binary data to the API.
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // For the mock, just use the filename
            setInput(file.name);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
            {/* Magnet link input */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" />
                <textarea
                    id="magnet-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste magnet link here…"
                    rows={3}
                    disabled={isLoading}
                    className="
            relative w-full px-4 py-3.5 text-sm
            bg-white/[0.06] text-white placeholder-white/30
            border border-white/10 rounded-2xl
            focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-transparent
            resize-none transition-all duration-200
            disabled:opacity-50
          "
                />
            </div>

            {/* Action row */}
            <div className="flex gap-3">
                {/* Upload .torrent (mocked) */}
                <button
                    type="button"
                    onClick={handleFileClick}
                    disabled={isLoading}
                    className="
            flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium
            bg-white/[0.06] text-white/60 border border-white/10
            hover:bg-white/10 hover:text-white/80
            active:scale-[0.97] transition-all duration-150
            disabled:opacity-40 disabled:pointer-events-none
          "
                >
                    📎 .torrent
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".torrent"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Analyze button */}
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="
            flex-1 relative px-6 py-3 rounded-xl text-sm font-bold
            overflow-hidden transition-all duration-200
            disabled:opacity-40 disabled:pointer-events-none
            active:scale-[0.97]
            group
          "
                >
                    {/* Gradient BG */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 transition-opacity group-hover:opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative text-white flex items-center justify-center gap-2">
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Analyzing…
                            </>
                        ) : (
                            "🔬 Analyze Quality"
                        )}
                    </span>
                </button>
            </div>
        </form>
    );
}
