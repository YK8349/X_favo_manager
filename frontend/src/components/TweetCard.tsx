import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';
import './TweetCard.css'; // 新しいCSSファイルをインポート

// イベントの伝播を止めるヘルパー
const stopPropagation = (e: React.MouseEvent) => {
  e.stopPropagation();
};

// テキスト内のURLやハッシュタグ、メンションをリンクに変換する
const linkify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const hashtagRegex = /#(\w+)/g;
  const mentionRegex = /@(\w+)/g;

  // stopPropagationをonclickで呼び出すようにaタグを変更
  return text
    .replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${url}</a>`)
    .replace(hashtagRegex, (match, tag) => `<a href="https://twitter.com/hashtag/${tag}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${match}</a>`)
    .replace(mentionRegex, (match, user) => `<a href="https://twitter.com/${user}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${match}</a>`);
};

// 日付をフォーマットする
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};


interface TweetCardProps {
  post: Post;
}

const TweetCard: React.FC<TweetCardProps> = ({ post }) => {

  const hasMedia = post.media_urls && post.media_urls.length > 0;
  const mediaCount = hasMedia ? post.media_urls!.length : 0;

  // 画像が1, 2, 3, 4枚のときでクラスを分ける
  const imageGridClass = `image-grid image-grid-${Math.min(mediaCount, 4)}`;

  return (
    <Link to={`/posts/${post.id}`} className="tweet-card-link">
      <div className="tweet-card">
        <div className="tweet-header">
          {post.author_avatar_url && (
            <img src={post.author_avatar_url} alt={`${post.author_name}'s avatar`} className="tweet-avatar" />
          )}
          <div className="tweet-author">
            <span className="author-name">{post.author_name || 'Unknown Author'}</span>
            <span className="author-screen-name">@{post.author_screen_name || 'unknown'}</span>
          </div>
          <a href={post.url} className="tweet-view-on-x" target="_blank" rel="noopener noreferrer nofollow" title="View on X" onClick={stopPropagation}>
              X
          </a>
        </div>
        
        {post.text ? (
          <p className="tweet-text" dangerouslySetInnerHTML={{ __html: linkify(post.text) }} />
        ) : (
          <p className="tweet-text-unavailable">Tweet text not available.</p>
        )}

        {hasMedia && (
          <div className={imageGridClass}>
            {post.media_urls!.map((url, index) => (
              <div key={index} className="image-container">
                <a href={url} target="_blank" rel="noopener noreferrer" onClick={stopPropagation}>
                  <img src={url} alt={`Tweet media ${index + 1}`} className="tweet-image" />
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="tweet-footer">
            <time className="tweet-date">{formatDate(post.posted_at)}</time>
            <div className="tweet-tags">
              {post.tags.map(tag => (
                <span key={tag.id} className="tweet-tag" onClick={stopPropagation}>{tag.name}</span>
              ))}
            </div>
        </div>
      </div>
    </Link>
  );
};

export default TweetCard;