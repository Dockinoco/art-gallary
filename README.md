# Art Gallary

余白を大きく取った Masonry レイアウトで美術作品を眺めるための Next.js アプリです。

## Features

- Masonry（CSS columns）でゆったり閲覧できるギャラリー
- タイトル・作者・タグで検索
- 作者フィルタ
- お気に入り（LocalStorage）
- クリックで黒背景の Viewer モーダル（←→移動 / Esc で閉じる）
- Spotify プレイリスト埋め込み

## Data

- `data/artworks.json` に作品データを追加してください。
- 画像ファイルは `public/artworks/` に配置してください（初期状態ではサンプルの SVG プレースホルダーが同梱されています）。

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
