/**
 * Formatting utilities for display purposes.
 */

/**
 * Format bytes into a human-readable file size string.
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(value >= 100 ? 0 : 1)} ${units[i]}`;
}

/**
 * Format a bitrate number (bps) into Kbps / Mbps string.
 */
export function formatBitrate(bps: number): string {
    if (bps >= 1_000_000) return `${(bps / 1_000_000).toFixed(1)} Mbps`;
    if (bps >= 1_000) return `${(bps / 1_000).toFixed(0)} Kbps`;
    return `${bps} bps`;
}
