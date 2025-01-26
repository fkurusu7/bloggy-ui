import { Dispatch, SetStateAction } from 'react';

export interface PostData {
  title: string;
  banner: string;
  content: string;
  tags: string[];
  description: string;
}

export interface ExistingTagsProps {
  editorFormData: PostData;
  setEditorFormData: Dispatch<SetStateAction<PostData>>;
}

export interface PostAddedTagProps {
  tagName: string;
  setEditorFormData: React.Dispatch<React.SetStateAction<PostData>>;
  editorFormData: PostData;
}
