import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// - createApi() creates a slice behind the scene
// - reducerPath specifies the key value in the big state object, where all the state related to this API will be stored
// - baseQuery specifies how and where to send requests
// - RTK uses the built in browsers 'fetch' function, but we still need to add some configuration for RTK, so it can configure 'fetch'

const albumsApi = createApi({
  reducerPath: 'albums',
});
