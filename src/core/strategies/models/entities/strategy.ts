import {StrategyType} from "../value-objects/strategy-type";
import {BuyOrSell} from "../value-objects/buy-or-sell";
import {Trigger, TriggerTime} from "../value-objects/trigger";
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
            description: this.strategyDescription(),
            lastUpdate: this._modified ?? this._created,
            activated: this._active
        }
    }

    private strategyDescription(): string {
        return this.typeDescription() + " - " +
            this.moneyAmountOfAssetOnExchangeDescription() + " - " +
            this.triggerDescription();
    }

    private typeDescription(): string {
        return this._type.concat(" (", this._buyOrSell, ")");
    }

    private moneyAmountOfAssetOnExchangeDescription(): string {
        return this._currencyAmount + this._currency +
            " of " + this._asset +
            " on " + this._exchange;
    }

    private triggerDescription(): string {
        const {type} = this._trigger;
        switch (type) {
            case "Daily":
                return "Triggered Daily at " + Strategy.triggerTimeDescription(this._trigger.time);
            case "Weekly":
                const {day} = this._trigger;
                return "Triggered Weekly on " + Strategy.triggerDayOfWeekDescription(day) + " at " + Strategy.triggerTimeDescription(this._trigger.time);
            default:
                return "Never Triggered"
        }
    }

    private static triggerTimeDescription(time: TriggerTime): string {
        const {hour, minute, timeZone} = time;
        return hour + ":" + minute + " " + timeZone;
    }

    private static triggerDayOfWeekDescription(day: number): string {
        const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return dayOfWeek[day];
    }
}