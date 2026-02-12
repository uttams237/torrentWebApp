import { IMediaMetadataService } from "@/types/services";
import { MediaAnalysisResult } from "@/types/media";

/**
 * FakeMetadataService — mock implementation of IMediaMetadataService.
 *
 * Returns realistic, randomly varied media metadata without touching
 * any real files or requiring ffprobe.
 *
 * TODO: Replace with FFProbeMetadataService that runs:
 *       `ffprobe -v quiet -print_format json -show_format -show_streams <file>`
 *       and parses the JSON output into MediaAnalysisResult.
 */
export class FakeMetadataService implements IMediaMetadataService {
    async extractMetadata(_filePath: string): Promise<MediaAnalysisResult> {
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 800));

        // TODO: In FFProbeMetadataService, run ffprobe here and parse its output.
        return this.generateRandomMetadata();
    }

    // ── randomisation helpers ────────────────────────────────────────

    private pick<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    private generateRandomMetadata(): MediaAnalysisResult {
        const profile = this.pick(PROFILES);
        return {
            video: {
                resolution: profile.resolution,
                codec: profile.videoCodec,
                bitrate: profile.videoBitrate,
                frameRate: this.pick(["23.976 fps", "24 fps", "25 fps", "29.97 fps", "60 fps"]),
                hdr: profile.hdr,
            },
            audio: {
                codec: profile.audioCodec,
                channels: profile.channels,
                bitrate: profile.audioBitrate,
            },
            container: {
                format: this.pick(["MKV (Matroska)", "MP4 (MPEG-4)"]),
                fileSize: profile.fileSize,
            },
        };
    }
}

// ── Pre-defined realistic profiles ──────────────────────────────────
interface MediaProfile {
    resolution: string;
    videoCodec: string;
    videoBitrate: string;
    hdr?: string;
    audioCodec: string;
    channels: string;
    audioBitrate: string;
    fileSize: string;
}

const PROFILES: MediaProfile[] = [
    // 720p
    {
        resolution: "1280×720 (720p)",
        videoCodec: "H.264 (AVC)",
        videoBitrate: "3.2 Mbps",
        audioCodec: "AAC",
        channels: "2.0 Stereo",
        audioBitrate: "192 kbps",
        fileSize: "1.4 GB",
    },
    // 1080p H.264
    {
        resolution: "1920×1080 (1080p)",
        videoCodec: "H.264 (AVC)",
        videoBitrate: "8.5 Mbps",
        audioCodec: "DTS",
        channels: "5.1 Surround",
        audioBitrate: "1536 kbps",
        fileSize: "4.7 GB",
    },
    // 1080p HEVC
    {
        resolution: "1920×1080 (1080p)",
        videoCodec: "H.265 (HEVC)",
        videoBitrate: "5.2 Mbps",
        audioCodec: "AAC",
        channels: "5.1 Surround",
        audioBitrate: "256 kbps",
        fileSize: "2.3 GB",
    },
    // 4K HDR HEVC + Atmos
    {
        resolution: "3840×2160 (4K UHD)",
        videoCodec: "H.265 (HEVC)",
        videoBitrate: "42 Mbps",
        hdr: "Dolby Vision / HDR10+",
        audioCodec: "Dolby Atmos (TrueHD)",
        channels: "7.1.4 Object-Based",
        audioBitrate: "4608 kbps",
        fileSize: "58.2 GB",
    },
    // 4K AV1
    {
        resolution: "3840×2160 (4K UHD)",
        videoCodec: "AV1",
        videoBitrate: "18 Mbps",
        hdr: "HDR10",
        audioCodec: "Opus",
        channels: "5.1 Surround",
        audioBitrate: "320 kbps",
        fileSize: "12.6 GB",
    },
    // 1080p AV1 + DTS
    {
        resolution: "1920×1080 (1080p)",
        videoCodec: "AV1",
        videoBitrate: "4.0 Mbps",
        audioCodec: "DTS-HD MA",
        channels: "7.1 Surround",
        audioBitrate: "3200 kbps",
        fileSize: "6.1 GB",
    },
];
