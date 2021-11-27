import {RetrieveStrategiesCommand} from "../../application/use-cases/commands/retrieve-strategies-command";
import {createTestStore} from "../test-store";
import {useCases} from "../../application";
import {StrategyDto} from "../../infrastructure/dtos";
import {createInMemoryRetrieveStrategiesByUserQuery} from "../../infrastructure/adapters/in-memory-retrieve-strategies-by-user-query";
import {RetrieveStrategiesByUserPresenter} from "../../application/use-cases/presenters/retrieve-strategies-by-user-presenter";

interface SUTProps {
    strategies?: Array<StrategyDto>,
    presenter?: RetrieveStrategiesByUserPresenter,
    failureReason?: string,
}

export const retrieveStrategiesSUT = (props: SUTProps = {}) => {
    return {
        withoutAnyStrategiesForUser() {
            return retrieveStrategiesSUT({
                ...props
            });
        },
        withExistingStrategiesForUser(strategies: SUTProps["strategies"]) {
            return retrieveStrategiesSUT({
                ...props,
                strategies
            });
        },
        withRetrieveStrategiesPresenter(presenter: SUTProps['presenter']){
            return retrieveStrategiesSUT({
                ...props,
                presenter
            });
        },
        withRetrieveStrategiesFailureReason(failureReason: SUTProps['failureReason']) {
            return retrieveStrategiesSUT({
                ...props,
                failureReason
            });
        },
        build() {
            const retrieveStrategiesByUserQuery =
                createInMemoryRetrieveStrategiesByUserQuery({
                    existingStrategies: props.strategies,
                    failureReason: props.failureReason
                });
            const {store, selectors} = createTestStore({retrieveStrategiesByUserQuery});
            const selectStrategySummaryListByUser = () => selectors.strategies(store.getState()).getAllByUser();
            const retrieveStrategiesByUser = async (command: RetrieveStrategiesCommand) =>
                store.dispatch(useCases.retrieveStrategies(command, props.presenter));
            return {
                selectStrategySummaryListByUser,
                retrieveStrategiesByUser
            }
        }
    }
}