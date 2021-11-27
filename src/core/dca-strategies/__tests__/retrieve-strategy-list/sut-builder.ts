import {useCases} from "../../application";
import {createInMemoryRetrieveDcaStrategyListQuery} from "../../infra/adapters";
import {createTestStore} from "../test-store";
import {DcaStrategy} from "../../models/entities/dca-strategy";

interface SUTProps {
    dcaStrategies?: Array<DcaStrategy>
}

export const retrieveStrategyListSUT = (props: SUTProps = {}) => {
    return {
        withoutAnyStrategiesForUser() {
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
                    existingDcaStrategies: props.dcaStrategies
                });
            const {store, selectors} = createTestStore({
                retrieveDcaStrategyListQuery
            });
            const selectAllStrategies = () => selectors.dcaStrategies(store.getState()).getAll();
            const retrieveDcaStrategyList = async () => store.dispatch(useCases.retrieveDcaStrategyList());
            return {
                selectAllStrategies,
                retrieveDcaStrategyList
            }
        }
    }
}