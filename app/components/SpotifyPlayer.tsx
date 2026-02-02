"use client";

import { useState } from "react";

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="spotify-wrapper">
      {isOpen && (
        <div className="spotify-panel">
          <iframe
            src="https://open.spotify.com/embed/playlist/0iJEh2BsvSw8V3lDTkiUK7"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify playlist"
          />
        </div>
      )}
      <button
        type="button"
        className="spotify-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Spotifyプレイヤーを閉じる" : "Spotifyプレイヤーを開く"}
      >
        ♫
      </button>
    </div>
  );
}
