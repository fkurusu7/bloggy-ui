import { HiOutlinePhoto } from 'react-icons/hi2';
import Button from '../../component/Button';
import { UserData } from '../blog_admin/types';
import { useState } from 'react';

/* 
return res.status(200).json(
  formatResponse(
    true,
    {
      fullname: user.personal_info.fullname,
      email: user.personal_info.email,
      profileImg: user.personal_info.profile_img,
      posts: user.account_info.total_posts,
      },
      "success"
      )
      );
      */
function UserForm(userData: UserData) {
  const [userFormData, setUserFormData] = useState(userData);

  const handleFormDataChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = ev.target;
    setUserFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <form className="user__form">
      <div className="user__form-box">
        <label htmlFor="profileimg" className="user__form-img">
          <HiOutlinePhoto />
          <span>Click to update image</span>

          <input
            type="file"
            hidden
            name="profileimg"
            id="profileimg"
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
          onChange={() => {}}
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
          onChange={() => {}}
          className={`user__form-input`}
        />
      </div>
      <div className="user__form-box">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          value={'********'}
          onChange={() => {}}
          className={`user__form-input`}
        />
      </div>
      <div className="user__form-box">
        <label htmlFor="password_conf">Password conf.</label>
        <input
          type="password"
          name="password_conf"
          id="password_conf"
          placeholder="********"
          value={'********'}
          onChange={() => {}}
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
