import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'; // import from the STORE, a central place of imoprts of the store things
import Skeleton from './Skeleton';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
// import AlbumsListItem from './AlbumsListItem';

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

  const { data, error, isLoading } = useFetchAlbumsQuery(user); // 'user' is passed to 'albumsApi.js' query: (user)=>{}

  // Mutations give a function to run when you want to change some data -> 'addAlbum'.
  // 'results' is an object similar to the result of the QUERY hook. Console log it to check them out.
  const [addAlbum, results] = useAddAlbumMutation();
  // console.log(results)

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) {
    content = <Skeleton howMany={3} />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          PHOTOS
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div>
        Albums for {user.name}
        <Button onClick={handleAddAlbum}>+ Add album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList; // used in UsersListItem.js