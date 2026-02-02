import "./globals.css";
import type { Metadata } from "next";
import SpotifyPlayer from "./components/SpotifyPlayer";

export const metadata: Metadata = {
  title: "アートギャラリー 0",
  description: "新しい価値を生み出していく"
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
        <SpotifyPlayer />
      </body>
    </html>
  );
}
