import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// - createApi() creates a slice behind the scene and that slice makes a combined reducer which neeeds to be added to the 'reducer' object in the store
// - reducerPath specifies the key value in the big state object, where all the state related to this API will be stored.
// - baseQuery specifies how and where to send requests.
// - RTK uses the browser's built-in 'fetch' function, but we still need to add some configuration for RTK, so it can configure 'fetch'.
//  'fetchBaseQuery' function makes a pre-configured version of 'fetch' (it's a configuration function)
// - 'endpoints()'specifies all read and write requests to the DB

// GET http://localhost:3005/albums?userId=1
// POST http://localhost:3005/albums   ->  body of the request must have { title: 'Doom', userId: 1 }
// DELETE http://localhost:3005/albums/1  ->  1 is a user's ID

const albumsApi = createApi({
  reducerPath: 'albums', // albums is a key in the big state object -> [albumsApi.reducerPath] === 'albums' in the store
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005', // DB server root/base address
  }),
  endpoints(builder) {
    return {
      // fetchAlbums -> name of the request;
      fetchAlbums: builder.query({
        //  builder.query ->  query or mutation
        // and RTK creates a hook from this name: albumsApi.useFetchAlbumsQuery(), which we export at the bottom
        query: (user) => {
          // 'user' is passed here through the 'useFetchAlbumsQuery(user)' in 'AlbumsList.js'
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
      addAlbum: builder.mutation({
        // mutation
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
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersAlbums', id: user.id }];
        },
      }),
      //
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
