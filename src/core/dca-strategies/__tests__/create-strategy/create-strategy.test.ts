import {createStrategySUT} from "./sut-builder";

describe("Create DCA strategy", () => {
    it("When user wants to setup a strategy named 'My first strategy' to buy 15$ of asset Crypto_X on Exchange_1, " +
        "it should be created but not activated yet", async () => {
        // arrange
        const {selectNotActivatedDcaStrategies, createDcaStrategy} =
            createStrategySUT()
                .named("My first strategy")
                .toBuyAsset("Crypto_X")
                .onExchange("Exchange_1")
                .ofCurrencyAmount(15)
                .usingCurrency("USD")
                .buyOnce()
                .build()

        //act
        await createDcaStrategy();

        // assert
        expect(selectNotActivatedDcaStrategies()).toEqual({
            dcaStrategies: [
                {
                    uuid: "strategy_1",
                    name: "My first strategy",
                    exchange: "Exchange_1",
                    type: "Buy",
                    asset: "Crypto_X",
                    currency: "USD",
                    currencyAmount: 15,
                    frequency: {type: "Once"},
                    active: false
                }
            ]
        })
    });
    /*
    it("When user wants to setup a strategy named 'My first dca strategy' to buy 15$ of asset Crypto_X each day at 12h UTC on Exchange_1, " +
        "it should be created but not activated yet", async () => {
        // arrange
        const { selectNotActivatedDcaStrategies, createDcaStrategy} =
            createStrategySUT()
                .with

        //act
        await createDcaStrategy();

        // assert
        expect(selectNotActivatedDcaStrategies()).toEqual({
            dcaStrategies: [
                {
                    id: "strategy_1",
                    name: "My first dca strategy",
                    exchange: "Exchange_1",
                    type: "buy",
                    asset: "Crypto_X",
                    currency: "USD",
                    currencyQuantity: 15,
                    frequency: {type: "daily", time: "12h", local: "UTC"}
                }
            ]
        })
    });
     */
});

export {}