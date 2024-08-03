import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export enum ButtonTheme {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: ButtonTheme;
  size?: ButtonSize;
};

export const Button = ({ theme = ButtonTheme.Primary, size = ButtonSize.Medium, ...buttonProps }: ButtonProps) => (
  <button
    {...buttonProps}
    type={buttonProps.type || 'button'}
    className={twMerge(
      'inline-flex items-center justify-center text-center',
      size === ButtonSize.Small && 'h-6 rounded-sm px-2 py-1',
      size === ButtonSize.Medium && 'h-8 rounded px-2.5 py-1.5',
      size === ButtonSize.Large && 'h-10 rounded px-3 py-1.5',
      !buttonProps.disabled &&
        theme === ButtonTheme.Primary &&
        'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800',
      !buttonProps.disabled &&
        theme === ButtonTheme.Secondary &&
        'bg-amber-600 text-white hover:bg-amber-700 focus:bg-amber-700 active:bg-amber-800',
      !buttonProps.disabled &&
        theme === ButtonTheme.Tertiary &&
        'bg-slate-400 text-white hover:bg-slate-200 focus:bg-slate-500 active:bg-slate-500',
      buttonProps.disabled &&
        'cursor-not-allowed bg-slate-200 text-white hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200',
      buttonProps.className,
    )}
  />
);
