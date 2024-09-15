import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataItem } from "../models/models";

interface InitialState {
  posts: DataItem[];
  error: string | null;
  loading: boolean;
}

const initialState: InitialState = {
  posts: [],
  error: "",
  loading: false,
};

const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getPostsSuccess(state, action: PayloadAction<DataItem[]>) {
      state.loading = false;
      state.posts = action.payload;
      state.error = null;
    },
    getPostFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.posts = [];
    },
    getPostLoading(state) {
      state.loading = true;
      state.error = null;
    },
    clearPosts(state) {
      state.posts = [];
    },
  },
});

export const GET_POSTS = "posts/getPosts";
export const getPosts = createAction<string>(GET_POSTS);

export const { getPostsSuccess, getPostFailed, getPostLoading, clearPosts } =
  DataSlice.actions;

export default DataSlice.reducer;
