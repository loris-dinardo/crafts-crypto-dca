import {BuyOrSellDto, StrategyDto, StrategyTypeDto, TriggerDto} from "./strategy-dto";

interface StrategyDtoBuilderProps {
    userId?: string;
    uuid?: string;
    name?: string;
    created?: string;
    modified?: string;
    type?: StrategyTypeDto;
    buyOrSell?: BuyOrSellDto;
    exchange?: string;
    asset?: string;
    currency?: string;
    currencyAmount?: number;
    trigger?: TriggerDto;
    active?: boolean;
}

export const StrategyDtoBuilder = (props: StrategyDtoBuilderProps = {}) => {
    return {
        build(modifiedProps: StrategyDtoBuilderProps = {}): StrategyDto {
            return {
                userId: modifiedProps.userId ?? props.userId ?? "",
                uuid: modifiedProps.uuid ?? props.uuid ?? "",
                name: modifiedProps.name ?? props.name ?? "",
                created: modifiedProps.created ?? props.created ?? "",
                modified: modifiedProps.modified ?? props.modified,
                type: modifiedProps.type ?? props.type ?? "Undefined",
                buyOrSell: modifiedProps.buyOrSell ?? props.buyOrSell ?? "Undefined",
                exchange: modifiedProps.exchange ?? props.exchange ?? "",
                asset: modifiedProps.asset ?? props.asset ?? "",
                currency: modifiedProps.currency ?? props.currency ?? "Undefined",
                currencyAmount: modifiedProps.currencyAmount ?? props.currencyAmount ?? 0,
                trigger: modifiedProps.trigger ?? props.trigger ?? {type: "Undefined"},
                active: modifiedProps.active ?? props.active ?? false,
            }
        }
    }
}