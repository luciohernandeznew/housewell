import { UserModel } from "../slices/user";
import { Signature } from "./signature";

export type OfferModel = {
    id: string;
    propertyId: string;
    creatorUserId: string;

    status: 'PREPARING' | 'PENDING-BUYER-SIGNATURE' | 'PENDING-SELLER-SIGNATURE' | 'ACCEPTED' | 'REJECTED' | 'ARCHIVED'

    buyerUserId?: string;
    secondBuyerUserId?: string;
    buyerAgentUserId?: string;

    buyerUser: UserModel;
    secondBuyerUser?: UserModel;
    buyerAgentUser?: UserModel;

    buyerSignature: Signature;
    secondBuyerSignature?: Signature;
    buyerAgentSignature?: Signature;

    buyerGroupId?: string;
    buyerSideCommission?: number;
    buyersAgentBrokerage?: string;

    sellerSignerUserId?: string;
    secondSellerSignerUserId?: string;
    sellerAgentUserId: string;

    sellerSignerUser: UserModel;
    secondSellerSignerUser?: UserModel;
    sellerAgentUser: UserModel;

    sellerSignature: Signature;
    secondSellerSignature?: Signature;
    sellerAgentSignature: Signature;

    offerType?: 'FIXED' | 'ESCALATION';
    offerAmt?: number;
    escalationMaxAmt?: number;
    escalationAmt?: number;

    financingType?: 'PREAPPROVED' | 'NOT_PREAPPROVED' | 'CASH';
    hasPreApproval?: boolean;
    loanType?: 'CONVENTIONAL' | 'FHA' | 'VA';
    downPaymentAmt?: number;
    sellerClosingAmt?: number;
    earnestMoneyAmt?: number;

    inspectionCont: boolean;
    financingCont: boolean;
    daysToGetPreapproval: number;
    interestRate: number
    homeSaleCont: boolean;
    homeSaleContAmt?: number;

    appraisalCont: boolean;
    appraisalContAmt?: number;

    tempOccCont: boolean;
    tempOccDays?: number;
    tempOccPenaltyAmt?: number;

    tempOccBuyerCont: boolean;
    tempOccBuyerDays?: number;
    tempOccBuyerDailyCost?: number;

    closingDate?: Date;
    possessionDate?: Date;
    dueDiligenceDate?: Date;
    dueDiligenceDays?: number;
    expiryDate?: Date;

    updatedAt?: Date;

    customCont?: string;
    customContText?: string;

    closingAttorney?: string;
    closingAttorneyAddress?: string;
    closingAttorneyPhone?: string;
    closingAttorneyEmail?: string;

    closingAttorneyAsHolderOfEarnestMoney?: boolean;
    holderOfEarnestMoney?: string;

    stepOneComplete?: boolean;
    stepTwoComplete?: boolean;
    stepThreeComplete?: boolean;
    stepFourComplete?: boolean;
    stepFiveComplete?: boolean;
}
