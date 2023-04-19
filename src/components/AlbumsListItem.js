import { GoTrashcan } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
// import PhotosList from './PhotosList';

function AlbumsListItem({ album }) {
  // removeAlbum - a function to run the mutation
  // results - object with the status of the mutation (console log to see its properties)
  const [removeAlbum, results] = useRemoveAlbumMutation();
  // console.log(results)

  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };

  const header = (
    <>
      <Button
        className="mr-2"
        onClick={handleRemoveAlbum}
        loading={results.isLoading} // 'results' is from useRemoveAlbumMutation()
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      PHOTOS
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
