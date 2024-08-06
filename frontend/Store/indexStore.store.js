import { configureStore } from "@reduxjs/toolkit";
import authenticationStore from "./authentication.store.js";
import settingStore from "./setting.store.js";
const store = configureStore({
  reducer: { valid: authenticationStore, setting: settingStore },
});

export default store;
