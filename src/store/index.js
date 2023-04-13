import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
// export { store };

// take everything what is exported in the thunk and export it from here
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
// (always make "store/index.js" the central place to import the Redux stuff from)