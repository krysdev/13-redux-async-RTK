import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'; // import from the STORE, a central place of imoprts of the store things
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

function AlbumsList({ user }) {
  // Every time the component is rendered we fetch all the user's albums with 'useFetchAlbumsQuery()'
  // We don't have to put it inside the useEffect or a click event handler, QUERY runs immediately when the component is displayed on the screen.
  // The hook's object properties are:
  // 'data' is data returned from the server
  // 'error' if one occured
  // 'isLoading' true if currently loading data for the very first time only
  // 'isFetching' true if loading data any other time
  // 'refetch' function to tell query to rerun

  // to see all of them you can console.log the result of the hook and expand 'Object { status: "fulfilled" '
  // console.log(useFetchAlbumsQuery(user));

  const { data, error, isFetching } = useFetchAlbumsQuery(user); // 'user' is passed to 'albumsApi.js' query: (user)=>{}

  // Mutations give a function to run when you want to change some data -> 'addAlbum'.
  // 'results' is an object similar to the result of the QUERY hook. Console log it to check out the properties.
  const [addAlbum, results] = useAddAlbumMutation();
  // console.log(results)

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton howMany={3} additionalClassNames="h-10 w-full" />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album}/>
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        {/* 'results' is from useAddAlbumMutation() */}
        <Button loading={results.isLoading} onClick={handleAddAlbum}>+ Add album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList; // used in UsersListItem.js
