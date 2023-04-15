import { useFetchAlbumsQuery } from '../store'; // import from the STORE, a central place of imoprts of the store things

function AlbumsList({ user }) {
  // every time the component is rendered we fetch all the user's albums
  // we don't have to put it inside the useEffect or a click event handler, just this hook is enough
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  console.log({ data, error, isLoading });

  return <div>Albums for {user.name}</div>;
}

export default AlbumsList;
