import { ITorrentService } from "@/types/services";
import { TorrentFileInfo } from "@/types/media";

/**
 * FakeTorrentService — mock implementation of ITorrentService.
 *
 * Simulates connecting to a torrent swarm and fetching metadata.
 * Returns realistic-looking but completely fabricated data.
 *
 * TODO: Replace with RealTorrentService that uses webtorrent / libtorrent
 *       to actually resolve magnet URIs and download metadata from peers.
 */
export class FakeTorrentService implements ITorrentService {
    private readonly SIMULATED_DELAY_MS = 1500;

    async fetchTorrentInfo(input: string): Promise<TorrentFileInfo> {
        // Simulate network + peer discovery delay
        await this.delay(this.SIMULATED_DELAY_MS);

        // TODO: In RealTorrentService, actually parse the magnet URI / .torrent
        //       file here and connect to DHT / trackers to obtain metadata.

        const hash = this.extractHash(input);

        return {
            name: this.generateFileName(input),
            totalSize: 2_340_000_000, // ~2.34 GB
            infoHash: hash,
            files: [
                {
                    path: "Movie.2024.BluRay.2160p.HEVC.Atmos-GROUP/Movie.2024.mkv",
                    size: 2_300_000_000,
                },
                {
                    path: "Movie.2024.BluRay.2160p.HEVC.Atmos-GROUP/Subs/English.srt",
                    size: 38_000_000,
                },
                {
                    path: "Movie.2024.BluRay.2160p.HEVC.Atmos-GROUP/Sample/sample.mkv",
                    size: 2_000_000,
                },
            ],
        };
    }

    // ── helpers ──────────────────────────────────────────────────────

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    private extractHash(input: string): string {
        const match = input.match(/btih:([a-fA-F0-9]{40})/);
        if (match) return match[1];
        // Fallback: generate a fake 40-char hex hash
        return Array.from({ length: 40 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join("");
    }

    private generateFileName(input: string): string {
        if (input.toLowerCase().endsWith(".torrent")) {
            return input.replace(/\.torrent$/i, "");
        }
        // Extract display name from magnet URI (&dn=...)
        const dnMatch = input.match(/[?&]dn=([^&]+)/);
        if (dnMatch) return decodeURIComponent(dnMatch[1]);
        return "Movie.2024.BluRay.2160p.HEVC.Atmos-GROUP";
    }
}
