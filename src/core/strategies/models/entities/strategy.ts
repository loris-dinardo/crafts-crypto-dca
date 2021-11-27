import {StrategyType} from "../value-objects/strategy-type";
import {BuyOrSell} from "../value-objects/buy-or-sell";
import {Trigger} from "../value-objects/trigger";
import {StrategySummary} from "../value-objects/strategy-summary";

export class Strategy {
    constructor(
        private _uuid: string,
        private _name: string,
        private _created: string,
        private _type: StrategyType,
        private _buyOrSell: BuyOrSell,
        private _exchange: string,
        private _asset: string,
        private _currency: string,
        private _currencyAmount: number,
        private _trigger: Trigger,
        private _active: boolean,
        private _modified?: string
    ) {
    }

    public toStrategySummary(): StrategySummary {
        return {
            uuid: this._uuid,
            name: this._name,
            exchange: this._exchange,
            asset: this._asset,
            description: this.computeDescription(),
            lastUpdate: this._modified ?? this._created,
        }
    }

    private computeDescription(): string {
        return this.computeTypeForDescription() + " - " +
            this.computeMoneyAmountForDescription() + " - " +
            this.computeTriggerForDescription();
    }

    private computeTypeForDescription(): string {
        return this._type.concat(" (", this._buyOrSell, ")");
    }

    private computeMoneyAmountForDescription(): string {
        return this._currencyAmount + this._currency;
    }

    private computeTriggerForDescription(): string {
        const { type } = this._trigger;
        switch (type){
            case "Daily":
                const { hour, minute, timeZone} = this._trigger;
                return "Triggered Daily at " + hour + ":" + minute + " " + timeZone;
            default:
                return "Never Triggered"
        }
    }
}