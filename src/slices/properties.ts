import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeAuthedApiRequest} from "../utils/api/apiHelper";
import { AxiosError } from "axios";
import {LOGOUT_USER} from "../constants";
import { BasicProperty } from "../models/basicProperty";
import { IncomingMessage, ServerResponse } from 'http';
export type PropertyModel = {
    id: string;
    userId?: string;
    onboardingStep?: string;
    groupId?: string;
    listedDate?: Date;
    status?: 'PREPARING' | 'LISTED' | 'PENDING' | 'ARCHIVED'
    firstTitleHolderUserId?: string;
    secondTitleHolderUserId?: string;
    firstTitleHolderIdentifier?: string;
    secondTitleHolderIdentifier?: string;
    sellersAgentUserId?: string;
    buyerSideCommission?: number;
    streetAddress?: string;
    address2?: string;
    propertyType?: string;
    city?: string;
    state?: string;
    zip?: string;
    zipPlusFour?: string;
    county?: string;
    neighborhood?: string;
    latitude?: number;
    longitude?: number;
    timeZone?: 'ET' | 'CT' | 'MT' | 'PT';
    squareFeet?: number;
    lotSizeSquareFeet?: number;
    lotSizeAcres?: number;
    addressHash?: string;
    apn?: string;
    fipsCode?: string;
    schoolTaxDistrictCodes?: string;
    taxRateCodeArea?: string;
    taxId?: string;
    totalAssessedValue?: number;
    taxAmount?: number;
    assessmentYear?: number;
    bedroomCount?: number;
    bathroomCount?: number;
    yearBuilt?: number;
    airConditioningSource?: string;
    heatSource?: string;
    garageParkingSpaceCount?: number;
    schoolDistrict?: string;
    homeOwnerAssociationType?: string;
    homeOwnerAssociationFee?: number;
    homeOwnerAssociationFeeFrequency?: string;
    mlsId?: string;
    legalDescription?: string;
    cityTownshipMunicipality?: string;
    estimatedValue?: number;
    priceRangeMin?: number;
    priceRangeMax?: number;
    standardDeviation?: number;
    confidenceScore?: number;
    pricePerSquareFoot?: number;
    coverImage?: string;
    images?: object;
    imageCount?: number;
    marketingDescription?: string;
    listPrice?: number;
    hasDeedBook?: boolean;
    hasLandLot?: boolean;
    deedBook?: string;
    deedPage?: string;
    landLot?: string;
    district?: string;
    lotNumber?: string;
    subdivisionName?: string;
};

export interface PropertiesState {
    properties: { [key: string]: PropertyModel };
    mapProperties: BasicProperty[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialState: PropertiesState = {
    properties: {},
    mapProperties: [],
    status: 'idle',
    error: null,
};

export const fetchProperties = createAsyncThunk(
    'properties/fetch',
    async (arg: { isServer?: boolean; req?: IncomingMessage; res?: ServerResponse }, { rejectWithValue }) => {
        try {
            const { isServer, req, res } = arg;

            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: `/v1/property/propertiesByGroupForUser`,
                isServer,
                req,
                res,
            });

            return response.data.properties;

        } catch (err) {
            const axiosError = err as AxiosError;
            return rejectWithValue(axiosError?.response?.data);
        }
    }
);


export const fetchMapProperties = createAsyncThunk(
    'properties/fetchMap',
    async (_, { rejectWithValue }) => {
        try {
            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: `/v1/properties/public/getPropertiesForMap`,
            });
            return response.data.properties;
        } catch (err) {
            const axiosError = err as AxiosError;
            return rejectWithValue(axiosError?.response?.data);
        }
    }
);
  

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LOGOUT_USER, (state) => {
                return initialState;
            })
            .addCase(fetchProperties.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.properties = action.payload;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(fetchMapProperties.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(fetchMapProperties.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mapProperties = action.payload;
              })
              .addCase(fetchMapProperties.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
              });
    },
})

export const {  } = propertiesSlice.actions

export default propertiesSlice.reducer;