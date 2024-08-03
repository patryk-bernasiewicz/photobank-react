import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | FieldError;
  inputClassNames?: InputHTMLAttributes<HTMLInputElement>['className'];
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className, inputClassNames, ...props }, ref) => {
    const inputId = props.id || props.name || '';
    return (
      <div className={twMerge('flex flex-col gap-1', className)}>
        <label htmlFor={inputId} className="text-sm text-slate-600">
          {label}
        </label>
        <input
          {...props}
          className={twMerge('border border-slate-400 text-slate-800 rounded p-1', inputClassNames)}
          ref={ref}
          id={inputId}
        />
        {error && <span className="text-sm text-red-800">{typeof error === 'object' ? error.message : error}</span>}
      </div>
    );
  },
);
