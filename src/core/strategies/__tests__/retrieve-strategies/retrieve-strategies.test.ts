import {retrieveStrategiesSUT} from "./sut-builder";
import {StrategyDtoBuilder} from "../../infrastructure/dtos/strategy-dto.builder";
import {RetrieveStrategiesByUserPresenter} from "../../application/use-cases/presenters/retrieve-strategies-by-user-presenter";
import {StrategySummaryBuilder} from "../builders/strategy-summary.builder";

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
                        StrategyDtoBuilder({userId: "MyUser", uuid: "Uuid_Strategy_1", name: "My first strategy"}).build(),
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
                        StrategyDtoBuilder({userId: "MyUser", uuid: "Uuid_Strategy_1", name: "My first strategy"}).build(),
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
       it("When the strategy is a DCA to buy every day at noon UTC, 15 USD of Asset_X on Exchange_1, " +
           "the description should reflect this information", async () => {
           const {selectStrategySummaryListByUser, retrieveStrategiesByUser} =
               retrieveStrategiesSUT()
                   .withExistingStrategiesForUser([
                       StrategyDtoBuilder({
                           userId: "MyUser",
                           uuid: "Uuid_Strategy_1",
                           name: "My first strategy",
                           created: "CreationDate",
                           modified: "ModificationDate",
                           type: "DCA",
                           buyOrSell: "Buy",
                           exchange: "Exchange_1",
                           asset: "Asset_X",
                           currency: "USD",
                           currencyAmount: 15,
                           trigger: {type: "Daily", hour: "12", minute: "00", timeZone: "UTC"},
                           active: true
                       }).build(),
                   ])
                   .build();

           // act
           await retrieveStrategiesByUser({userId: "MyUser"});

           // assert
           expect(selectStrategySummaryListByUser()).toEqual(
               [
                   StrategySummaryBuilder({
                       uuid: "Uuid_Strategy_1",
                       name: "My first strategy",
                       description: "DCA (Buy) - 15USD - Triggered Daily at 12:00 UTC",
                       asset: "Asset_X",
                       exchange: "Exchange_1",
                       lastUpdate: "ModificationDate"
                   }).build(),
               ]
           );
       });

    });
});

export {}