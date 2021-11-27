import {retrieveStrategyListSUT} from "./sut-builder";
import {DcaStrategyBuilder} from "../dca-strategy-builder";

describe("Retrieve DCA strategy list", () => {
    it('When user has no strategy and has not retrieve them, it should see an empty list', () => {
        // arrange
        const {selectAllStrategies} = retrieveStrategyListSUT()
            .withoutAnyStrategiesForUser().build();

        // assert
        expect(selectAllStrategies()).toEqual({
            strategies: []
        });
    });

    it('When user has many strategies and retrieve them, it should see them', async () => {
        // arrange
        const {selectAllStrategies, retrieveDcaStrategyList} = retrieveStrategyListSUT()
            .withExistingStrategies([
                DcaStrategyBuilder().withUuid("strategy_1").withName("My first dca strategy").build(),
                DcaStrategyBuilder().withUuid("strategy_2").withName("It's a long term investment").build()
            ])
            .build();

        // act
        await retrieveDcaStrategyList();

        // assert
        expect(selectAllStrategies()).toEqual({
            strategies: [
                DcaStrategyBuilder().withUuid("strategy_1").withName("My first dca strategy").build(),
                DcaStrategyBuilder().withUuid("strategy_2").withName("It's a long term investment").build()
            ]
        });
    });

});

export {}