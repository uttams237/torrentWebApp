import { AnalyzeResponse } from "@/types/media";
import { torrentService, metadataService } from "@/services";
import { validateInput } from "./validators";

/**
 * Core analysis orchestrator.
 *
 * Coordinates the full flow:
 *   validate → fetch torrent info → extract media metadata
 *
 * All business logic lives here — the API route is kept thin.
 */
export async function analyzeMedia(input: string): Promise<AnalyzeResponse> {
    // 1. Validate
    const validation = validateInput(input);
    if (!validation.valid) {
        return {
            success: false,
            step: "error",
            error: validation.error,
        };
    }

    try {
        // 2. Fetch torrent metadata
        // TODO: In production, this step would connect to the torrent network
        //       and could take much longer. Consider streaming step updates
        //       via Server-Sent Events or WebSocket instead of blocking.
        const torrentInfo = await torrentService.fetchTorrentInfo(input.trim());

        // Pick the largest file (likely the main media file)
        const mainFile = torrentInfo.files.reduce((a, b) =>
            a.size > b.size ? a : b
        );

        // 3. Extract media metadata
        // TODO: In production, this requires the file to be at least partially
        //       downloaded so ffprobe can read the headers.
        const mediaResult = await metadataService.extractMetadata(mainFile.path);

        return {
            success: true,
            step: "complete",
            torrent: torrentInfo,
            media: mediaResult,
        };
    } catch (err) {
        return {
            success: false,
            step: "error",
            error: err instanceof Error ? err.message : "An unexpected error occurred.",
        };
    }
}
