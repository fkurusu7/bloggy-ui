import React, { useState } from 'react';
import { z } from 'zod';
import {
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineIdentification,
  HiOutlineKey,
} from 'react-icons/hi2';

import Button from '../../component/Button';
import { useNavigate } from 'react-router-dom';

type UserAuthProps = {
  type: 'signin' | 'signup';
};

type UserFormData = {
  email: string;
  password: string;
  fullname?: string;
};

// Define the error message type
type FormError = {
  field: string;
  message: string;
};

// Validate Fields with Zod
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  fullname: z.string().min(3, 'Full name must be at least 3 characters'),
});

const signinSchema = signupSchema.omit({ fullname: true });

function UserAuth({ type }: UserAuthProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    ...(type !== 'signin' && { fullname: '' }),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorsMessage, setErrorsMessage] = useState<FormError[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = ev.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      setIsLoading(true);
      // Validate Fields
      const schema = type === 'signin' ? signinSchema : signupSchema;
      const result = schema.parse(formData);
      setErrorsMessage([]);

      // generate auth path ==> /signin or /signup
      const path = type === 'signin' ? 'signin' : 'signup';
      const response = await fetch(`/api/auth/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      });

      const jsonData = await response.json();
      console.log(jsonData);
      if (response.ok) {
        if (type === 'signin') {
          navigate('/blog');
        } else {
          navigate('/signin');
        }
      }

      // if ok navigate to /blog if signin or /signin if signup
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        setErrorsMessage(errors);
        console.log(errorsMessage);
      }
    } finally {
      setFormData({ email: '', password: '', fullname: '' });
      setIsLoading(false);
    }
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
              className={`auth__input-box ${errorsMessage.some((error) => error.field === 'email') ? 'auth__input-box--error' : ''}`}
            />
            <HiOutlineEnvelope className="auth__input-icon" />
            {errorsMessage.map(
              (error) =>
                error.field === 'email' && (
                  <span key={error.field} className="auth__input--error">
                    {error.message}
                  </span>
                )
            )}
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
            <Button type="submit" size="small" variant="form" isLoading={isLoading}>
              {type === 'signin' ? 'Sign in' : 'Sign up'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserAuth;
