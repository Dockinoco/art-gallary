import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art Gallary",
  description: "ゆったり眺める美術コレクション"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        <div className="spotify" aria-label="Spotify playlist">
          <iframe
            src="https://open.spotify.com/embed/playlist/0iJEh2BsvSw8V3lDTkiUK7"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify playlist"
          />
        </div>
      </body>
    </html>
  );
}
