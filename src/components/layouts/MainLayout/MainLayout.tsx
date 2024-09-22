import { Outlet } from 'react-router-dom';

import Header from './components/Header/Header';

export const MainLayout = () => (
  <div>
    <Header />
    <main className="pt-4">
      <Outlet />
    </main>
  </div>
);
