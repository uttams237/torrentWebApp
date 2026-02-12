import { ITorrentService, IMediaMetadataService } from "@/types/services";
import { FakeTorrentService } from "./FakeTorrentService";
import { FakeMetadataService } from "./FakeMetadataService";

// ─── Service Registry ─────────────────────────────────────────────
//
// Centralised place to swap between Fake and Real service implementations.
//
// TODO: When running on a personal machine with real dependencies:
//   1. Import RealTorrentService and FFProbeMetadataService here.
//   2. Conditionally export based on env var, e.g.:
//        export const torrentService: ITorrentService =
//          process.env.USE_REAL_SERVICES === "true"
//            ? new RealTorrentService()
//            : new FakeTorrentService();

export const torrentService: ITorrentService = new FakeTorrentService();

export const metadataService: IMediaMetadataService = new FakeMetadataService();
