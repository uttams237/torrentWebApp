/**
 * Input validation utilities for the analyze endpoint.
 */

const MAGNET_REGEX = /^magnet:\?xt=urn:btih:[a-fA-F0-9]{40}/;
const TORRENT_EXT_REGEX = /\.torrent$/i;

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

/**
 * Validates that the user-provided input is either a valid magnet URI
 * or a .torrent filename.
 */
export function validateInput(input: string): ValidationResult {
    if (!input || input.trim().length === 0) {
        return { valid: false, error: "Input is required. Paste a magnet link or provide a .torrent filename." };
    }

    const trimmed = input.trim();

    if (trimmed.startsWith("magnet:")) {
        if (!MAGNET_REGEX.test(trimmed)) {
            return {
                valid: false,
                error: "Invalid magnet link. Must contain a valid 40-character info hash.",
            };
        }
        return { valid: true };
    }

    if (TORRENT_EXT_REGEX.test(trimmed)) {
        return { valid: true };
    }

    return {
        valid: false,
        error: "Input must be a magnet link (magnet:?xt=urn:btih:...) or a .torrent filename.",
    };
}
