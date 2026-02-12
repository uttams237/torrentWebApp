"use client";

import { MediaAnalysisResult, TorrentFileInfo } from "@/types/media";
import { formatFileSize } from "@/utils/format";
import QualityBadge from "./QualityBadge";

interface ResultsCardProps {
    torrent: TorrentFileInfo;
    media: MediaAnalysisResult;
}

export default function ResultsCard({ torrent, media }: ResultsCardProps) {
    // Build quality badges
    const badges: { label: string; variant: "info" | "success" | "premium" | "warning" }[] = [];

    if (media.video.resolution.includes("4K")) badges.push({ label: "4K UHD", variant: "premium" });
    else if (media.video.resolution.includes("1080p")) badges.push({ label: "1080p", variant: "success" });
    else if (media.video.resolution.includes("720p")) badges.push({ label: "720p", variant: "info" });

    if (media.video.hdr) badges.push({ label: media.video.hdr.split("/")[0].trim(), variant: "premium" });
    if (media.audio.codec.toLowerCase().includes("atmos")) badges.push({ label: "Atmos", variant: "premium" });
    if (media.video.codec.includes("AV1")) badges.push({ label: "AV1", variant: "success" });
    if (media.video.codec.includes("HEVC")) badges.push({ label: "HEVC", variant: "success" });

    return (
        <div className="w-full max-w-md mx-auto animate-fade-in-up">
            {/* Header */}
            <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] ring-1 ring-white/10 shadow-2xl overflow-hidden">
                {/* Title bar */}
                <div className="px-5 py-4 border-b border-white/[0.06]">
                    <h2 className="text-base font-bold text-white truncate">{torrent.name}</h2>
                    <p className="text-xs text-white/40 mt-1 font-mono truncate">
                        {torrent.infoHash}
                    </p>
                </div>

                {/* Badges */}
                <div className="px-5 py-3 flex flex-wrap gap-2 border-b border-white/[0.06]">
                    {badges.map((b) => (
                        <QualityBadge key={b.label} label={b.label} variant={b.variant} />
                    ))}
                </div>

                {/* Video section */}
                <Section title="🎥  Video" icon="">
                    <Row label="Resolution" value={media.video.resolution} />
                    <Row label="Codec" value={media.video.codec} />
                    <Row label="Bitrate" value={media.video.bitrate} />
                    <Row label="Frame Rate" value={media.video.frameRate} />
                    {media.video.hdr && <Row label="HDR" value={media.video.hdr} highlight />}
                </Section>

                {/* Audio section */}
                <Section title="🔊  Audio" icon="">
                    <Row label="Codec" value={media.audio.codec} />
                    <Row label="Channels" value={media.audio.channels} />
                    <Row label="Bitrate" value={media.audio.bitrate} />
                </Section>

                {/* Container section */}
                <Section title="📦  Container" icon="" last>
                    <Row label="Format" value={media.container.format} />
                    <Row label="File Size" value={media.container.fileSize} />
                    <Row label="Total Size" value={formatFileSize(torrent.totalSize)} />
                    <Row label="Files" value={`${torrent.files.length} files`} />
                </Section>
            </div>
        </div>
    );
}

// ── Sub-components ────────────────────────────────────────────────

function Section({
    title,
    children,
    last,
}: {
    title: string;
    icon: string;
    children: React.ReactNode;
    last?: boolean;
}) {
    return (
        <div className={`px-5 py-4 ${last ? "" : "border-b border-white/[0.06]"}`}>
            <h3 className="text-sm font-semibold text-white/70 mb-3">{title}</h3>
            <div className="space-y-2">{children}</div>
        </div>
    );
}

function Row({
    label,
    value,
    highlight,
}: {
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-xs text-white/40">{label}</span>
            <span
                className={`text-sm font-medium ${highlight ? "text-violet-300" : "text-white/90"
                    }`}
            >
                {value}
            </span>
        </div>
    );
}
