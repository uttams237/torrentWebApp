import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Torrent Quality Inspector",
    description:
        "Analyze the media quality of torrent files — resolution, codec, bitrate, HDR, audio channels and more.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen antialiased">{children}</body>
        </html>
    );
}
