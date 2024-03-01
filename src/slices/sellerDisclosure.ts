import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeAuthedApiRequest } from "../utils/api/apiHelper";
import { LOGOUT_USER } from "../constants";
import { IncomingMessage, ServerResponse } from "http";
import { AxiosError } from "axios";
import { sellerDisclosureModel } from "../models/sellerDisclosureModel";

export interface sellerDisclosureState {
  sellerDisclosureProperty: { [key: string]: sellerDisclosureModel[] };
  sellerDisclosureForSelectedGroup: sellerDisclosureModel[];
  selectedSellerDisclosure: sellerDisclosureModel | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const initialState: sellerDisclosureState = {
  sellerDisclosureProperty: {},
  sellerDisclosureForSelectedGroup: [],
  selectedSellerDisclosure: null,
  status: "idle",
  error: null
};

export const fetchSellerDisclosureByPropertyId = createAsyncThunk(
  "sellerDisclosure/fetchByPropertyId",
  async (
    arg: {
      propertyId: string;
      isServer?: boolean;
      req?: IncomingMessage;
      res?: ServerResponse;
    },
    { rejectWithValue }
  ) => {
    try {
      const { propertyId, isServer, req, res } = arg;
      const data = {
        propertyId,
      };

      const response = await makeAuthedApiRequest({
        method: "post",
        urlExtension: "/v1/sellerDisclosure/getSellerDisclosure",
        data,
        isServer,
        req,
        res,
      });

      return response.data as sellerDisclosureModel[];
    } catch (err) {
      const axiosError = err as AxiosError;
      return rejectWithValue(axiosError?.response?.data);
    }
  }
);

export const fetchSellerDisclosureById = createAsyncThunk(
  "sellerDisclosure/fetchById",
  async (
    arg: {
      offerId: string;
      isServer?: boolean;
      req?: IncomingMessage;
      res?: ServerResponse;
    },
    { rejectWithValue }
  ) => {
    try {
      const { offerId, isServer, req, res } = arg;
      const data = {
        id: offerId,
      };

      const response = await makeAuthedApiRequest({
        method: "post",
        urlExtension: "/v1/sellerDisclosure/getSellerDisclosure",
        data,
        isServer,
        req,
        res
      });

      return response.data as sellerDisclosureModel;
    } catch (err) {
      const axiosError = err as AxiosError;
      return rejectWithValue(axiosError?.response?.data);
    }
  }
);

export const fetchSellerDisclosureByBuyerGroupId = createAsyncThunk(
  "sellerDisclosure/fetchByBuyerGroupId",
  async (buyerGroupId: string) => {
    const data = {
      groupId: buyerGroupId,
    };
    const response = await makeAuthedApiRequest({
      method: "post",
      urlExtension: "/v1/",
      data,
    });

    return response.data as sellerDisclosureModel[];
  }
);

export const sellerDisclosureSlice = createSlice({
  name: "sellerDisclosure",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LOGOUT_USER, (state) => {
        return initialState;
      })
      .addCase(fetchSellerDisclosureByPropertyId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSellerDisclosureByPropertyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        const propertyId = action.meta.arg.propertyId;
        state.sellerDisclosureProperty[propertyId] = action.payload;
      })
      .addCase(fetchSellerDisclosureByPropertyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchSellerDisclosureById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSellerDisclosureById.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload) {
          state.selectedSellerDisclosure = action.payload;
          if (action.payload.propertyId) {
            if (state.sellerDisclosureProperty[action.payload.propertyId]) {
              state.sellerDisclosureProperty[action.payload.propertyId].push(
                action.payload
              );
            } else {
              state.sellerDisclosureProperty[action.payload.propertyId] = [
                action.payload,
              ];
            }
          }
        }
      })
      .addCase(fetchSellerDisclosureById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchSellerDisclosureByBuyerGroupId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSellerDisclosureByBuyerGroupId.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.sellerDisclosureForSelectedGroup = action.payload;
        }
      )
      .addCase(
        fetchSellerDisclosureByBuyerGroupId.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "Unknown error";
        }
      );
  },
});

export const {} = sellerDisclosureSlice.actions;

export default sellerDisclosureSlice.reducer;
