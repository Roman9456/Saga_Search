import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice";
import createSagaMiddleware from "redux-saga";
import { sagas } from "./mySaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { data: DataSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
