import { Button, ButtonTheme } from 'components/Button/Button';
import { FlashMessage } from 'components/FlashMessage/FlashMessage';
import { TextInput } from 'components/forms/TextInput/TextInput';
import { useGetProfileQuery, useUpdateProfileMutation } from 'feature/Profile/ProfileApi.slice';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type EditProfileInputs = {
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
};

export const EditProfileView = () => {
  const navigate = useNavigate();
  const { data, isSuccess, isError } = useGetProfileQuery();
  const [updateProfile, { isSuccess: isUpdated, isLoading: isUpdating }] = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
    watch,
  } = useForm<EditProfileInputs>({
    defaultValues: {
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      city: data?.city || '',
      country: data?.country || '',
    },
    disabled: !isSuccess && !isError,
  });
  const isFormDisabled = isUpdating;

  const values = watch();
  const isChanged = useMemo(() => {
    return isDirty && JSON.stringify(values) !== data;
  }, [values, data, isDirty]);

  useEffect(() => {
    if (data && isSuccess) {
      reset({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        city: data.city || '',
        country: data.country || '',
      });
    }
  }, [data, isSuccess, reset]);

  const onSubmit: SubmitHandler<EditProfileInputs> = (data) => {
    updateProfile(data);
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
      <p>Edit your profile data and click "Save" to continue.</p>
      {isUpdated && <FlashMessage type="success" message="Profile updated" />}
      <TextInput disabled={isFormDisabled} label="First name" {...register('firstName')} placeholder="First name" />
      <TextInput disabled={isFormDisabled} label="Last name" {...register('lastName')} placeholder="Last name" />
      <TextInput disabled={isFormDisabled} label="City" {...register('city')} placeholder="City" />
      <TextInput disabled={isFormDisabled} label="Country" {...register('country')} placeholder="Country" />
      <Button disabled={isFormDisabled || !isChanged} type="submit">
        Save
      </Button>
      <Button
        disabled={isFormDisabled}
        theme={ButtonTheme.Tertiary}
        type="button"
        onClick={() => navigate('/profile/')}
      >
        Cancel
      </Button>
    </form>
  );
};
