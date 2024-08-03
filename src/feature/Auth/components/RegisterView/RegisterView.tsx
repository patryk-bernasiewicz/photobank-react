import { SubmitHandler, useForm } from 'react-hook-form';
import { useRegisterMutation } from 'feature/Auth/AuthApi.slice';
import { TextInput } from 'components/forms/TextInput/TextInput';
import { useState } from 'react';
import { FlashMessage } from 'components/FlashMessage/FlashMessage';
import { Link } from 'components/Link/Link';
import { Button } from 'components/Button/Button';

type RegisterInputs = {
  email: string;
  username: string;
  password: string;
  verifyPassword: string;
};

export const RegisterView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterInputs>();
  const [registerUser, { isSuccess, isLoading }] = useRegisterMutation();
  const [registeResult, setRegisterResult] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { verifyPassword, ...payload } = data;
    registerUser(payload)
      .unwrap()
      .then((result) => console.log('Register success', result))
      .catch((error) => {
        if ('data' in error) {
          setRegisterResult(error.data.message);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {registeResult && (
        <FlashMessage
          message={`Register ${isSuccess ? 'success' : 'error'}`}
          type={isSuccess ? 'success' : 'error'}
          onClose={() => setRegisterResult(null)}
        />
      )}
      <h1 className="text-xl font-bold mb-4">Register account</h1>
      <TextInput
        type="email"
        label="Email"
        id="email"
        error={errors.email}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
          disabled: isLoading,
        })}
      />
      <TextInput
        type="text"
        label="Username"
        id="username"
        error={errors.username}
        {...register('username', { required: 'Username is required', disabled: isLoading })}
      />
      <TextInput
        label="Password"
        type="password"
        id="password"
        error={errors.password}
        {...register('password', {
          required: 'Password is required',
          disabled: isLoading,
        })}
      />
      <TextInput
        label="Verify password"
        type="password"
        id="verifyPassword"
        {...register('verifyPassword', {
          required: 'Verify password is required',
          validate: (value) => value === watch('password') || 'Passwords do not match',
          disabled: isLoading,
        })}
        error={errors.verifyPassword}
      />
      <Link to="/account/login">Already have an account?</Link>
      <Button type="submit" disabled={!isValid || isLoading} className="mt-2">
        Register
      </Button>
    </form>
  );
};
