import { GoTrashcan } from 'react-icons/go';
// import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
// import PhotosList from './PhotosList';

function AlbumsListItem({ album }) {
  const header = (
    <div>
      <Button>
        <GoTrashcan />
      </Button>
      {album.title}
    </div>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      PHOTOS
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
