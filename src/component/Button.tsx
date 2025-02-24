import React, { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'form' | 'icon' | 'linkicon';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  type?: ButtonType;
  size?: ButtonSize;
  goBack?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  to?: string | null;
  tooltipmsg?: string;
  tooltipplace?: string;
  arialabel?: string;
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
  to = null,
  tooltipmsg,
  tooltipplace = 'top',
  arialabel,
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (goBack) {
      navigate(-1);
    } else if (onClick) {
      onClick(ev);
    }
  };

  if (variant === 'linkicon' && to) {
    return (
      <Link
        to={to}
        className={`btn ${variant}`}
        data-tooltip-id="tooltipid"
        data-tooltip-content={tooltipmsg}
        data-tooltip-place={tooltipplace}
        aria-label={arialabel}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled}
      {...(type !== 'submit' && { onClick: handleClick })}
      // onClick={type !== "submit" ? handleClick : undefined}
      className={`btn ${size} ${variant} ${goBack ? 'float' : ''}`}
      data-tooltip-id="tooltipid"
      data-tooltip-content={tooltipmsg}
      data-tooltip-place={tooltipplace}
    >
      {isLoading ? <FiLoader className="spin" /> : children}
    </button>
  );
}

export default Button;
