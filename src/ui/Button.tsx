import { ButtonHTMLAttributes } from 'react';

const Button = ({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`rounded-lg px-3 text-sm py-2 disabled:bg-slate-500 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
