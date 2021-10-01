import {
    RetrieveDcaStrategyListQuery,
    RetrieveDcaStrategyListQueryResult
} from "../../models/ports/retrieve-dca-strategy-list-query";

export const createInMemoryRetrieveDcaStrategyListQuery = (
    {
        existingDcaStrategies = [],
        simulatedDelayInMs,
        failureReason,
    }: { existingDcaStrategies?: RetrieveDcaStrategyListQueryResult['dcaStrategies']; simulatedDelayInMs?: number, failureReason?: string } = {}): RetrieveDcaStrategyListQuery =>
    () => {
        const res = {
            dcaStrategies: existingDcaStrategies,
        };
        if (failureReason) {
            return !simulatedDelayInMs
                ? Promise.reject(failureReason)
                : new Promise((resolve, reject) => setTimeout(() => reject(failureReason), simulatedDelayInMs));
        }
        return !simulatedDelayInMs
            ? Promise.resolve(res)
            : new Promise((resolve) => setTimeout(() => resolve(res), simulatedDelayInMs));
    };