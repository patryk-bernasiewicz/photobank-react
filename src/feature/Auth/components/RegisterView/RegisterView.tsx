import { SubmitHandler, useForm } from 'react-hook-form';
import { useRegisterMutation } from 'feature/Auth/AuthApi.slice';
import { TextInput } from 'components/forms/TextInput/TextInput';
import { useState } from 'react';
import { FlashMessage } from 'components/FlashMessage/FlashMessage';
import { Link } from 'components/Link/Link';
import { Button } from 'components/Button/Button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type RegisterInputs = {
  email: string;
  username: string;
  password: string;
  verifyPassword: string;
};

const PASSWORD_MIN_LENGTH = 6;

export const RegisterView = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterInputs>({
    mode: 'onChange',
  });
  const [registerUser, { isSuccess, isLoading }] = useRegisterMutation();
  const [registerResult, setRegisterResult] = useState<string[] | null>(null);

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { verifyPassword, ...payload } = data;
    registerUser(payload)
      .unwrap()
      .then(() => {
        toast('Registration success', {
          description: 'Check your e-mail for confirmation link.',
          icon: '🎉',
        });
        navigate('/');
      })
      .catch((error) => {
        if ('data' in error) {
          const messages = Array.isArray(error.data.message) ? error.data.message : [error.data.message];
          setRegisterResult(messages);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-52 flex-col gap-4">
      <div>
        <Link to="/">Go back</Link>
      </div>
      {Array.isArray(registerResult) && (
        <FlashMessage
          message={registerResult.join(', ')}
          type={isSuccess ? 'success' : 'error'}
          onClose={() => setRegisterResult(null)}
        />
      )}
      <h1 className="mb-4 text-xl font-bold">Register account</h1>
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
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
          },
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
