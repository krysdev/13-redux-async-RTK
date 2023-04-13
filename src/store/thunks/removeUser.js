import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async (user) => {

  // When we send the DELETE request to the server, the response is an empty object, so we can't return 'response.data' to use it as a payload in the reducer.

  // const response = await axios.delete(`http://localhost:3005/users/${user.id}`);
  // return response.data

  await axios.delete(`http://localhost:3005/users/${user.id}`);
  return user;
});

export { removeUser };
