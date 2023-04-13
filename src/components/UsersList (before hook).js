import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store'; // import it from the STORE/INDEX.JS, not from the '../store/thunks/_ _ _.js'
import Skeleton from './Skeleton';
import Button from './Button';

function UsersList() {
  // example of managing the state by the component even when we have Redux Store
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState(null);

  const dispatch = useDispatch();

  // 'state' here is the BIG STATE ({users: {data, isLoading, error}})
  // const { data, isLoading, error } = useSelector((state) => {  // we delete 'isLoading' and 'error', becuse here it is not managed by the STORE (useState instead)
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    setIsLoadingUsers(true);

    dispatch(fetchUsers())
      .unwrap() // 'dispatch' returns a Promise (on purpose), where '.then()' runs for succes and error, so we need to UNWRAP it
      // .then(() => setIsLoadingUsers(false))
      .catch((err) => {
        setLoadingUsersError(err);
        // setIsLoadingUsers(false);
      })
      .finally(() => setIsLoadingUsers(false)); // .finally runs always (so it can be removed from 'then' and 'catch')
  }, [dispatch]);
  // }, []); // eslint says the 'dispatch' is required in the dependancy array, but in fact it is not, and you can have it like this also

  const handleUserAdd = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .catch((err) => setCreatingUserError(err))
      .finally(() => setIsCreatingUser(false));
  };

  // if (isLoading) {
  if (isLoadingUsers) {
    return <Skeleton howMany={6} additionalClassNames="h-10 w-full" />;
  }

  // if (error) {
  if (loadingUsersError) {
    return <div>ERROR</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex flex-row justify-between items-center m-3 cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUser 
          ? 'Adding user...'
          : <Button onClick={handleUserAdd}>+ Add User</Button>
        }
        {creatingUserError && 'Error creating user...'}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;