import {defaultRootUseCasesDependencies} from "../../store/root-use-cases-dependencies";
import {defaultRootState} from "../../store/root-reducer";
import {OptionalUseCasesParamType} from "../infrastructure/configuration/use-cases-dependencies";
import {defaultRootSelectorsDependencies} from "../../store/root-selectors-dependencies";
import {strategiesName} from "../infrastructure/slices/strategies-slice";
import {
    createInMemoryRetrieveStrategiesByUserQuery
} from "../infrastructure/adapters/in-memory-retrieve-strategies-by-user-query";
import {StrategySummary} from "../models/value-objects/strategy-summary";
import {configureReduxStore} from "../../store";

type TestStoreState = OptionalUseCasesParamType & {
    strategies?: Array<StrategySummary>;
};

export const createTestStore = ({retrieveStrategiesByUserQuery, strategies}: TestStoreState) => {
    return configureReduxStore(
        defaultRootUseCasesDependencies({
            strategies: {
                retrieveStrategiesByUserQuery: retrieveStrategiesByUserQuery ?? createInMemoryRetrieveStrategiesByUserQuery(),
            }
        }),
        defaultRootSelectorsDependencies({}),
        {
            ...defaultRootState(),
            [strategiesName]: {
                strategies: strategies ?? undefined
            }
        }
    )
}