import { useGetMyPhotoQuery } from 'feature/Photo/slice/PhotoApi.slice';

export const HomePage = () => {
  const { data, isLoading } = useGetMyPhotoQuery({
    photoId: 13,
    size: 'original',
  });

  return (
    <div className="container">
      <h1>Welcome to Photobank</h1>
      {!data && isLoading && 'Loading...'}
      {data && data.url && <img src={data.url} alt="" />}
    </div>
  );
};
