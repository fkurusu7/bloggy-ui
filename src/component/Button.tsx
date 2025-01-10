import { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  type?: ButtonType;
  size?: ButtonSize;
  goBack?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}

function Button({
  isLoading,
  type = 'button',
  size = 'medium',
  variant = 'primary',
  onClick,
  disabled = false,
  goBack = false,
  children,
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = (ev: any) => {
    if (goBack) {
      navigate(-1);
    } else if (onClick) {
      onClick(ev);
    }
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`btn ${size} ${variant} ${goBack ? 'float' : ''}`}
    >
      {isLoading ? <FiLoader className="spin" /> : children}
    </button>
  );
}

export default Button;
