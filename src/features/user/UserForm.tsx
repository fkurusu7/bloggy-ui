import React, { useState } from 'react';
import { z } from 'zod';

import { HiOutlinePhoto } from 'react-icons/hi2';
import Button from '../../component/Button';

import { UserData, UserUpdateData } from '../blog_admin/types';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const passwordMasked = '********';

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
    password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  })
  .refine((data) => !data.password || data.password !== passwordMasked, {
    message: `Password must be changed from default ${passwordMasked}`,
    path: ['password'],
  });

function UserForm(userData: UserData) {
  const [userFormData, setUserFormData] = useState<UserUpdateData>({
    fullname: userData.fullname,
    email: userData.email,
    profileImg: userData.profileImg,
    password: '',
  });

  const handleFormDataChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = ev.target;
    setUserFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  console.log(userFormData);

  return (
    <form className="user__form">
      <div className="user__form-box">
        <label htmlFor="profileImg" className="user__form-img">
          <HiOutlinePhoto />
          <span>Click to update image</span>

          <input
            type="file"
            hidden
            name="profileImg"
            id="profileImg"
            accept=".png, .jpg, .jpeg"
            onChange={handleFormDataChange}
            disabled={false} // set it when uploading
          />
        </label>
      </div>
      <div className="user__form-box">
        <label htmlFor="fullname">Fullname</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={userFormData.fullname}
          onChange={handleFormDataChange}
          className={`user__form-input`}
          autoFocus
        />
      </div>
      <div className="user__form-box">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={userFormData.email}
          onChange={handleFormDataChange}
          className={`user__form-input`}
        />
      </div>
      <div className="user__form-box">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder={passwordMasked}
          value={passwordMasked}
          onChange={handleFormDataChange}
          className={`user__form-input`}
        />
      </div>
      <div className="user__form-box">
        <label htmlFor="password_conf">Password conf.</label>
        <input
          type="password"
          name="password_conf"
          id="password_conf"
          placeholder={passwordMasked}
          value={passwordMasked}
          onChange={handleFormDataChange}
          className={`user__form-input`}
        />
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
