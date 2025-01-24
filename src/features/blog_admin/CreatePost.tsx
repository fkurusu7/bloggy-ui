import React, { useState } from 'react';
import { z } from 'zod';
import Button from '../../component/Button';
import toast from 'react-hot-toast';
import { uploadImageToAWS } from '../../utils/aws';
import { HiOutlinePhoto } from 'react-icons/hi2';

// const postInitialState = {
//   title: '',
//   banner: '',
//   content: [],
//   tags: [],
//   description: '',
// };

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
  const postInitialState = {
    title: '',
    banner: '',
    content: [],
    tags: [],
    description: '',
  };
  const [editorFormData, setEditorFormData] = useState(postInitialState);

  const handleBannerImgUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploadingImage(true);
      if (ev.target.files && ev.target.files.length > 0) {
        const img = ev.target.files[0];
        const imageValidation = imageSchema.parse({ image: img });
        console.log(imageValidation);
        // toast.success('Valid image');
        // Upload Image to AWS S3
        const imageUploadedURL = await uploadImageToAWS(img);
        console.log(imageUploadedURL);

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
              {isUploadingImage && <div className="lab">Loading image</div>}
              {/* image to show when uploaded */}
              {editorFormData.banner ? (
                <img
                  src={editorFormData.banner || '/write_sth.jpg'}
                  alt="Banner post image"
                  style={isUploadingImage ? { opacity: 0.3 } : {}}
                />
              ) : (
                <HiOutlinePhoto />
              )}
              {/* input to upload */}
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
            <input type="text" name="title" id="title" placeholder="title" />
          </div>
          {/* TAGS */}
          <div className="create__main-tag">
            <input
              type="text"
              name="tag"
              id="tag"
              className="create__main-tag"
              placeholder="Add a tag (press enter or comma)"
            />
          </div>
          <div className="create__main-tags">
            <span>javascript</span> <span>css</span> <span>aws</span>
          </div>

          {/* DESCRIPTION */}
          <div className="create__main-description">
            <textarea
              name="description"
              id="description"
              placeholder="Add description"
              rows={3}
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
