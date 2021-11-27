import {createDcaStrategySUT} from "./sut-builder";

describe("Create DCA strategy for a specific user", () => {
    it("When user wants to setup a DCA strategy named 'My first DCA strategy' to buy 15$ of asset Crypto_X on Exchange_1 " +
        "every day at noon utc, it should be created but not activated yet", async () => {
        // arrange
        const {selectDcaStrategiesByUser, createDcaStrategyByUser} =
            createDcaStrategySUT()
                .withExistingExchanges(["Exchange_1"])
                .withExistingAssets(["Crypto_X"])
                .build()

        //act
        await createDcaStrategyByUser();

        // assert
        /*
        expect(selectDcaStrategiesByUser()).toEqual([
                StrategyBuilder({
                    userId: "MyUser",
                    uuid: "Uuid_Dca_Strategy_1",
                    name: "My first DCA strategy",
                    //*
                    created: "CreationDate",
                    type: "DCA",
                    variant: "Buy",
                    exchange: "Exchange_1",
                    asset: "Crypto_X",
                    currency: "USD",
                    currencyAmount: 15,
                    frequency: {type: "Daily", hour: "12", minute: "00", timeZone: "UTC"},
                    active: false
                    //
                }).build()
            ]
        );
        */
    });
});

export {}