import numeral from "numeral";
import { OfferModel } from "../models/offerModel";
import { AxiosError } from "axios";

interface ErrorResponse {
    code: string;
    message: string;
}

export function canUserSignOffer(offer: OfferModel, userId?: string): boolean {
    if ((offer.buyerUser?.id === userId && offer.buyerSignature?.status !== 'SIGNED' && offer.buyerSignature?.status !== 'REJECTED') ||
        (offer.secondBuyerUser?.id === userId && offer.secondBuyerSignature?.status !== 'SIGNED' && offer.secondBuyerSignature?.status !== 'REJECTED') ||
        (offer.buyerAgentUser?.id === userId && offer.buyerAgentSignature?.status !== 'SIGNED' && offer.buyerAgentSignature?.status !== 'REJECTED')) {
        return true;
    }

    if ((offer.sellerSignerUser?.id === userId && offer.sellerSignature?.status !== 'SIGNED' && offer.sellerSignature?.status !== 'REJECTED') ||
        (offer.secondSellerSignerUser?.id === userId && offer.secondSellerSignature?.status !== 'SIGNED' && offer.secondSellerSignature?.status !== 'REJECTED') ||
        (offer.sellerAgentUser?.id === userId && offer.sellerAgentSignature?.status !== 'SIGNED' && offer.sellerAgentSignature?.status !== 'REJECTED')) {
        return true;
    }

    return false;
}
export const isAxiosError = (error: any): error is AxiosError<ErrorResponse> => {
    return error && error.isAxiosError === true;
};
export function extractDateTime(dateStr: string, omitAMPM = false) {
    const dateTime = new Date(dateStr.replace(' ', 'T')); // Convert to ISO format by replacing space with 'T'
  
    // Extract Date
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Months are 0-indexed, so adding 1
    const day = dateTime.getDate();
    const dayDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  
    // Extract Time
    const hours24 = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const isAM = hours24 < 12;
    const isPM = !isAM;
    const hours12 = hours24 % 12 || 12; // Convert to 12-hour format, and replace 0 with 12 for midnight
    const ampm = isAM ? 'AM' : 'PM';
    const time = `${hours12}:${String(minutes).padStart(2, '0')}${omitAMPM ? '' : ' ' + ampm}`;
  
    return {
      dayDate,
      time,
      isAM,
      isPM
    };
}

export function calculateRemainingPaymentPercentage(purchasePrice: number, downPaymentAmount: number) {
    // Calculate the remaining amount
    const remainingAmount = purchasePrice - downPaymentAmount;
  
    // Calculate the percentage of the remaining amount relative to the purchase price
    const remainingPercentage = (remainingAmount / purchasePrice) * 100;
  
    // Round to 2 decimal places
    return Math.round(remainingPercentage * 100) / 100;
}

export function numberToWords(n: number) {
  const ones = [
      "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
  ];

  const tens = [
      "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ];

  if (n < 20) {
      return ones[n];
  }

  if (n >= 20 && n < 100) {
      const divisor = Math.floor(n / 10);
      const remainder = n % 10;
      return tens[divisor] + (remainder ? "-" + ones[remainder] : "");
  }

  return "Number out of range";  // For numbers outside 0-99 in this simple example
}

export const formatMoney = (value?: number) => {
    if (!value) return "$0"
    return numeral(value).format('$0,0');
  }


export const formatPhoneNumber = (input: string) => {
    let cleaned = ('' + input).replace(/\D/g, '');

    cleaned = cleaned.substring(0, 10);

    const part1 = cleaned.substring(0, 3);
    const part2 = cleaned.substring(3, 6); 
    const part3 = cleaned.substring(6, 10);

    if (cleaned.length > 6) {
        return `${part1}-${part2}-${part3}`;
    } else if (cleaned.length > 3) {
        return `${part1}-${part2}`;
    } else {
        return part1;
    }
};
  
  
  