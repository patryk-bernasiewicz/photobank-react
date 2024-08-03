import { createContext, useEffect, useState, type ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import { useMeQuery } from '../AuthApi.slice';
import { authSlice } from '../Auth.slice';

const AuthContext = createContext<{ authenticated: boolean }>({
  authenticated: false,
});

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const { data, isSuccess, isError } = useMeQuery();

  useEffect(() => {
    if (isSuccess || isError) {
      setAuthenticated(true);
    }

    if (data) {
      dispatch({ type: authSlice.actions.setUser.type, payload: data });
    }
  }, [data, isSuccess, isError, dispatch]);

  return (
    <AuthContext.Provider value={{ authenticated }}>
      {authenticated ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
