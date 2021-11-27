type TriggerUnionType = "Daily" | "Undefined";

interface TriggerType<T = TriggerUnionType> {
    type: T
}

interface UndefinedTrigger extends TriggerType<"Undefined"> {
}

interface DailyTrigger extends TriggerType<"Daily"> {
    hour: string;
    minute: string;
    timeZone: string;
}

export type Trigger = DailyTrigger | UndefinedTrigger;