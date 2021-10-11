import {configureReduxStore} from "../../store";
import {defaultRootDependencies} from "../../store/root-dependencies";
import {defaultRootState} from "../../store/root-reducer";
import {DcaStrategy} from "../models/entities/dca-strategy";
import {OptionalParamType} from "../infra/config";
import {createInMemoryRetrieveDcaStrategyListQuery} from "../infra/adapters";

type TestStoreState = OptionalParamType & {
    strategies?: Array<DcaStrategy>;
};

export const createTestStore = ({retrieveDcaStrategyListQuery, strategies}: TestStoreState) => {
    return configureReduxStore(
        defaultRootDependencies({
            dcaStrategies: {
                retrieveDcaStrategyListQuery: retrieveDcaStrategyListQuery ?? createInMemoryRetrieveDcaStrategyListQuery(),
            }
        }),
        {
            ...defaultRootState(),
            dcaStrategies: {
                strategies: strategies ?? []
            }
        }
    )
}