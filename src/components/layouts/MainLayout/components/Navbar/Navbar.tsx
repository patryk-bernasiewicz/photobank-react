import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type PropsType = {
  children: ReactNode;
  isScrolledDown: boolean;
};

const Navbar = ({ children, isScrolledDown }: PropsType) => (
  <div
    className={twMerge(
      'fixed left-0 right-0 top-0 shadow-lg transition-all duration-200',
      'bg-black bg-opacity-60',
      isScrolledDown && 'bg-slate-50 bg-opacity-100',
      '[&_button:focus]:text-blue-600 [&_button:focus]:no-underline [&_button:focus]:outline-none [&_button:hover]:text-blue-600 [&_button:hover]:no-underline [&_button]:text-blue-500',
      '[&_a:focus]:text-blue-600 [&_a:focus]:no-underline [&_a:focus]:outline-none [&_a:hover]:text-blue-600 [&_a:hover]:no-underline [&_a]:text-blue-500',
    )}
  >
    <div className="container flex h-16 items-center">{children}</div>
  </div>
);

export default Navbar;
