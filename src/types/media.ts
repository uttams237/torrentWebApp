// ─── Media Analysis Result ────────────────────────────────────────
export interface VideoInfo {
    resolution: string;
    codec: string;
    bitrate: string;
    frameRate: string;
    hdr?: string;
}

export interface AudioInfo {
    codec: string;
    channels: string;
    bitrate: string;
}

export interface ContainerInfo {
    format: string;
    fileSize: string;
}

export interface MediaAnalysisResult {
    video: VideoInfo;
    audio: AudioInfo;
    container: ContainerInfo;
}

// ─── Torrent File Info ────────────────────────────────────────────
export interface TorrentFileEntry {
    path: string;
    size: number; // bytes
}

export interface TorrentFileInfo {
    name: string;
    totalSize: number; // bytes
    files: TorrentFileEntry[];
    infoHash: string;
}

// ─── API shapes ───────────────────────────────────────────────────
export interface AnalyzeRequest {
    input: string; // magnet URI or torrent filename
}

export type AnalysisStep =
    | "validating"
    | "connecting"
    | "fetching_metadata"
    | "analyzing_media"
    | "complete"
    | "error";

export interface AnalyzeResponse {
    success: boolean;
    step: AnalysisStep;
    torrent?: TorrentFileInfo;
    media?: MediaAnalysisResult;
    error?: string;
}
