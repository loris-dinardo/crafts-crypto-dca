import {selectors, useCases} from "../../application";
import {createInMemoryRetrieveDcaStrategyListQuery} from "../../infra/adapters";
import {createTestStore} from "../test-store";
import {DcaStrategy} from "../../models/entities/dca-strategy";

interface SUTProps {
    dcaStrategies?: Array<DcaStrategy>
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
                    existingDcaStrategies: props.dcaStrategies
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