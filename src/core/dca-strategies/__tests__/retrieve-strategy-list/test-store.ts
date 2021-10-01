import {createStore, RootState, StoreProps} from "../../../store";
import {dcaStrategiesAdapter, dcaStrategiesInitialState, dcaStrategiesSlice} from "../../application/slice";
import {createInMemoryRetrieveDcaStrategyListQuery} from "../../infra/adapters";

type TestStoreProps = Partial<StoreProps> & {};

export const createTestStore = (
    {
        retrieveDcaStrategyListQuery = createInMemoryRetrieveDcaStrategyListQuery(),
        ...storeProps
    }: TestStoreProps = {}) => {
    const dcaStrategies = dcaStrategiesAdapter.upsertMany(dcaStrategiesInitialState, []);

    const preloadedState: RootState = {
        [dcaStrategiesSlice.name]: dcaStrategies,
    };
    return createStore({
            retrieveDcaStrategyListQuery,
            preloadedState,
            ...storeProps
        }
    );
};