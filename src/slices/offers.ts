
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeAuthedApiRequest} from "../utils/api/apiHelper";
import {LOGOUT_USER} from "../constants";
import { OfferModel } from "../models/offerModel";
import { IncomingMessage, ServerResponse } from "http";
import { AxiosError } from "axios";

export interface OffersState {
  offersByProperty: { [key: string]: OfferModel[] };
  offersForSelectedGroup: OfferModel[];
  selectedOffer: OfferModel | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const initialState: OffersState = {
  offersByProperty: {},
  offersForSelectedGroup: [],
  selectedOffer: null,
  status: "idle",
  error: null
};

export const fetchOffersByPropertyId = createAsyncThunk(
  "offers/fetchByPropertyId",
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
        propertyId
      };

      const response = await makeAuthedApiRequest({
        method: "post",
        urlExtension: "/v1/offer/getOffersByPropertyId",
        data,
        isServer,
        req,
        res
      });
      console.log("response.data", response.data.length)
      return response.data as OfferModel[];
    } catch (err) {
      const axiosError = err as AxiosError;
      return rejectWithValue(axiosError?.response?.data);
    }
  }
);

export const fetchOfferById = createAsyncThunk(
  "offers/fetchById",
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
        urlExtension: "/v1/offer/getOffer",
        data,
        isServer,
        req,
        res,
      });

      return response.data as OfferModel;
    } catch (err) {
      const axiosError = err as AxiosError;
      return rejectWithValue(axiosError?.response?.data);
    }
  }
);

export const fetchOffersByBuyerGroupId = createAsyncThunk(
  "offers/fetchByBuyerGroupId",
  async (buyerGroupId: string) => {
    const data = {
      groupId: buyerGroupId,
    };
    const response = await makeAuthedApiRequest({
      method: "post",
      urlExtension: "/v1/offer/getOffersByGroupId",
      data,
    });

    return response.data as OfferModel[];
  }
);

export const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LOGOUT_USER, (state) => {
        console.log("logout user")
        return initialState;
      })
      .addCase(fetchOffersByPropertyId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOffersByPropertyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        const propertyId = action.meta.arg.propertyId;
        state.offersByProperty[propertyId] = action.payload;
      })
      .addCase(fetchOffersByPropertyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload) {
          state.selectedOffer = action.payload;
          if (action.payload.propertyId && action.payload.id) {
            if (
              !state.offersByProperty[action.payload.propertyId]?.find(
                (offer) => offer.id === action.payload.id
              )
            ) {
              if (state.offersByProperty[action.payload.propertyId]) {
                state.offersByProperty[action.payload.propertyId].push(
                  action.payload
                );
              } else {
                state.offersByProperty[action.payload.propertyId] = [
                  action.payload,
                ];
              }
            }
          }
        }
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchOffersByBuyerGroupId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOffersByBuyerGroupId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offersForSelectedGroup = action.payload;
      })
      .addCase(fetchOffersByBuyerGroupId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const {} = offersSlice.actions;

export default offersSlice.reducer;
