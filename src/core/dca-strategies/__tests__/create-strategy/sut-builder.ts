import {DcaStrategy} from "../../models/entities/dca-strategy";

interface SUTProps {
    name?: string,
    type?: "Buy"
    asset?: string,
    exchange?: string,
    currencyAmount?: number,
    currency?: "USD",
    frequency?: "Once"
}

export const createStrategySUT = (props: SUTProps = {}) => {
    return {
        named(name: SUTProps['name']) {
            return createStrategySUT({
                ...props,
                name
            })
        },
        toBuyAsset(asset: SUTProps['asset']) {
            return createStrategySUT({
                ...props,
                type: "Buy",
                asset
            })
        },
        onExchange(exchange: SUTProps['exchange']) {
            return createStrategySUT({
                ...props,
                exchange
            })
        },
        ofCurrencyAmount(currencyAmount: SUTProps['currencyAmount']) {
            return createStrategySUT({
                ...props,
                currencyAmount
            })
        },
        usingCurrency(currency: SUTProps['currency']) {
            return createStrategySUT({
                ...props,
                currency
            })
        },
        buyOnce() {
            return createStrategySUT({
                ...props,
                frequency: "Once"
            })
        },
        build() {
            const selectNotActivatedDcaStrategies = () => selector(props)
            const createDcaStrategy = async () => {
            }
            return {
                selectNotActivatedDcaStrategies,
                createDcaStrategy
            }
        }
    }
}

const selector = (props: SUTProps): { dcaStrategies: Array<DcaStrategy> } => {
    return {
        dcaStrategies: [
            {
                uuid: "strategy_1",
                name: props.name || "",
                type: props.type || "Buy",
                asset: props.asset || "",
                exchange: props.exchange || "",
                currencyAmount: props.currencyAmount || 0,
                currency: props.currency || "USD",
                frequency: {type: props.frequency || "Once"},
                active: false
            }
        ]
    }

}
