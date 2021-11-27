import {RetrieveStrategiesByUserQuery} from "../../models/ports/retrieve-strategies-by-user-query";
import {StrategyDto, toStrategy} from "../dtos";

export const createInMemoryRetrieveStrategiesByUserQuery = (
    {existingStrategies, failureReason}: { existingStrategies?: Array<StrategyDto>, failureReason?: string } = {}
): RetrieveStrategiesByUserQuery =>
    (userId) => {
        if (failureReason)
            return Promise.reject(new Error(failureReason));

        if (!existingStrategies)
            return Promise.resolve([]);

        return Promise.resolve(existingStrategies
            .filter(strategyDto => strategyDto.userId === userId)
            .map(strategyDtoFiltered => toStrategy(strategyDtoFiltered))
        );
    };