import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';

function PostAddedTag({ tagName, setEditorFormData, editorFormData }) {
  const [isEditingTag, setIsEditingTag] = useState(false);
  const [editedTag, setEditedTag] = useState(tagName);

  const MAX_TAG_LENGTH = 20;

  const handleRemoveTag = (tagToRemove: string) => {
    setEditorFormData((prevData: any) => ({
      ...prevData,
      tags: prevData.tags.filter((tag: string) => tag !== tagToRemove),
    }));
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      const oldTag = tagName;
      if (editorFormData.tags.includes(editedTag)) {
        toast.error('Tag already exists');
        setEditedTag(tagName);
        setIsEditingTag(false);
        return;
      }

      if (!editedTag.length) {
        toast.error('Tag cannot be empty');
        return;
      }
      if (editedTag.length > MAX_TAG_LENGTH) {
        toast.error(`Tag must be less than ${MAX_TAG_LENGTH} characters`);
        return;
      }

      setEditorFormData((prevData: any) => ({
        ...prevData,
        tags: prevData.tags.map((tag: string) =>
          tag === oldTag ? tag : editedTag.trim().toLowerCase()
        ),
      }));
      ev.currentTarget.blur();
      setIsEditingTag(false);
    }
  };

  return (
    <div className="create__main-tags-selected-tag">
      {isEditingTag ? (
        <input
          type="text"
          value={editedTag}
          onChange={(ev) => setEditedTag(ev.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditingTag(false)}
          autoFocus
        />
      ) : (
        <>
          <p onClick={() => setIsEditingTag(true)}>{editedTag}</p>
          <button onClick={() => handleRemoveTag(tagName)}>
            <HiOutlineXMark />
          </button>
        </>
      )}
    </div>
  );
}

export default PostAddedTag;
