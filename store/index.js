import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import blogSlice from "./blogSlice";

const makeStore = () => {
  return configureStore({
    reducer: { blog: blogSlice.reducer },
  });
};

export const wrapper = createWrapper(makeStore, { debug: true });
