import {selectors, useCases} from "../../application";
import {createTestStore} from "./test-store";
import {createInMemoryRetrieveDcaStrategyListQuery} from "../../infra/adapters";

interface SUTProps {
    dcaStrategies?: Array<{
        uuid: string;
        name: string;
    }>
}

export const retrieveStrategyListSUT = (props: SUTProps = {}) => {
    return {
        withoutStrategies() {
            return retrieveStrategyListSUT({
                ...props
            });
        },
        withExistingStrategies(dcaStrategies: SUTProps["dcaStrategies"]) {
            return retrieveStrategyListSUT({
                ...props,
                dcaStrategies
            });
        },
        build() {
            const retrieveDcaStrategyListQuery =
                createInMemoryRetrieveDcaStrategyListQuery({
                    //existingDcaStrategies: props.dcaStrategies
                });
            const store = createTestStore({
                retrieveDcaStrategyListQuery
            });
            const selectAllStrategies = () => selectors.selectDCAStrategies(store.getState());
            const retrieveDcaStrategyList = async () => store.dispatch(useCases.retrieveDcaStrategyList());
            return {
                selectAllStrategies,
                retrieveDcaStrategyList
            }
        }
    }
}