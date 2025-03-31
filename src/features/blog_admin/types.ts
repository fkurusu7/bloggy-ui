import React, { Dispatch, SetStateAction } from 'react';

export interface PostData {
  title: string;
  banner: string;
  content: string;
  tags: string[];
  description: string;
}

export interface UserData {
  fullname: string;
  email: string;
  profileImg: string;
  posts: number;
}

export interface UserUpdateData {
  fullname: string;
  email: string;
  profileImg: string;
  password: string;
}

export interface Post {
  slug: string;
  title: string;
  banner: string;
  description: string;
  content: string;
  tags: Array<{ slug: string; name: string }>;
  createdAt: string;
  draft: boolean;
}

export interface ExistingTagsProps {
  editorFormData: PostData;
  setEditorFormData: Dispatch<SetStateAction<PostData>>;
  setFormDataError: Dispatch<SetStateAction<{ field: string; message: string }[]>>;
}

export interface PostAddedTagProps {
  tagName: string;
  setEditorFormData: React.Dispatch<React.SetStateAction<PostData>>;
  editorFormData: PostData;
}
