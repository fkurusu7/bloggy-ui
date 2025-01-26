import React, { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';

import Button from '../../component/Button';
import { uploadImageToAWS } from '../../utils/aws';
import { HiOutlinePhoto } from 'react-icons/hi2';
import ExistingTags from './ExistingTags';
import { PostData } from './types';
import PostAddedTag from './PostAddedTag';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// Validate Editor Fields
const imageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, 'Max image size is 5MB')
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file?.type)),
});

function CreatePost() {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const postInitialState: PostData = {
    title: '',
    banner: '',
    content: [],
    tags: [],
    description: '',
  };
  const [editorFormData, setEditorFormData] = useState<PostData>(postInitialState);

  const handleBannerImgUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploadingImage(true);
      if (ev.target.files && ev.target.files.length > 0) {
        const img = ev.target.files[0];
        imageSchema.parse({ image: img });

        // toast.success('Valid image');
        // Upload Image to AWS S3
        const imageUploadedURL = await uploadImageToAWS(img);

        setEditorFormData((prevData) => ({
          ...prevData,
          banner: imageUploadedURL,
        }));
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors.map((e) => e.message).join(', '));
      } else {
        console.log(error);
      }
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFormDataChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, id } = ev.target;

    setEditorFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const MAX_TAGS = 5;
  const handleAddTag = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    // keyCode: enter-13 - comma-188
    if (ev.currentTarget.value.trim().length && (ev.key === 'Enter' || ev.key === ',')) {
      ev.preventDefault();
      const tagName = ev.currentTarget.value.trim().toLowerCase();

      // Validate there are no more than 5 tags added per Post
      if (editorFormData.tags.length >= MAX_TAGS) {
        toast.error(`Maximum ${MAX_TAGS} tags allowed`);
        ev.currentTarget.value = '';
        return;
      }

      /*
      if (tagName.length > MAX_TAG_LENGTH) {
        toast.error(`Tag must be less than ${MAX_TAG_LENGTH} characters`);
        ev.target.value = "";
        return;
        }
        */

      // Check if tag already present in tags array
      if (editorFormData.tags.includes(tagName)) {
        toast.error('Tag already added to Post');
        ev.currentTarget.value = '';
        return;
      }

      setEditorFormData((prevData) => ({ ...prevData, tags: [...prevData.tags, tagName] }));
      ev.currentTarget.value = '';
      // TODO: handle errors
    }
  };

  console.log(editorFormData);

  return (
    <div className="create__container">
      <h2 className="heading-1">Create a Post</h2>
      <form className="create__form">
        {/* MAIN */}
        <div className="create__main">
          {/* BANNER Image */}
          <div className="create__main-banner">
            <label htmlFor="banner" className="create__main-banner-label">
              {/* loading image */}

              {isUploadingImage ? (
                <div className="lab">
                  Loading image... <FiLoader className="spin" />
                </div>
              ) : editorFormData.banner ? (
                <img
                  src={editorFormData.banner}
                  alt="Banner post image"
                  style={isUploadingImage ? { opacity: 0.3 } : {}}
                />
              ) : (
                <HiOutlinePhoto />
              )}

              <input
                hidden
                type="file"
                name="banner"
                id="banner"
                accept=".png, .jpg, .jpeg"
                onChange={handleBannerImgUpload}
                disabled={isUploadingImage}
              />
            </label>
          </div>
          {/* TITLE */}
          <div className="create__main-title">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="title"
              onChange={handleFormDataChange}
              value={editorFormData.title}
            />
          </div>
          {/* TAGS */}
          <div className="create__main-tags">
            {/* Load tags from DB */}
            <ExistingTags editorFormData={editorFormData} setEditorFormData={setEditorFormData} />
            <div className="create__main-tags-input">
              <input
                type="text"
                name="tag"
                id="tag"
                className="create__main-tag"
                placeholder="Add a tag (press enter or comma)"
                onKeyDown={handleAddTag}
              />
            </div>
            <div className="create__main-tags-selected">
              {editorFormData.tags.map((tag) => {
                return (
                  <PostAddedTag
                    tagName={tag}
                    key={tag}
                    editorFormData={editorFormData}
                    setEditorFormData={setEditorFormData}
                  />
                );
              })}
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="create__main-description">
            <textarea
              name="description"
              id="description"
              placeholder="Add description"
              rows={3}
              value={editorFormData.description}
              onChange={handleFormDataChange}
            ></textarea>
          </div>
        </div>

        {/* EDITOR */}
        <div className="create__content">Content</div>

        {/* BUTTONS */}
        <div className="create__buttons">
          <Button variant="primary" size="small">
            Save Draft
          </Button>
          <Button variant="primary" size="small">
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
