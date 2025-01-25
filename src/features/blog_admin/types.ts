import { Dispatch, SetStateAction } from 'react';

export interface PostData {
  title: string;
  banner: string;
  content: any[];
  tags: string[];
  description: string;
}

export interface ExistingTagsProps {
  editorFormData: PostData;
  setEditorFormData: Dispatch<SetStateAction<PostData>>;
}
