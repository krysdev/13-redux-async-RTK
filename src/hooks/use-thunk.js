import { useState, useCallback } from 'react';
import { useDispatch} from 'react-redux';

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  // useCallBack to return runThunk with a stable identity, so the useEffect will not use it over and over again
  const runThunk = useCallback((argument) => {
    setIsLoading(true);
    dispatch(thunk(argument))
      .unwrap() // 'dispatch' returns a Promise (on purpose) where '.then()' runs for succes and error, so we need to UNWRAP it
      // .then(() => setIsLoading(false)) // moved to .finally
      .catch((err) => {
        // setIsLoading(false) // moved to .finally
        setError(err);
      })
      .finally(() => setIsLoading(false)); // .finally runs always (so it can be removed from 'then' and 'catch')
  }, [dispatch, thunk]);

  return [runThunk, isLoading, error];
}
