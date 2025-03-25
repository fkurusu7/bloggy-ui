import React, { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';
import { HiOutlinePhoto } from 'react-icons/hi2';
import Button from '../../component/Button';
import { uploadImageToAWS } from '../../utils/aws';
import ExistingTags from './ExistingTags';
import PostAddedTag from './PostAddedTag';
import { PostData } from './types';
import PostEditor from './PostEditor';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_TAGS = 5;

const imageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, 'Max image size is 5MB')
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file?.type)),
});

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  tags: z.string().array().nonempty('At least one tag is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  // banner: z.string().optional(),
});

type FormError = {
  field: string;
  message: string;
};

interface PostFormProps {
  initialData?: PostData;
  onSubmit: (_data: PostData) => Promise<void>;
  submitButtonText: string;
}

function PostForm({ initialData, onSubmit, submitButtonText }: PostFormProps) {
  const postInitialState: PostData = initialData || {
    title: '',
    banner: '',
    content: '',
    tags: [],
    description: '',
  };

  const [editorFormData, setEditorFormData] = useState<PostData>(postInitialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formDataError, setFormDataError] = useState<FormError[]>([]);

  const handleBannerImgUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploadingImage(true);
      if (ev.target.files && ev.target.files.length > 0) {
        const img = ev.target.files[0];
        imageSchema.parse({ image: img });
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
        console.error(error);
      }
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFormDataChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, id } = ev.target;
    setEditorFormData((prevData) => ({ ...prevData, [id]: value }));
    setFormDataError((prevError) => prevError.filter((error) => error.field !== id));
  };

  const handleAddTag = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.currentTarget.value.trim().length && (ev.key === 'Enter' || ev.key === ',')) {
      ev.preventDefault();
      const tagName = ev.currentTarget.value.trim().toLowerCase();

      if (editorFormData.tags.length >= MAX_TAGS) {
        toast.error(`Maximum ${MAX_TAGS} tags allowed`);
        ev.currentTarget.value = '';
        return;
      }

      if (editorFormData.tags.includes(tagName)) {
        toast.error('Tag already added to Post');
        ev.currentTarget.value = '';
        return;
      }

      setEditorFormData((prevData) => ({ ...prevData, tags: [...prevData.tags, tagName] }));
      ev.currentTarget.value = '';
      setFormDataError((prevError) => prevError.filter((error) => error.field !== 'tags'));
    }
  };

  const handleContentChange = (newContent: string) => {
    setEditorFormData((prevData) => ({
      ...prevData,
      content: newContent,
    }));
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return formDataError.find((error) => error.field === fieldName)?.message;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      formSchema.parse(editorFormData);
      setFormDataError([]);

      await onSubmit(editorFormData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        setFormDataError(formErrors);
        console.error(formErrors);
      } else {
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create__form">
      <div className="create__main">
        <div className="create__main-banner">
          <label htmlFor="banner" className="create__main-banner-label">
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

        <div className="create__main-title">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title"
            onChange={handleFormDataChange}
            value={editorFormData.title}
            className={`${formDataError.some((error) => error.field === 'title') ? 'error-msg-input' : ''}`}
            autoFocus
          />
          {getFieldError('title') && <span className="error-msg">{getFieldError('title')}</span>}
        </div>

        <div className="create__main-tags">
          <ExistingTags
            editorFormData={editorFormData}
            setEditorFormData={setEditorFormData}
            setFormDataError={setFormDataError}
          />
          <div className="create__main-tags-input">
            <input
              type="text"
              name="tag"
              id="tag"
              className={`create__main-tag ${formDataError.some((error) => error.field === 'tags') ? 'error-msg-input' : ''}`}
              placeholder="Add a tag (press enter or comma)"
              onKeyDown={handleAddTag}
            />
            {getFieldError('tags') && <span className="error-msg">{getFieldError('tags')}</span>}
          </div>
          <div className="create__main-tags-selected">
            {editorFormData.tags.map((tag) => (
              <PostAddedTag
                tagName={tag}
                key={tag}
                editorFormData={editorFormData}
                setEditorFormData={setEditorFormData}
              />
            ))}
          </div>
        </div>

        <div className="create__main-description">
          <textarea
            name="description"
            id="description"
            placeholder="Add description"
            rows={3}
            value={editorFormData.description}
            onChange={handleFormDataChange}
            className={`create__main-description-ta ${formDataError.some((error) => error.field === 'description') ? 'error-msg-input' : ''}`}
          />
          {getFieldError('description') && (
            <span className="error-msg">{getFieldError('description')}</span>
          )}
        </div>
      </div>

      <div
        className={`create__content ${formDataError.some((error) => error.field === 'content') ? 'error-msg-content' : ''}`}
      >
        <PostEditor content={editorFormData.content} onChange={handleContentChange} />
        {getFieldError('content') && <span className="error-msg">{getFieldError('content')}</span>}
      </div>

      <div className="create__buttons">
        <Button variant="primary" size="small">
          Save Draft
        </Button>
        <Button variant="primary" size="small" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : submitButtonText}
        </Button>
      </div>
    </div>
  );
}

export default PostForm;
