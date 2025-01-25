import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { ExistingTagsProps, PostData } from './types';

function ExistingTags({ editorFormData, setEditorFormData }: ExistingTagsProps) {
  /*
    This component loads exisitng tags in DB.
    This will help to add a tag to the post from the existing ones.
   */
  const [existingTags, setExistingTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [errorTags, setErrorTags] = useState<string | null>(null);

  // Fetch Top 4 tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoadingTags(true);
        const response = await fetch('/api/blog/tags?limit=4');
        if (!response.ok) {
          throw new Error('Failed to fetch existing tags');
        }
        const jsonResponse = await response.json();
        setExistingTags(jsonResponse.data);
      } catch (error: any) {
        setErrorTags("Error loading Tags. Please add by hand your post's tag(s)");
        setExistingTags([]);
      } finally {
        setIsLoadingTags(false);
      }
    };
    fetchTags();
  }, []);

  const isTagSelected = (tag: string) => editorFormData.tags.includes(tag);

  const handleAddTag = (tag: string) => {
    // Prevent adding duplicated tags
    if (!editorFormData.tags.includes(tag)) {
      setEditorFormData((prevData: PostData) => ({
        ...prevData,
        tags: [...prevData.tags, tag],
      }));
    }
  };

  return (
    <div className="create__main-tags-db">
      {isLoadingTags ? (
        <p>
          Loading tags... <FiLoader className="spin" />
        </p>
      ) : errorTags ? (
        <p className="create__main-tags-db--p">{errorTags}</p>
      ) : existingTags.length === 0 ? (
        <p>No tags found</p>
      ) : (
        existingTags.map((tag, index) => {
          const selected = isTagSelected(tag);
          return (
            <button
              key={index}
              className={`create__main-tags-db--btn ${selected && 'create__main-tags-db--btn-slected'}`}
              disabled={selected}
              title={selected ? 'Tag already added' : 'Click to add tag'}
              onClick={() => handleAddTag(tag)}
            >
              {tag}
            </button>
          );
        })
      )}
    </div>
  );
}

export default ExistingTags;