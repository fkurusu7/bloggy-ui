import React, { useRef, useState } from 'react';
import { z } from 'zod';
import {
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineIdentification,
  HiOutlineKey,
} from 'react-icons/hi2';

import Button from '../../component/Button';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

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

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password must be present'),
});

function UserAuth({ type }: UserAuthProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    ...(type !== 'signin' && { fullname: '' }),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);

  // Function to focus on the first field with error
  const focusOnError = (errorFields: FormError[]) => {
    const firstError = errorFields[0]?.field;
    if (!firstError) return;

    switch (firstError) {
      case 'fullname':
        fullnameRef.current?.focus();
        break;
      case 'email':
        emailRef.current?.focus();
        break;
      case 'password':
        passwordRef.current?.focus();
        break;
    }
  };

  const clearForm = () => {
    setFormData({ email: '', password: '', fullname: '' });
    setErrors([]);
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find((error) => error.field === fieldName)?.message;
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = ev.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    // Clear error for the field being changed
    setErrors((prevError) => prevError.filter((error) => error.field !== id));
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      setIsLoading(true);
      // Validate Fields
      const schema = type === 'signin' ? signinSchema : signupSchema;
      const result = schema.parse(formData);
      setErrors([]);

      // generate auth path ==> /signin or /signup
      const path = type === 'signin' ? 'signin' : 'signup';
      const response = await fetch(`/api/auth/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      });

      const jsonData = await response.json();
      if (response.ok) {
        if (type === 'signin') {
          toast.success('Signed in successfully!');
          navigate('/blog/admin');
        } else {
          toast.success(`User ${jsonData.data.email} created successfully! Please sign in.`);
          navigate('/signin');
        }
        clearForm();
      } else {
        throw new ApiError(response.status, jsonData.message || 'An error occurred');
      }

      // if ok navigate to /blog if signin or /signin if signup
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        setErrors(formErrors);
        console.log(formErrors);
        focusOnError(formErrors);
      } else if (error instanceof ApiError) {
        toast.error(error.message);
        if (type === 'signup') {
          fullnameRef.current?.focus();
        } else {
          emailRef.current?.focus();
        }
      } else {
        // Handle unexpected errors
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred. Please try again later.');
        if (type === 'signup') {
          fullnameRef.current?.focus();
        } else {
          emailRef.current?.focus();
        }
      }
    } finally {
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
                ref={fullnameRef}
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Fisrtname + Lastname"
                value={formData.fullname}
                onChange={handleChange}
                className={`auth__input-box ${errors.some((error) => error.field === 'fullname') ? 'auth__input-box--error' : ''}`}
                autoFocus={type === 'signup'}
              />
              <HiOutlineIdentification className="auth__input-icon" />
              {getFieldError('fullname') && (
                <span className="auth__input--error">{getFieldError('fullname')}</span>
              )}
            </div>
          )}
          <div className="auth__input-container">
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="email"
              placeholder="placeholder@test.com"
              value={formData.email}
              onChange={handleChange}
              className={`auth__input-box ${errors.some((error) => error.field === 'email') ? 'auth__input-box--error' : ''}`}
              autoFocus={type === 'signin'}
            />
            <HiOutlineEnvelope className="auth__input-icon" />

            {getFieldError('email') && (
              <span className="auth__input--error">{getFieldError('email')}</span>
            )}
          </div>
          <div className="auth__input-container">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className={`auth__input-box ${errors.some((error) => error.field === 'password') ? 'auth__input-box--error' : ''}`}
            />
            <HiOutlineKey className="auth__input-icon" />
            {getFieldError('password') && (
              <span className="auth__input--error">{getFieldError('password')}</span>
            )}
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

          <hr className="divider" />
          {type === 'signin' ? (
            <div className="auth__links-container">
              <p className="auth__links-p">Don't have an account?</p>
              <Link to="/signup" className="auth__links-link">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="auth__links-container">
              <p className="auth__links-p">Already have an account?</p>
              <Link to="/signin" className="auth__links-link">
                Sign in
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserAuth;
