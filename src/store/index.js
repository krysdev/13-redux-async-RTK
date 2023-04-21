import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';

// to connect API with the store
import { setupListeners } from '@reduxjs/toolkit/query';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';

export const store = configureStore({
  reducer: {
    users: usersReducer, // 'usersReducer' is the named combined reducer exported in the slice

    // To connect API with the store.
    // 'albumsApi.reducer' is automatically created by 'createApi'
    [albumsApi.reducerPath]: albumsApi.reducer, // this is the same as -> albums: albumsApi.reducer
    [photosApi.reducerPath]: photosApi.reducer,
  },

  // To connect API with the store.
  // a set of middleware is created whenever we create an API ('createApi')
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

// To connect API with the store.
setupListeners(store.dispatch);

// Always make "store/index.js" the central place to import the Redux stuff from, so we re-export things here:

// take everything what is exported in the thunk and export it from here
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';

// re-export also the APIs stuff
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albumsApi';

export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} from './apis/photosApi';
