import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./project";
import themeReducer from "./theme";
import logReducer from "./log"
import projectsReducer from "./projects";
export const store = configureStore({
  reducer: {
    project: projectReducer,
    theme:themeReducer,
    log:logReducer,
    Projects:projectsReducer

  },
});
