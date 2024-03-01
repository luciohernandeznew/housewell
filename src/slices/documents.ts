
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeAuthedApiRequest} from "../utils/api/apiHelper";
import {LOGOUT_USER} from "../constants";
import { IncomingMessage, ServerResponse } from "http";
import { AxiosError } from "axios";

export type Document = {
    value: string;
    url: string;
    label: string;
    numberPages: number;
}

export interface DocumentsState {
  documents: Document[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const initialState: DocumentsState = {
  documents: [],
  status: "idle",
  error: null
};

export const fetchDocumentsForOfferById = createAsyncThunk(
  "documents/fetchById",
  async (
    arg: {
      id: string;
      isServer?: boolean;
      req?: IncomingMessage;
      res?: ServerResponse;
    },
    { rejectWithValue }
  ) => {
    try {
      const { id, isServer, req, res } = arg;
      const data = {
        id
      };

      const response = await makeAuthedApiRequest({
        method: "post",
        urlExtension: "/v1/offer/getDocuments",
        data,
        isServer,
        req,
        res
      });
      return response.data as Document[];
    } catch (err) {
      const axiosError = err as AxiosError;
      return rejectWithValue(axiosError?.response?.data);
    }
  }
);

export const documentsSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(LOGOUT_USER, (state) => {
          return initialState;
        })
        .addCase(fetchDocumentsForOfferById.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchDocumentsForOfferById.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.documents = action.payload;
        })
        .addCase(fetchDocumentsForOfferById.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "Unknown error";
        });
    },
  });
  
  export default documentsSlice.reducer;
