import axios from 'axios';
import type { Post, PostCreate, Tag } from './types'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 投稿を取得する (AND検索対応)
 * @param tagNames カンマ区切りのタグ名文字列 (例: "javascript,react")
 */
export const getPosts = async (tagNames?: string): Promise<Post[]> => {
  const params: { tag_names?: string } = {}; // パラメータ名を複数形の tag_names に変更（バックエンドと合わせる）
  
  if (tagNames) {
    params.tag_names = tagNames;
  }
  
  const response = await apiClient.get<Post[]>('/posts/', { params });
  return response.data;
};

// 投稿を作成する
export const createPost = async (postData: PostCreate): Promise<Post> => {
  const response = await apiClient.post<Post>('/posts/', postData);
  return response.data;
};

//タグを取得
export const getTags = async (): Promise<Tag[]> => {
  const response = await apiClient.get<Tag[]>('/tags/'); // バックエンドの /tags/ エンドポイントを叩く
  return response.data;
};

// 他にも、タグやフォルダを取得/作成する関数をここに追加していく

// IDで単一の投稿を取得する
export const getPost = async (postId: number): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${postId}`);
  return response.data;
};

// 投稿のタグを更新する
export const updatePostTags = async (postId: number, tags: string[]): Promise<Post> => {
  const response = await apiClient.put<Post>(`/posts/${postId}/tags`, { tags });
  return response.data;
};

// MHTMLファイルをアップロードする
export const uploadMhtmls = async (files: FileList): Promise<any> => { // TODO: Define a proper response type
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  const response = await apiClient.post('/upload_mhtmls/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
