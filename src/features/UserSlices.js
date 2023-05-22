import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password, remember }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      let data = await response.json();
      console.log('response', data);
      if (response.status === 200) {
        localStorage.setItem('token', data.body.token);
        if(remember) {
            localStorage.setItem("email", (email))
            localStorage.setItem("psw", (password))
        }
        if(!remember) {
            localStorage.removeItem("email")
            localStorage.removeItem("psw")
        }
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log('data', data, response.status);

      if (response.status === 200) {
        const dataUser = data
        return dataUser ;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updateUserBytoken = createAsyncThunk(
  'users/updateUserByToken',
  async ( {userName} , thunkAPI) => {
    let token = localStorage.getItem("token")
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName
          }),
        }
      );
      const data = await response.json();
      console.log('data', data, response.status);

      if (response.status === 200) {
        const dataUserUpdated = data
        return dataUserUpdated ;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userName = payload.body.userName;
      state.firstName = payload.body.firstName;
      state.lastName = payload.body.lastName;
    },
    [fetchUserBytoken.rejected]: (state) => {
      console.log('fetchUserBytoken');
      state.isFetching = false;
      state.isError = true;
    },
    [updateUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [updateUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userName = payload.body.userName;
      state.firstName = payload.body.firstName;
      state.lastName = payload.body.lastName;
    },
    [updateUserBytoken.rejected]: (state) => {
      console.log('updateUserBytoken');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
