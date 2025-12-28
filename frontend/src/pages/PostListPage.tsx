import React, { useState, useEffect, useCallback } from 'react';
import type { Post, Tag } from '../types';
import { getPosts, getTags } from '../api';
import TweetCard from '../components/TweetCard';
import { useSearchParams } from 'react-router-dom';

function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : [];

  const fetchPosts = useCallback(async (tagString?: string) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPosts = await getPosts(tagString);
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to fetch posts.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const tags = await getTags();
        setAllTags(tags);
      } catch (err) {
        console.error('Failed to fetch tags:', err);
      }
    };
    fetchAllTags();
  }, []);

  useEffect(() => {
    const tagsParam = searchParams.get('tags');
    fetchPosts(tagsParam || undefined);
  }, [searchParams, fetchPosts]);

  const toggleTag = (tagName: string) => {
    let newTags: string[];
    if (selectedTags.includes(tagName)) {
      newTags = selectedTags.filter(t => t !== tagName);
    } else {
      newTags = [...selectedTags, tagName];
    }

    if (newTags.length > 0) {
      setSearchParams({ tags: newTags.join(',') });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <h2>Multi-Tag Search (AND)</h2>
      
      <div className="tag-filter-accordion">
        <button 
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="tag-filter-button"
        >
          {isAccordionOpen ? '▼ タグフィルタを閉じる' : '▶ タグで絞り込む (複数選択可)'}
        </button>
        
        {isAccordionOpen && (
          <div className="tag-selection-area">
            {allTags.map(tag => {
              const isSelected = selectedTags.includes(tag.name);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.name)}
                  className={`tag-button ${isSelected ? 'selected' : ''}`}
                >
                  {isSelected ? '✓ ' : '+ '} {tag.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="selected-tags-container">
          <strong>Selected Tags: </strong>
          {selectedTags.map(tag => (
            <span key={tag} className="selected-tag">
              {tag}
            </span>
          ))}
          <button onClick={() => setSearchParams({})} className="clear-tags-button">Clear All</button>
        </div>
      )}

      {loading ? <p>Loading posts...</p> : (
        error ? <p className="error-message">{error}</p> : (
            <div className="post-list-grid">
            {posts.map(post => (
                <TweetCard key={post.id} post={post} />
            ))}
            </div>
        )
      )}
    </div>
  );
}

export default PostListPage;