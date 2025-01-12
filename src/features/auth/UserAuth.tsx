import {
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineIdentification,
  HiOutlineKey,
} from 'react-icons/hi2';
import Button from '../../component/Button';
import React, { useState } from 'react';

type UserAuthProps = {
  type: 'signin' | 'signup';
};

type UserFormData = {
  email: string;
  password: string;
  fullname?: string;
};

function UserAuth({ type }: UserAuthProps) {
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    ...(type === 'signin' && { fullname: '' }),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = ev.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  };

  return (
    <div className="auth__container">
      <div className="auth__form-container">
        <h1 className="heading-1">{type === 'signin' ? 'Welcome Back' : 'Join'}</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          {type !== 'signin' && (
            <div className="auth__input-container">
              <input
                className="auth__input-box"
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Fisrtname + Lastname"
                value={formData.fullname}
                onChange={handleChange}
              />
              <HiOutlineIdentification className="auth__input-icon" />
            </div>
          )}
          <div className="auth__input-container">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="placeholder@test.com"
              value={formData.email}
              onChange={handleChange}
              className="auth__input-box"
            />
            <HiOutlineEnvelope className="auth__input-icon" />
          </div>
          <div className="auth__input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="auth__input-box"
            />
            {/* TODO: add icon and handle password visibility */}
            <HiOutlineKey className="auth__input-icon" />

            <HiOutlineEyeSlash
              className={`auth__input-icon auth__input-icon--password ${showPassword ? 'auth__input-icon--password--hidden' : ''}`}
              onClick={() => setShowPassword(!showPassword)}
            />
            <HiOutlineEye
              className={`auth__input-icon auth__input-icon--password ${showPassword ? '' : 'auth__input-icon--password--hidden'}`}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="auth__button-container">
            <Button type="submit" size="small" variant="form">
              {type === 'signin' ? 'Sign in' : 'Sign up'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserAuth;
