import { put, retry, takeLatest } from "redux-saga/effects";
import {
  GET_POSTS,
  clearPosts,
  getPostFailed,
  getPostLoading,
  getPostsSuccess,
} from "./DataSlice";
import { getPostApi } from "../utils/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { DataItem } from "../models/models";

export function* getPostSaga(action: PayloadAction<string>) {
  const text = action.payload.trim();

  if (text) {
    try {
      yield put(getPostLoading());
      const payload: DataItem[] = yield retry(3, 1000, getPostApi, text);

      yield put(getPostsSuccess(payload));
    } catch (error) {
      yield put(getPostFailed((error as Error).message));
    }
  } else {
    yield put(clearPosts());
    yield put(getPostsSuccess([]));
  }
}

export function* sagas() {
  yield takeLatest(GET_POSTS, getPostSaga);
}
