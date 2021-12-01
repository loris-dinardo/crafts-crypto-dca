import {Strategy} from "../../models/entities";

export interface StrategyDto {
    userId: string;
    uuid: string;
    name: string;
    created: string;
    modified?: string;
    type: StrategyTypeDto;
    buyOrSell: BuyOrSellDto;
    exchange: string;
    asset: string;
    currency: string;
    currencyAmount: number;
    trigger: TriggerDto;
    active: boolean;
}

export type StrategyTypeDto = "DCA" | "Undefined";
export type BuyOrSellDto = "Buy" | "Sell" | "Undefined";
type TriggerType = "Daily" | "Weekly" | "Undefined";

interface Trigger<T = TriggerType> {
    type: T
}

interface UndefinedTrigger extends Trigger<"Undefined"> {
}

interface TriggerTime {
    hour: string;
    minute: string;
    timeZone: string;
}

interface DailyTrigger extends Trigger<"Daily"> {
    time: TriggerTime
}

interface WeeklyTrigger extends Trigger<"Weekly"> {
    day: 2,
    time: TriggerTime
}

export type TriggerDto = DailyTrigger | WeeklyTrigger | UndefinedTrigger;

export const toStrategy = ({
                               uuid,
                               name,
                               created,
                               modified,
                               type,
                               buyOrSell,
                               exchange,
                               asset,
                               currency,
                               currencyAmount,
                               trigger,
                               active
                           }: StrategyDto): Strategy => (
    new Strategy(
        uuid,
        name,
        created,
        type,
        buyOrSell,
        exchange,
        asset,
        currency,
        currencyAmount,
        trigger,
        active,
        modified
    )
);