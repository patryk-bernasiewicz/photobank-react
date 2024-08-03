import { useConfirmEmailMutation } from 'feature/Auth/AuthApi.slice';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ConfirmEmailView = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [confirmEmail, { isLoading }] = useConfirmEmailMutation();

  useEffect(() => {
    if (!token) {
      return;
    }

    confirmEmail(token)
      .then(() =>
        navigate('/account/login', {
          state: {
            message: 'Confirm email success',
          },
        }),
      )
      .catch((err) => {
        console.log('===== err: ', err);
      });
  }, []);

  return <pre>{JSON.stringify({ token, isLoading }, null, 2)}</pre>;
};
