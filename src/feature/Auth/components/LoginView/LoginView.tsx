import { Button } from 'components/Button/Button';
import { FlashMessage } from 'components/FlashMessage/FlashMessage';
import { TextInput } from 'components/forms/TextInput/TextInput';
import { Link } from 'components/Link/Link';
import { authSlice } from 'feature/Auth/Auth.slice';
import { useLoginMutation } from 'feature/Auth/AuthApi.slice';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

type LoginInputs = {
  username: string;
  password: string;
};

export const LoginView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const [loginUser, { isLoading, isSuccess }] = useLoginMutation();
  const [loginResult, setLoginResult] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    loginUser(data)
      .unwrap()
      .then((result) => {
        dispatch({ type: authSlice.actions.setUser.type, payload: result });
        navigate('/');
      })
      .catch((error) => {
        if ('data' in error) {
          setLoginResult(error.data.message);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {location.state?.message && <FlashMessage message={location.state.message} type="success" />}
      {loginResult && (
        <FlashMessage
          message={`Login ${isSuccess ? 'success' : 'error'}`}
          type={isSuccess ? 'success' : 'error'}
          onClose={() => setLoginResult(null)}
        />
      )}
      <h1 className="mb-4 text-xl font-bold">Login</h1>
      <TextInput
        type="text"
        label="Email or username"
        id="username"
        error={errors.username}
        {...register('username', {
          required: 'Email or username is required',
          disabled: isLoading,
        })}
      />
      <TextInput
        type="password"
        label="Password"
        id="password"
        error={errors.password}
        {...register('password', {
          required: 'Password is required',
          disabled: isLoading,
        })}
      />
      <Link to="/account/reset-password">Forgot password?</Link>
      <Link to="/account/register">Don&apos;t have an account?</Link>
      <Button type="submit" className="mt-2">
        Login
      </Button>
    </form>
  );
};
