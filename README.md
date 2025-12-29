# X Like Manager

X(旧Twitter)で「いいね」した投稿が多すぎて、過去の投稿を探すのが大変な問題を解決するためのWebアプリケーションです。投稿のURLを登録し、タグで整理することができます。

## ✨ 主な機能

-   **投稿の登録**: Xの投稿を登録できます。
-   **タグ付け**: 投稿に複数のタグを付けて分類できます。
-   **一覧表示**: 登録した投稿を一覧で確認できます。

## 🛠️ 使用技術

-   **バックエンド**: FastAPI (Python)
-   **フロントエンド**: React (TypeScript, Vite)
-   **データベース**: SQLite (ローカルのデフォルト),PostgreSQL

## 🚀 セットアップと起動方法

### 1. 前提条件

-   Node.js と npm (または yarn)
-   Python 3.8+

### 2. リポジトリのクローン

```bash
git clone <repository-url>
cd x_like_manager
```

### 3. バックエンドのセットアップ

```bash
# バックエンドディレクトリに移動してライブラリをインストール
cd api

# 仮想環境の作成と有効化
python -m venv venv
# Windowsの場合
.\venv\Scripts\activate
# macOS/Linuxの場合
# source venv/bin/activate

# 必要なライブラリのインストール
pip install -r requirements.txt

# プロジェクトのルートディレクトリに戻る
cd ..
```

### 4. サーバーの起動

```bash
# プロジェクトのルートディレクトリ（x_like_manager）から以下を実行

# 仮想環境の有効化 (まだの場合)
# Windowsの場合
.\api\venv\Scripts\activate
# macOS/Linuxの場合
# source api/venv/bin/activate

# サーバーの起動
uvicorn api.main:app --reload
```
> バックエンドサーバーは `http://localhost:8000` で起動します。

### 5. フロントエンドのセットアップ

```bash
# (別ターミナルで) frontend ディレクトリに移動
cd frontend

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```
> フロントエンドは `http://localhost:5173` で起動します。ブラウザでこのアドレスにアクセスしてください。

### 6. データベースへのデータの追加
-   **1**: Xの投稿でCtrl+Sで.mhtml(webぺージ、1つのファイル)を選択、保存
-   **2**: ホームページでImport MHTML Filesから選択して保存したファイルを選択
-   (ファイル数が多い場合直接DBに追加してください。)
