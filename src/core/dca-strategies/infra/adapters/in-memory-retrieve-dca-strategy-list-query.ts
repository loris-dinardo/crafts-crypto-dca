import {RetrieveDcaStrategyListQuery,} from "../../models/ports/retrieve-dca-strategy-list-query";
import {DcaStrategy} from "../../models/entities/dca-strategy";

export const createInMemoryRetrieveDcaStrategyListQuery = (
    {
        existingDcaStrategies = [],
        simulatedDelayInMs,
        failureReason,
    }: { existingDcaStrategies?: Array<DcaStrategy>; simulatedDelayInMs?: number, failureReason?: string } = {}): RetrieveDcaStrategyListQuery =>
    () => {
        if (failureReason) {
            return !simulatedDelayInMs
                ? Promise.reject(failureReason)
                : new Promise((resolve, reject) => setTimeout(() => reject(failureReason), simulatedDelayInMs));
        }
        return !simulatedDelayInMs
            ? Promise.resolve(existingDcaStrategies)
            : new Promise((resolve) => setTimeout(() => resolve(existingDcaStrategies), simulatedDelayInMs));
    };