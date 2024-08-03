import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type FlashMessageProps = {
  id?: string;
  message: string | ReactNode;
  onClose?: () => void;
  type: 'success' | 'error' | 'info';
};

export const FlashMessage = (props: FlashMessageProps) => (
  <div
    data-id={props.id}
    className={twMerge(
      'border p-2 w-full relative',
      props.type === 'success' && 'bg-green-50 border-green-300 text-green-800',
      props.type === 'error' && 'bg-red-50 border-red-300 text-red-800',
      (props.type === 'info' || !props.type) && 'bg-slate-50 border-slate-300 text-slate-800',
    )}
  >
    {props.message}
    {props.onClose && (
      <button
        type="button"
        className="absolute right-1 top-1 leading-[12px] text-lg scale-y-[0.75] cursor-pointer"
        onClick={props.onClose}
        children="x"
      />
    )}
  </div>
);
