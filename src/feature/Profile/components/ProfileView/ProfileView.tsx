import { Link } from 'components/Link/Link';
import { useGetProfileQuery } from 'feature/Profile/ProfileApi.slice';

export const ProfileView = () => {
  const { data, isLoading } = useGetProfileQuery();

  return (
    <div>
      {isLoading && 'Profile loading...'}
      {!isLoading && data && (
        <>
          <p>First name: {data.firstName || '-'}</p>
          <p>Last name: {data.lastName || '-'}</p>
          <p>City: {data.city || '-'}</p>
          <p>Country: {data.country || '-'}</p>
        </>
      )}
      <Link to="/profile/edit">Edit profile</Link>
    </div>
  );
};
