export interface ISurvResultDetail {
reportDate: Date;
controlID: number;
controlShortName: string;
eventID: string;
assetClass: string;
instrument: string;
USI: string;
UTI: string;
swapLinkID: string;
buyerName: string;
sellerName: string;
buyUSDNotionalAmt: number;
buyRatePrice: string;
sellUSDNotionalAmt: number;
sellRatePrice: string;
numOfUnits: string;
buyerTranscID: string;
sellerTranscID: string;
}