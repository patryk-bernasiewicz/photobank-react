import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import UserPanel from '../UserPanel/UserPanel';

const Header = () => {
  const [isScrolledDown, setScrolledDown] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const determineIsScrolled = () => {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setScrolledDown(window && window.scrollY > 0);
      }, 33.3);
    };

    determineIsScrolled();
    window.addEventListener('scroll', determineIsScrolled);
    return () => {
      window.removeEventListener('scroll', determineIsScrolled);
    };
  }, []);

  return (
    <header className={twMerge('text-slate-100 transition-all duration-100', isScrolledDown && 'text-slate-800')}>
      <Navbar isScrolledDown={isScrolledDown}>
        <Logo isScrolledDown={isScrolledDown} />
        <UserPanel />
      </Navbar>
      <div className="h-[50vh] max-h-[300px] min-h-[150px] w-full overflow-hidden bg-slate-800">
        <picture>
          <source media="(min-width: 768px)" srcSet="public/background-mountains.jpg" />
          <source media="(max-width: 767px)" srcSet="public/background-mountains-mobile.jpg" />
          <img
            src="background-mountains-mobile.jpg"
            alt="Mountains background"
            className="h-full w-full object-cover object-center"
          />
        </picture>
      </div>
    </header>
  );
};

export default Header;
