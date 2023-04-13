import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store'; // import it from the STORE/INDEX.JS, not from the '../store/thunks/_ _ _.js'
import Skeleton from './Skeleton';
import Button from './Button';
import { useThunk } from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';

function UsersList() {
  // example of managing the state by the component even when we have Redux Store

  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  // 'state' here is the BIG STATE ({users: {data, isLoading, error}})
  // const { data, isLoading, error } = useSelector((state) => {  // we delete 'isLoading' and 'error', becuse here it is not managed by the STORE (useState instead)
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);
  // }, []); // eslint says the 'doFetchUsers' is required in the dependancy array, but in fact it is not, and you can have it like this also

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content;
  if (isLoadingUsers) {
    content = <Skeleton howMany={6} additionalClassNames="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>ERROR</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser === true} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && 'Error creating user...'}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
