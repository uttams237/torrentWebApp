import { NextRequest, NextResponse } from "next/server";
import { analyzeMedia } from "@/lib/analyzer";
import { AnalyzeRequest } from "@/types/media";

/**
 * POST /api/analyze
 *
 * Accepts a JSON body with `{ input: string }` where input is either
 * a magnet URI or a .torrent filename.
 *
 * Returns a structured AnalyzeResponse.
 *
 * This route intentionally contains NO business logic — all orchestration
 * lives in lib/analyzer.ts for clean separation of concerns.
 */
export async function POST(request: NextRequest) {
    try {
        const body: AnalyzeRequest = await request.json();
        const result = await analyzeMedia(body.input);

        return NextResponse.json(result, {
            status: result.success ? 200 : 400,
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                step: "error",
                error: "Invalid request body. Expected JSON with { input: string }.",
            },
            { status: 400 }
        );
    }
}
