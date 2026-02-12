import { TorrentFileInfo, MediaAnalysisResult } from "./media";

// ─── Torrent Service Interface ────────────────────────────────────
// TODO: Replace FakeTorrentService with RealTorrentService that uses
//       webtorrent or libtorrent bindings when running on a personal machine.
export interface ITorrentService {
    /**
     * Given a magnet URI or .torrent filename, resolve torrent metadata
     * and return structured file information.
     */
    fetchTorrentInfo(input: string): Promise<TorrentFileInfo>;
}

// ─── Media Metadata Service Interface ─────────────────────────────
// TODO: Replace FakeMetadataService with FFProbeMetadataService that
//       shells out to ffprobe when the binary is available.
export interface IMediaMetadataService {
    /**
     * Given a file path (or identifier), extract codec / resolution /
     * bitrate metadata and return a structured result.
     */
    extractMetadata(filePath: string): Promise<MediaAnalysisResult>;
}
