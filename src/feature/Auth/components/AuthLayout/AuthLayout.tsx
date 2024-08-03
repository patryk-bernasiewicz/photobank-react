import { Outlet } from 'react-router-dom';

export const AuthLayout = () => (
  <div className="w-full min-h-[100vh] h-full flex justify-center items-center">
    <Outlet />
  </div>
);
