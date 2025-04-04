import React, { useState } from 'react';
import { z } from 'zod';

import { HiOutlinePhoto } from 'react-icons/hi2';
import Button from '../../component/Button';

import { FormError, UserData, UserUpdateData } from '../blog_admin/types';
import { API_BASE_URL } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';
import { uploadImageToAWS } from '../../utils/aws';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const PASSOWRD_MASKED = '********';

const imageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, 'Max image size is 5MB')
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file?.type)),
});

const userUpdateSchema = z
  .object({
    fullname: z.string().min(3, 'Fullname is required').optional(),
    email: z.string().email('Invalid email').optional(),
    profileImg: z.string().optional(),
    password: z.string().min(8, 'must be at least 8 characters').optional(),
    password_conf: z.string().min(8, 'must be at least 8 characters').optional(),
  })
  .refine((data) => !data.password || data.password !== PASSOWRD_MASKED, {
    message: `Password must be changed from default ${PASSOWRD_MASKED}`,
    path: ['password'],
  })
  .superRefine(({ password, password_conf }, ctx) => {
    if (password !== password_conf) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['password_conf'],
      });
    }
  });

/**
 * Determines which fields to include in the update request,
 * only sending what's necessary.
 * @param original User Data
 * @param updated User Data
 * @returns object with fileds to be included in the update
 */
const getChangedFields = (original: UserData, updated: UserUpdateData) => {
  const changes: Partial<UserUpdateData> = {};

  if (original.fullname !== updated.fullname) {
    changes.fullname = updated.fullname;
  }
  if (original.email !== updated.email) {
    changes.email = updated.email;
  }
  if (original.profileImg !== updated.profileImg) {
    changes.profileImg = updated.profileImg;
  }
  // Only send password if it's filled in
  if (updated.password && updated.password !== PASSOWRD_MASKED) {
    changes.password = updated.password;
  }
  if (updated.password_conf && updated.password_conf !== PASSOWRD_MASKED) {
    changes.password_conf = updated.password_conf;
  }

  return changes;
};

function UserForm({
  userData,
  onClose,
  onUpdate,
}: {
  userData: UserData;
  onClose: () => void;
  onUpdate?: (_updated: UserData) => void;
}) {
  const [userFormData, setUserFormData] = useState<UserUpdateData>({
    fullname: userData.fullname,
    email: userData.email,
    profileImg: userData.profileImg,
    password: '',
    password_conf: '',
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [errors, setErrors] = useState<FormError[]>([]);

  const handleFormDataChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = ev.target;
    setUserFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevError) => prevError.filter((error) => error.field !== id));
  };

  const handleImgUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploadingImage(true);
      if (ev.target.files && ev.target.files.length > 0) {
        const img = ev.target.files[0];
        imageSchema.parse({ image: img });

        const imageUploadedURL = await uploadImageToAWS(img);

        setUserFormData((prevData) => ({
          ...prevData,
          profileImg: imageUploadedURL,
        }));
        userData.profileImg = '';
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

  const getFieldError = (fieldname: string): string | undefined => {
    return errors.find((error) => error.field === fieldname)?.message;
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    try {
      const updatedFields = getChangedFields(userData, userFormData);

      const dataToUpdate = userUpdateSchema.parse(updatedFields);

      /*{ 
          "fullname": "fernando cruz barudesu",
          "email": "coding.fcv@gmail.com.mx"
        }*/

      // Call Update Signed In user API
      const response = await fetch(`${API_BASE_URL}/api/user/updateSignedInUser`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(dataToUpdate),
      });
      if (!response.ok) {
        toast.error('Image upload failed, please try again in a moment');
        return;
      }

      const jsonres = await response.json();

      toast.success('User updated successfully');
      onClose();
      onUpdate?.(jsonres.data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));

        setErrors(formErrors);
        // TODO: focus on error
      }
    }
  };

  console.log(userData);

  return (
    <form className="user__form" onSubmit={handleSubmit}>
      <div className="user__form-box">
        <label htmlFor="profileImg" className="user__form-imglabel">
          {isUploadingImage ? (
            <div className="user__form-img-loading">
              <FiLoader className="spin" />
            </div>
          ) : userData.profileImg ? (
            <img src={userData.profileImg} alt="User profile image" />
          ) : userFormData.profileImg ? (
            <img
              src={userFormData.profileImg}
              alt="User profile image updated"
              style={isUploadingImage ? { opacity: 0.3 } : {}}
            />
          ) : (
            <HiOutlinePhoto />
          )}
          <span>Click to update image</span>
          <input
            type="file"
            hidden
            name="profileImg"
            id="profileImg"
            accept=".png, .jpg, .jpeg"
            onChange={handleImgUpload}
            disabled={isUploadingImage} // set it when uploading
          />
        </label>
      </div>
      <div className="user__form-box">
        <label htmlFor="fullname" className="user__form-label">
          Fullname
        </label>
        <input
          className={`user__form-input ${errors.some((error) => error.field === 'fullname') ? 'user__form-input-error' : ''}`}
          type="text"
          name="fullname"
          id="fullname"
          value={userFormData.fullname}
          onChange={handleFormDataChange}
          autoFocus
        />
        {getFieldError('fullname') && (
          <span className="user__form-error">{getFieldError('fullname')}</span>
        )}
      </div>
      <div className="user__form-box">
        <label htmlFor="email" className="user__form-label">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={userFormData.email}
          onChange={handleFormDataChange}
          className={`user__form-input ${errors.some((error) => error.field === 'email') ? 'user__form-input-error' : ''}`}
        />
        {getFieldError('email') && (
          <span className="user__form-error">{getFieldError('email')}</span>
        )}
      </div>
      <div className="user__form-box">
        <label htmlFor="password" className="user__form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder={PASSOWRD_MASKED}
          value={userFormData.password}
          onChange={handleFormDataChange}
          className={`user__form-input ${errors.some((error) => error.field === 'password') ? 'user__form-input-error' : ''}`}
        />
        {getFieldError('password') && (
          <span className="user__form-error">{getFieldError('password')}</span>
        )}
      </div>
      <div className="user__form-box">
        <label htmlFor="password_conf" className="user__form-label">
          Password conf.
        </label>
        <input
          type="password"
          name="password_conf"
          id="password_conf"
          placeholder={PASSOWRD_MASKED}
          value={userFormData.password_conf}
          onChange={handleFormDataChange}
          className={`user__form-input ${errors.some((error) => error.field === 'password_conf') ? 'user__form-input-error' : ''}`}
        />
        {getFieldError('password_conf') && (
          <span className="user__form-error">{getFieldError('password_conf')}</span>
        )}
      </div>
      <div className="user__form-box">
        <Button type="submit" size="small" variant="form">
          Update
        </Button>
      </div>
    </form>
  );
}

export default UserForm;
