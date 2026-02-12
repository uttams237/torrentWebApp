"use client";

interface QualityBadgeProps {
    label: string;
    variant?: "info" | "success" | "premium" | "warning";
}

const VARIANT_CLASSES: Record<string, string> = {
    info: "bg-cyan-500/20 text-cyan-300 ring-cyan-400/30",
    success: "bg-emerald-500/20 text-emerald-300 ring-emerald-400/30",
    premium: "bg-violet-500/20 text-violet-300 ring-violet-400/30",
    warning: "bg-amber-500/20 text-amber-300 ring-amber-400/30",
};

export default function QualityBadge({ label, variant = "info" }: QualityBadgeProps) {
    return (
        <span
            className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
        ring-1 tracking-wide uppercase
        ${VARIANT_CLASSES[variant]}
      `}
        >
            {label}
        </span>
    );
}
