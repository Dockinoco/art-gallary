import "./globals.css";
import type { Metadata } from "next";
import SpotifyPlayer from "./components/SpotifyPlayer";

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
        <SpotifyPlayer />
      </body>
    </html>
  );
}
