import {retrieveStrategiesSUT} from "./sut-builder";
import {StrategyDtoBuilder} from "../../infrastructure/dtos/strategy-dto.builder";
import {
    RetrieveStrategiesByUserPresenter
} from "../../application/use-cases/presenters/retrieve-strategies-by-user-presenter";
import {StrategySummaryBuilder} from "../builders/strategy-summary.builder";
import {StrategySummary} from "../../models/value-objects/strategy-summary";
import {RetrieveStrategiesCommand} from "../../application/use-cases/commands/retrieve-strategies-command";
import {BuyOrSellDto, TriggerDto} from "../../infrastructure/dtos";

describe("Retrieve Strategies for a specific user", () => {
    describe("When MyUser retrieves its strategies and has no strategy", () => {
        it("it should see an empty list", async () => {
            // arrange
            const {selectStrategySummaryListByUser, retrieveStrategiesByUser} = retrieveStrategiesSUT()
                .withoutAnyStrategiesForUser()
                .build();

            // act
            await retrieveStrategiesByUser({userId: "MyUser"});

            // assert
            expect(selectStrategySummaryListByUser()).toEqual([]);
        });
    });
    describe("When MyUser retrieves its strategies,  it wants to be notified ", () => {
        it("When the retrieving is processing and when it's finished", async () => {
            // arrange
            const presenter: RetrieveStrategiesByUserPresenter = {
                retrievingStrategies: () => {
                },
                strategiesRetrieved: () => {
                }
            }
            const retrievingStrategiesCalled = jest.spyOn(presenter, 'retrievingStrategies');
            const strategiesRetrievedCalled = jest.spyOn(presenter, 'strategiesRetrieved');

            const {retrieveStrategiesByUser} =
                retrieveStrategiesSUT()
                    .withExistingStrategiesForUser([
                        StrategyDtoBuilder({
                            userId: "MyUser",
                            uuid: "Uuid_Strategy_1",
                            name: "My first strategy"
                        }).build(),
                    ])
                    .withRetrieveStrategiesPresenter(presenter)
                    .build();

            // act
            await retrieveStrategiesByUser({userId: "MyUser"});

            // assert
            expect(retrievingStrategiesCalled).toHaveBeenCalled();
            expect(strategiesRetrievedCalled).toHaveBeenCalled();
        });

        it("When the retrieving failed ", async () => {
            // arrange
            const presenter: RetrieveStrategiesByUserPresenter = {
                retrievingStrategiesFailed: (error) => error
            }
            const retrievingStrategiesFailedCalled = jest.spyOn(presenter, 'retrievingStrategiesFailed');

            const {selectStrategySummaryListByUser, retrieveStrategiesByUser} =
                retrieveStrategiesSUT()
                    .withExistingStrategiesForUser([
                        StrategyDtoBuilder({
                            userId: "MyUser",
                            uuid: "Uuid_Strategy_1",
                            name: "My first strategy"
                        }).build(),
                    ])
                    .withRetrieveStrategiesPresenter(presenter)
                    .withRetrieveStrategiesFailureReason("Retrieving strategies error")
                    .build();

            // act
            await retrieveStrategiesByUser({userId: "MyUser"});

            // assert
            expect(retrievingStrategiesFailedCalled).toHaveBeenLastCalledWith(new Error("Retrieving strategies error"));
            expect(selectStrategySummaryListByUser()).toEqual(undefined);
        });
    });
    describe("When MyUser retrieves its strategies and has one strategy", () => {
        const arrangeRetrieveStrategiesSUT = (
            buyOrSell: BuyOrSellDto = "Undefined",
            exchange: string,
            asset: string,
            trigger: TriggerDto = {type: "Undefined"}
        ): {
            selectStrategySummaryListByUser: () => Array<StrategySummary> | undefined,
            retrieveStrategiesByUser: (command: RetrieveStrategiesCommand) => Promise<void>
        } => {
            const {selectStrategySummaryListByUser, retrieveStrategiesByUser} =
                retrieveStrategiesSUT()
                    .withExistingStrategiesForUser([
                        StrategyDtoBuilder({
                            userId: "MyUser",
                            uuid: "Uuid_Strategy_1",
                            name: "My first strategy",
                            created: "CreationDate",
                            type: "DCA",
                            buyOrSell,
                            exchange,
                            asset,
                            currency: "USD",
                            currencyAmount: 15,
                            trigger,
                            active: true
                        }).build(),
                    ])
                    .build();
            return {
                selectStrategySummaryListByUser,
                retrieveStrategiesByUser
            }
        }

        const assertEquals = (selectStrategySummaryListByUser: () => Array<StrategySummary> | undefined) => (
            description: string,
            exchange: string,
            asset: string,
        ) => {
            expect(selectStrategySummaryListByUser()).toEqual(
                [
                    StrategySummaryBuilder({
                        uuid: "Uuid_Strategy_1",
                        name: "My first strategy",
                        description,
                        asset,
                        exchange,
                        lastUpdate: "CreationDate",
                        activated: true
                    }).build(),
                ]
            );
        }

        it("When the strategy is a DCA to buy every day at noon UTC, 15 USD of Asset_X on Exchange_1, " +
            "the description should reflect this information", async () => {
            const {selectStrategySummaryListByUser, retrieveStrategiesByUser} =
                arrangeRetrieveStrategiesSUT(
                    "Buy", "Exchange_1", "Asset_X",
                    {
                        type: "Daily",
                        time: {
                            hour: "12",
                            minute: "00",
                            timeZone: "UTC"
                        }
                    });

            // act
            await retrieveStrategiesByUser({userId: "MyUser"});

            // assert
            assertEquals(selectStrategySummaryListByUser)(
                "DCA (Buy) - 15USD of Asset_X on Exchange_1 - Triggered Daily at 12:00 UTC",
                "Exchange_1", "Asset_X",
            );
        });

        it("When the strategy is a DCA to sell every week on Tuesday at 1pm UTC+2, 15 USD of Asset_Y on Exchange_2, " +
            "the description should reflect this information", async () => {
            const {selectStrategySummaryListByUser, retrieveStrategiesByUser} =
                arrangeRetrieveStrategiesSUT(
                    "Sell", "Exchange_2", "Asset_Y",
                    {
                        type: "Weekly",
                        day: 2,
                        time: {
                            hour: "13",
                            minute: "00",
                            timeZone: "UTC+2"
                        }
                    });

            // act
            await retrieveStrategiesByUser({userId: "MyUser"});

            // assert
            assertEquals(selectStrategySummaryListByUser)(
                "DCA (Sell) - 15USD of Asset_Y on Exchange_2 - Triggered Weekly on Tuesday at 13:00 UTC+2",
                "Exchange_2", "Asset_Y",
            );
        });
    });
});

export {}