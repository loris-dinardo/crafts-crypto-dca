import {configureReduxStore} from "../../store";
import {defaultRootUseCasesDependencies} from "../../store/root-use-cases-dependencies";
import {defaultRootState} from "../../store/root-reducer";
import {DcaStrategy} from "../models/entities/dca-strategy";
import {OptionalUseCasesParamType} from "../infra/config";
import {createInMemoryRetrieveDcaStrategyListQuery} from "../infra/adapters";
import {defaultRootSelectorsDependencies} from "../../store/root-selectors-dependencies";

type TestStoreState = OptionalUseCasesParamType & {
    strategies?: Array<DcaStrategy>;
};

export const createTestStore = ({retrieveDcaStrategyListQuery, strategies}: TestStoreState) => {
    return configureReduxStore(
        defaultRootUseCasesDependencies({
            dcaStrategies: {
                retrieveDcaStrategyListQuery: retrieveDcaStrategyListQuery ?? createInMemoryRetrieveDcaStrategyListQuery(),
            }
        }),
        defaultRootSelectorsDependencies({}),
        {
            ...defaultRootState(),
            dcaStrategies: {
                strategies: strategies ?? []
            }
        }
    )
}