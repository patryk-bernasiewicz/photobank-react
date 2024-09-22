import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { StyledToaster } from 'components/StyledToaster/StyledToaster';
import { MainLayout } from 'components/layouts/MainLayout/MainLayout';
import { HomePage } from 'feature/Home/HomePage';
import { AuthLayout } from 'feature/Auth/components/AuthLayout/AuthLayout';
import { AuthContextProvider } from 'feature/Auth/context/AuthContext';

const RegisterView = lazy(() =>
  import('feature/Auth/components/RegisterView/RegisterView').then((module) => ({ default: module.RegisterView })),
);
const LoginView = lazy(() =>
  import('feature/Auth/components/LoginView/LoginView').then((module) => ({ default: module.LoginView })),
);
const ConfirmEmailView = lazy(() =>
  import('feature/Auth/components/ConfirmEmailView/ConfirmEmailView').then((module) => ({
    default: module.ConfirmEmailView,
  })),
);
const ResetPasswordView = lazy(() =>
  import('feature/Auth/components/ResetPasswordView/ResetPasswordView').then((module) => ({
    default: module.ResetPasswordView,
  })),
);
const Profile = lazy(() => import('feature/Profile/Profile').then((module) => ({ default: module.Profile })));
const ProfileView = lazy(() =>
  import('feature/Profile/components/ProfileView/ProfileView').then((module) => ({ default: module.ProfileView })),
);

import { store } from './store';
import { EditProfileView } from 'feature/Profile/components/EditProfileView/EditProfileView';

function App() {
  return (
    <Provider store={store}>
      <StyledToaster />
      <AuthContextProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/account" element={<AuthLayout />}>
                <Route index path="/account/login" element={<LoginView />} />
                <Route path="/account/register" element={<RegisterView />} />
                <Route path="/account/confirm-email/:token" element={<ConfirmEmailView />} />
                <Route path="/account/reset-password" element={<ResetPasswordView />} />
                <Route path="/account/reset-password/:token" element={<ResetPasswordView />} />
                <Route path="/account" element={<Navigate to="/account/login" />} />
              </Route>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/profile" element={<Profile />}>
                  <Route index element={<ProfileView />} />
                  <Route path="/profile/edit" element={<EditProfileView />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
