import {retrieveStrategyListSUT} from "./sut-builder";

describe("Retrieve DCA strategy list", () => {
    it('When user has no strategy and has not retrieve them, it should see an empty list', () => {
        // arrange
        const {selectAllStrategies} = retrieveStrategyListSUT()
            .withoutStrategies().build();

        // assert
        expect(selectAllStrategies()).toEqual({
            dcaStrategies: []
        });
    });

    it('When user has many strategies and retrieve them, it should see them', async () => {
        // arrange
        const {selectAllStrategies, retrieveDcaStrategyList} = retrieveStrategyListSUT()
            .withExistingStrategies([
                {uuid: "strategy_1", name: "My first dca strategy"},
                {uuid: "strategy_2", name: "It's a long term investment"}
            ])
            .build();

        // act
        await retrieveDcaStrategyList();

        // assert
        expect(selectAllStrategies()).toEqual({
            dcaStrategies: [
                {uuid: "strategy_1", name: "My first dca strategy", },
                {uuid: "strategy_2", name: "It's a long term investment"}
            ]
        });
    });

});

export {}