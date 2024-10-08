import { authSlice } from 'feature/Auth/Auth.slice';
import { useLogoutMutation } from 'feature/Auth/AuthApi.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/index';

const UserPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
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
    <div className="ml-auto flex items-center justify-end gap-x-4">
      {user ? (
        <>
          <div>
            Logged in as <Link to="/profile">{user.username}</Link>{' '}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex px-2 font-medium text-blue-600 hover:text-blue-500 focus:text-blue-500"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/account/login">Login</Link>
          <Link to="/account/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default UserPanel;
