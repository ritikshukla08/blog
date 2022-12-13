import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    curPage: 1,
    allBlogs: [],
  },
  reducers: {
    setBlogs(state, action) {
      state.allBlogs.push(action.payload);
    },
    navigatePage(state, action) {
      state.curPage = action.payload;
    },
    prevPage(state) {
      if (state.curPage > 1) state.curPage = --state.curPage;
    },
    nextPage(state) {
      state.curPage = ++state.curPage;
    },
  },
});

export const blogActions = blogSlice.actions;

export default blogSlice;
