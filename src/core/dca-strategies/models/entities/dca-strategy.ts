export interface DcaStrategy {
    uuid: string;
    name: string;
    type: "Buy"
    asset: string;
    exchange: string;
    currencyAmount: number;
    currency: "USD";
    frequency: { type: "Once" };
    active: boolean;
}