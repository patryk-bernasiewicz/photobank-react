import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type PropsType = { isScrolledDown: boolean };

const Logo = ({ isScrolledDown }: PropsType) => (
  <h1>
    <Link
      className={twMerge(
        '!text-slate-50 active:!text-slate-50',
        'pr-4 font-bold hover:no-underline focus:no-underline',
        isScrolledDown && '!text-slate-950 active:!text-slate-950',
      )}
      to="/"
    >
      Photobank.
    </Link>
  </h1>
);

export default Logo;
