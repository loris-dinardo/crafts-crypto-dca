import {DcaStrategy} from "../models/entities/dca-strategy";

interface DcaStrategyBuilderProps {
    uuid?: string;
    name?: string;
    type?: "Buy"
    asset?: string;
    exchange?: string;
    currencyAmount?: number;
    currency?: "USD";
    frequency?: { type: "Once" };
    active?: boolean;
}

export const DcaStrategyBuilder = (props: DcaStrategyBuilderProps = {}) => {
    return {
        withUuid(uuid: DcaStrategyBuilderProps['uuid']) {
            return DcaStrategyBuilder({
                ...props,
                uuid
            });
        },
        withName(name: DcaStrategyBuilderProps['name']) {
            return DcaStrategyBuilder({
                ...props,
                name
            });
        },
        withType(type: DcaStrategyBuilderProps['type']) {
            return DcaStrategyBuilder({
                ...props,
                type
            });
        },
        withAsset(asset: DcaStrategyBuilderProps['asset']) {
            return DcaStrategyBuilder({
                ...props,
                asset
            });
        },
        withExchange(exchange: DcaStrategyBuilderProps['exchange']) {
            return DcaStrategyBuilder({
                ...props,
                exchange
            });
        },
        withCurrencyAmount(currencyAmount: DcaStrategyBuilderProps['currencyAmount']) {
            return DcaStrategyBuilder({
                ...props,
                currencyAmount
            });
        },
        withCurrency(currency: DcaStrategyBuilderProps['currency']) {
            return DcaStrategyBuilder({
                ...props,
                currency
            });
        },
        withFrequency(frequency: DcaStrategyBuilderProps['frequency']) {
            return DcaStrategyBuilder({
                ...props,
                frequency
            });
        },
        activated(active: DcaStrategyBuilderProps['active']) {
            return DcaStrategyBuilder({
                ...props,
                active
            });
        },
        build(): DcaStrategy {
            return {
                uuid: props.uuid ?? "",
                name: props.name ?? "",
                type: props.type ?? "Buy",
                asset: props.asset ?? "",
                exchange: props.exchange ?? "",
                currencyAmount: props.currencyAmount ?? 0,
                currency: props.currency ?? "USD",
                frequency: props.frequency ?? {type: "Once"},
                active: props.active ?? false
            }
        }
    }
}