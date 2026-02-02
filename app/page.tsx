"use client";

import { useEffect, useMemo, useState } from "react";
import artworksData from "../data/artworks.json";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year?: string;
  tags: string[];
  image: string;
}

const STORAGE_KEY = "art-gallary:favorites";

export default function HomePage() {
  const artworks = artworksData as Artwork[];
  const [query, setQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isViewerUiVisible, setIsViewerUiVisible] = useState(true);

  const artists = useMemo(() => {
    return Array.from(new Set(artworks.map((art) => art.artist))).sort();
  }, [artworks]);

  const filteredArtworks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return artworks.filter((art) => {
      const matchesArtist = selectedArtist === "all" || art.artist === selectedArtist;
      const matchesQuery =
        q.length === 0 ||
        art.title.toLowerCase().includes(q) ||
        art.artist.toLowerCase().includes(q) ||
        art.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesArtist && matchesQuery;
    });
  }, [artworks, query, selectedArtist]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  useEffect(() => {
    if (activeIndex === null) return;
    if (filteredArtworks.length === 0) {
      setActiveIndex(null);
      return;
    }
    if (activeIndex >= filteredArtworks.length) {
      setActiveIndex(filteredArtworks.length - 1);
    }
  }, [filteredArtworks, activeIndex]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        setIsViewerUiVisible((prev) => !prev);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredArtworks.length
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredArtworks.length) % filteredArtworks.length
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, filteredArtworks.length]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", activeIndex !== null);
    if (activeIndex === null) {
      setIsViewerUiVisible(true);
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [activeIndex]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const activeArtwork = activeIndex !== null ? filteredArtworks[activeIndex] : null;

  return (
    <main>
      <section className="header">
        <h1>アートギャラリー 0</h1>
        <p>
          新しい価値を生み出していく０の挑戦。
        </p>
        <div className="controls">
          <input
            type="search"
            placeholder="タイトル・作者・タグで検索"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="検索"
          />
          <select
            value={selectedArtist}
            onChange={(event) => setSelectedArtist(event.target.value)}
            aria-label="作者で絞り込み"
          >
            <option value="all">すべての作者</option>
            {artists.map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </div>
        <div className="results">
          {filteredArtworks.length} 点の作品が見つかりました
        </div>
      </section>

      {filteredArtworks.length === 0 ? (
        <div className="empty">該当する作品がありません。</div>
      ) : (
        <section className="masonry">
          {filteredArtworks.map((art, index) => (
            <article
              key={art.id}
              className="card"
              onClick={() => setActiveIndex(index)}
              role="button"
              tabIndex={0}
              aria-label={`${art.title} / ${art.artist}`}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveIndex(index);
                }
              }}
            >
              <div className="card-media">
                <img src={art.image} alt={art.title} loading="lazy" />
                <button
                  type="button"
                  className={`favorite ${favorites.has(art.id) ? "active" : ""}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(art.id);
                  }}
                  aria-label={favorites.has(art.id) ? "お気に入り解除" : "お気に入り"}
                >
                  {favorites.has(art.id) ? "♥" : "♡"}
                </button>
                <div className="card-info">
                  <p className="artist">{art.artist}</p>
                  <p className="title">{art.title}</p>
                </div>
              </div>
              <div className="taglist">
                {art.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}

      {activeArtwork && (
        <div
          className="modal"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="作品ビューア"
        >
          <div
            className={`modal-content ${
              isViewerUiVisible ? "" : "viewer-ui-hidden"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activeArtwork.image} alt={activeArtwork.title} />
            <div className="viewer-info">
              <p className="artist">{activeArtwork.artist}</p>
              <p className="title">{activeArtwork.title}</p>
            </div>
            <div className="modal-controls">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (prev) =>
                      prev === null
                        ? null
                        : (prev - 1 + filteredArtworks.length) %
                          filteredArtworks.length
                  )
                }
              >
                ← 前の作品
              </button>
              <button type="button" onClick={() => setActiveIndex(null)}>
                閉じる (Esc)
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (prev) =>
                      prev === null
                        ? null
                        : (prev + 1) % filteredArtworks.length
                  )
                }
              >
                次の作品 →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
