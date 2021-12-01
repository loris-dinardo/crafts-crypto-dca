type TriggerUnionType = "Daily" | "Weekly" | "Undefined";

interface TriggerType<T = TriggerUnionType> {
    type: T
}

interface UndefinedTrigger extends TriggerType<"Undefined"> {
}

export interface TriggerTime {
    hour: string;
    minute: string;
    timeZone: string;
}

interface DailyTrigger extends TriggerType<"Daily"> {
    time: TriggerTime
}

interface WeeklyTrigger extends TriggerType<"Weekly"> {
    day: 2,
    time: TriggerTime
}

export type Trigger = DailyTrigger | WeeklyTrigger | UndefinedTrigger;