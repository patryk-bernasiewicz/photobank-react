import { Link } from 'components/Link/Link';
import { authSlice } from 'feature/Auth/Auth.slice';
import { useLogoutMutation } from 'feature/Auth/AuthApi.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from 'store/index';

export const MainLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [logout, { isSuccess: isLogoutSuccess }] = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (isLogoutSuccess) {
      dispatch({ type: authSlice.actions.setUser.type, payload: null });
    }
  }, [dispatch, isLogoutSuccess]);

  return (
    <main>
      <header>
        {user ? (
          <div>
            Logged in as <Link to="/profile">{user.username}</Link>{' '}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex px-2 font-medium text-blue-600 hover:text-blue-500 focus:text-blue-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <Link to="/account/login">Login</Link>
            <Link to="/account/register">Register</Link>
          </div>
        )}
      </header>
      <Outlet />
    </main>
  );
};
