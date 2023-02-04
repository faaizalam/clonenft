import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import clientAxios, { CLIETNURL, serverAxios } from "../config/config";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (payload, thunkAPI) => {
    try {
      const response = await Promise.all([
        serverAxios.get("/projects"),
        serverAxios.get("/project-types"),
        serverAxios.get("/status"),
        serverAxios.get("/mint-status"),
      ]);
      // console.log(response,"best")
      return {
        0: response[0].data,
        1: response[1].data,
        2: response[2].data,
        3: response[3].data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please try again later!"
      );
    }
  }
);

const initialState = {
  projects: null,
  projectTypes: null,
  status: null,
  mintStatus: null,
  error: null,
  isLoading: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.error = null;
      state.projects = action.payload[0];
      state.projectTypes = action.payload[1];
      state.status = action.payload[2];
      state.mintStatus = action.payload[3];
      state.isLoading = false;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const {} = projectSlice.actions;

export default projectSlice.reducer;
