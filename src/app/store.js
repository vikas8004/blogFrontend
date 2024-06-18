import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/authFeature";
const store = configureStore({
  reducer: {
    // Add your reducers here
    auth,
  },
});
export default store;
