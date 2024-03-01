import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeAuthedApiRequest} from "../utils/api/apiHelper";
import {LOGOUT_USER} from "../constants";


// todo: move models
export type PurchaseAgreementModel = {
    id?: string;
    propertyId?: string;
    sellerUserId?: string;
    secondarySellerUserId?: string;
    sellingAgentUserId?: string;
    buyerUserId?: string;
    secondarBuyerUserId?: string;
    buyingAgentUserId?: string;
    senderUserId?: string;
    sendTime?: Date;
    isComplete?: boolean;
    streetAddress?: string;
    address2?: string;
    city?: string;
    county?: string;
    state?: string;
    zip?: string;
    legalDescriptionType?: 'exhibit' | 'condinium' | 'deed_book' | 'long_full_legal';
    deedBookNumber?: string;
    page?: string;
    purchasePrice?: string;
    sellersClosingCostContribution?: string;
    closingDate?: string;
    daysBetweenClosingAndPossession?: string;
    possessionHour?: string;
    possessionIsAm?: boolean;
    earnestMoneyHolder?: string;
    closingLawFirm?: string;
    earnestMoneyPaymentMethod?: 'check' | 'ach' | 'cash' | 'wire';
    earnestMoneyAmount?: string;
    earnestMoneyBindingAgreementDays?: string;
    dueDiligenceDays?: string;
    isBuiltBefore1978?: boolean;
    buyersBroker?: string;
    buyersBrokerRelationshipType?: 'client' | 'customer' | 'dual agent';
    dualAgencyBuyerAgentName?: string;
    sellersBroker?: string;
    sellersBrokerRelationshipType?: 'client' | 'customer' | 'dual agent';
    dualAgencySellersAgentNAme?: string;
    offerExpirationDate?: string;
    allCashSaleRequired?: boolean;
    backUpAgreementContingencyRequired?: boolean;
    closingAttorneyActingAsHolderOfEarnestMoneyRequired?: boolean;
    communityAssociationDisclosureRequired?: boolean;
    condominiumResalePurchaseAndSaleRequired?: boolean;
    conventionalLoanContingencyRequired?: boolean;
    fhaLoanContingencyRequired?: boolean;
    leadBasedPaintRequired?: boolean;
    leasePurchaseAndSaleRequired?: boolean;
    leaseForLeasePurchaseAgreementRequired?: boolean;
    legalDescriptionRequired?: boolean;
    loanAssumptionRequired?: boolean;
    saleOrLeaseOfBuyersPropertyContingencyRequired?: boolean;
    sellersPropertyDisclosureStatementRequired?: boolean;
    surveyOfPropertyAsExhibitRequired?: boolean;
    temporaryOccupancyAgreementForSellerAfterClosingRequired?: boolean;
    usdaRdLoanContingencyRequired?: boolean;
    vaLoanContingencyRequired?: boolean;
    accepted: boolean;
}

export interface PurchaseAgreementsState {
    agreements: { [key: string]: PurchaseAgreementModel[] };
    selectedAgreement: PurchaseAgreementModel | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialState: PurchaseAgreementsState = {
    agreements: {},
    selectedAgreement: null,
    status: 'idle',
    error: null,
};

export const fetchPurchaseAgreementsByProperty = createAsyncThunk(
    'purchaseAgreements/fetch',
    async (propertyId: string) => {
        const data = {
            propertyId
        }
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/purchaseAgreements/getAllPurchaseAgreementsForProperty',
            data
        });
        return response.data as PurchaseAgreementModel[];
    }
)
export const fetchPurchaseAgreementById = createAsyncThunk(
    'purchaseAgreements/fetchById',
    async (agreementId: string) => {
        const data = {
            id: agreementId
        }
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/purchaseAgreements/getPurchaseAgreement',
            data
        });

        return response.data as PurchaseAgreementModel;
    }
)

export const purchaseAgreementsSlice = createSlice({
    name: 'purchaseAgreements',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LOGOUT_USER, (state) => {
                return initialState;
            })
            .addCase(fetchPurchaseAgreementsByProperty.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPurchaseAgreementsByProperty.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const propertyId = action.meta.arg;
                state.agreements[propertyId] = action.payload;
            })
            .addCase(fetchPurchaseAgreementsByProperty.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(fetchPurchaseAgreementById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPurchaseAgreementById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedAgreement = action.payload;
            })
            .addCase(fetchPurchaseAgreementById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
    },
})

export const {  } = purchaseAgreementsSlice.actions

export default purchaseAgreementsSlice.reducer;