import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// [we delay the response - only for development]
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

// - createApi() creates a slice behind the scene and that slice makes a combined reducer which neeeds to be added to the 'reducer' object in the store
// - reducerPath specifies the key value in the big state object, where all the state related to this API will be stored.
// - baseQuery specifies how and where to send requests.
// - RTK uses the browser's built-in 'fetch' function, but we still need to add some configuration for RTK, so it can configure 'fetch'.
//  'fetchBaseQuery' function makes a pre-configured version of 'fetch' (it's a configuration function)
// - 'endpoints()'specifies all read and write requests to the DB

// GET http://localhost:3005/albums?userId=1
// POST http://localhost:3005/albums   ->  body of the request must have { title: '', userId: 1 }
// DELETE http://localhost:3005/albums/1  ->  1 is a user's ID

const albumsApi = createApi({
  reducerPath: 'albums', // albums is a key in the big state object -> [albumsApi.reducerPath] === 'albums' in the store
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005', // DB server root/base address

    // [we delay the response - only for development]
    // fetchFn property allows to override the built-in fetch function
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      // fetchAlbums - name of the request
      // builder.query - specifies if it is query or mutation
      // and RTK creates a hook from this name: albumsApi.useFetchAlbumsQuery(), which we export at the bottom
      fetchAlbums: builder.query({
        // tags help to mark a QUERY as invalidate / out of date, so the data needs to be re-fetched by RTK
        // result - we receive it here, but don't use it; it's an object (properties) you can check by
        //          console logging the result of the query hook (created by 'createApi' here and used in AlbumsList.js)
        // error - received, but not used
        // user - argument passed to the hook in AlbumsList.js
        providesTags: (result, error, user) => {
          return [{ type: 'TagForAlbum', id: user.id }];
        },

        // 'user' is passed here through the 'useFetchAlbumsQuery(user)' in 'AlbumsList.js'
        query: (user) => {
          return {
            url: '/albums', // path for this request relative to the 'baseUrl'
            params: {
              userId: user.id, // query string for the request -> ?userId=user.id
            },
            method: 'GET', // GET,POST,DELETE
            // body: -> not needed
          };
        },
      }),
      // mutation
      addAlbum: builder.mutation({
        // user - this argument is not passed to the hook in AlbumsList.js directly
        //        it is passed in the function 'addAlbum' which is used in the 'handleAddAlbum' click event handler
        invalidatesTags: (result, error, user) => {
          return [{ type: 'TagForAlbum', id: user.id }];
        },

        query: (user) => {
          return {
            url: '/albums',
            // params: -> not needed
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(), // randomly generated title
            },
          };
        },
      }),
      //
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
