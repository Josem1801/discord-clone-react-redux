import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  serverId: null, 
  serverName: null,
  categoryId: null,
  categoryName: null,
  channelId: null,
  channelName: null

};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setServerId: (state, action) => {
      state.serverId = action.payload.serverId,
      state.serverName = action.payload.serverName
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload.categoryId,
      state.categoryName = action.payload.categoryName
    },
    setChannelId: (state, action) => {
      state.channelId = action.payload.channelId,
      state.channelName = action.payload.channelName
    }
  },
});

export const { setServerId, setCategoryId, setChannelId } = appSlice.actions;
//-----------Server-----------------
export const selectServerId = (state) => state.app.serverId;
export const selectServerName = (state) => state.app.serverName;
//-----------Category-----------------
export const selectCategoryId = (state) => state.app.categoryId;
export const selectCategoryName = (state) => state.app.categoryName;
//-----------Channel-----------------
export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;

export default appSlice.reducer;
