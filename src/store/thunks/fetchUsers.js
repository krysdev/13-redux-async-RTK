import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 'users/fetch' is a BASE TYPE describing the purpose of the rquest
// For the initial rquest RTK will make this type as 'users/fetch/pending'
// When there is a response, then RTK creates the action type (for the combined reducer to watch): 'users/fetch/fulfilled'
// When there is an error, then we have: 'users/fetch/rejected'
// We add these action types from the thunk to the 'extraReducers' section in the slice

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users'); // (/users, /albums, /photos - properties in DB.JSON)

  await pause(1000); // we delay the response - only for development, to see how LOADING works

  // 'response' has the 'data' property (which is our list of users in this case)
  // We return it, so we can use it in the combined reducer.
  // The returned DATA will be used as action payload of the fullfiled action case in the slice
  return response.data;
});

// [we delay the response - only for development]
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };

// also the below properties are created, and we use them as action types in the slice:
// fetchUsers.pending === 'users/fetch/pending' (the same for the two below)
// fetchUsers.fulfilled  --->   the returned response.data is the action.payload for the reducer
// fetchUsers.rejected   --->   RTK creates an ERROR object under the 'error' property of the action (action.error)
