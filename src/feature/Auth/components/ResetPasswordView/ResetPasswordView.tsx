import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { FlashMessage } from 'components/FlashMessage/FlashMessage';
import { TextInput } from 'components/forms/TextInput/TextInput';
import {
  useConfirmResetPasswordMutation,
  useLazyValidateResetPasswordTokenQuery,
  useRequestResetPasswordMutation,
} from 'feature/Auth/AuthApi.slice';

type EmailFormInputs = { email: string };
type PasswordFormInputs = { password: string; verifyPassword: string };

export const ResetPasswordView = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [
    validateResetPasswordToken,
    { isUninitialized: isValidationUninitialized, isLoading: isValidating, isSuccess: isValidated },
  ] = useLazyValidateResetPasswordTokenQuery();
  const [confirmResetPassword, { isSuccess: isConfirmed, error: confirmError }] = useConfirmResetPasswordMutation();
  const [requestResetPassword, { isSuccess: isRequested, error: requestError }] = useRequestResetPasswordMutation();

  const emailForm = useForm<EmailFormInputs>();
  const passwordForm = useForm<PasswordFormInputs>();

  const onEmailSubmit = (data: EmailFormInputs) => {
    requestResetPassword(data.email);
  };

  const onPasswordsSubmit = (data: PasswordFormInputs) => {
    confirmResetPassword({ token: token!, password: data.password });
  };

  useEffect(() => {
    if (token) {
      validateResetPasswordToken(token);
    }
  }, [token, validateResetPasswordToken]);

  useEffect(() => {
    if (!token || isValidated || isValidating || isValidationUninitialized) {
      return;
    }

    navigate('/account/login');
  }, [isValidated, isValidating, isValidationUninitialized, navigate, token]);

  useEffect(() => {
    if (isConfirmed) {
      navigate('/account/login');
    }
  }, [isConfirmed, navigate]);

  return (
    <div className="max-w-[180px]">
      <h1 className="text-xl font-bold mb-4">Reset password</h1>
      {!token && (
        <form className="flex flex-col gap-2" onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
          {isRequested && (
            <FlashMessage
              message="If your email is in our database, you will receive a message with reset password link"
              type="success"
            />
          )}
          {requestError && (
            <FlashMessage
              message={'data' in requestError ? (requestError.data as { message: string }).message : 'Token error'}
              type="error"
            />
          )}

          <TextInput label="Email" error={emailForm.formState.errors.email} {...emailForm.register('email')} />
          <div>
            <button type="submit" className="bg-slate-50 text-slate-800 font-medium px-2.5 py-1">
              Submit
            </button>
          </div>
        </form>
      )}
      {token && isValidating && <div>Loading...</div>}
      {token && isValidated && (
        <form className="flex flex-col gap-2" onSubmit={passwordForm.handleSubmit(onPasswordsSubmit)}>
          {isConfirmed && <FlashMessage message="Your password has been successfully changed" type="success" />}
          {confirmError && (
            <FlashMessage
              message={'data' in confirmError ? (confirmError.data as { message: string }).message : 'Token error'}
              type="error"
            />
          )}

          <TextInput
            type="password"
            label="Set new password"
            error={passwordForm.formState.errors.password}
            {...passwordForm.register('password')}
          />
          <TextInput
            type="password"
            label="Verify password"
            error={passwordForm.formState.errors.verifyPassword}
            {...passwordForm.register('verifyPassword')}
          />
          <div>
            <button type="submit" className="bg-slate-50 text-slate-800 font-medium px-2.5 py-1">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
