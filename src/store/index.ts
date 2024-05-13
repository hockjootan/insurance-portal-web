import { configureStore, combineReducers } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import userListReducer from "./userListSlice";

const rootReducer = combineReducers({
  profile: profileReducer,
  userList: userListReducer,
});

export const makeStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

export default makeStore;
