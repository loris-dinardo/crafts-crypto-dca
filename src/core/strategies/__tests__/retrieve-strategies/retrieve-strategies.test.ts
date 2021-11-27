import {retrieveStrategiesSUT} from "./sut-builder";
import {StrategyDtoBuilder} from "../../infrastructure/dtos/strategy-dto.builder";
import {StrategyBuilder} from "../../models/entities";
import {RetrieveStrategiesByUserPresenter} from "../../application/use-cases/presenters/retrieve-strategies-by-user-presenter";

describe("Retrieve Strategies for a specific user", () => {
    it('When MyUser retrieves its strategies and has no strategy, it should see an empty list', async () => {
        // arrange
        const {selectAllStrategiesByUser, retrieveStrategiesByUser} = retrieveStrategiesSUT()
            .withoutAnyStrategiesForUser()
            .build();

        // act
        await retrieveStrategiesByUser({userId: "MyUser"});

        // assert
        expect(selectAllStrategiesByUser()).toEqual([]);
    });

    it('When MyUser retrieves its strategies and has several strategies, it should see a list with only its strategies', async () => {
        // arrange
        const {selectAllStrategiesByUser, retrieveStrategiesByUser} =
            retrieveStrategiesSUT()
                .withExistingStrategiesForUser([
                    StrategyDtoBuilder({userId: "MyUser", uuid: "Uuid_Strategy_1", name: "My first strategy"}).build(),
                    StrategyDtoBuilder({userId: "MyUser", uuid: "Uuid_Strategy_2", name: "My second strategy"}).build(),
                    StrategyDtoBuilder({
                        userId: "RandomUser",
                        uuid: "Uuid_Strategy_3",
                        name: "My random strategy"
                    }).build()
                ])
                .build();

        // act
        await retrieveStrategiesByUser({userId: "MyUser"});

        // assert
        expect(selectAllStrategiesByUser()).toEqual(
            [
                StrategyBuilder({userId: "MyUser", uuid: "Uuid_Strategy_1", name: "My first strategy"}).build(),
                StrategyBuilder({userId: "MyUser", uuid: "Uuid_Strategy_2", name: "My second strategy"}).build(),
            ]
        );
    });

    it("When MyUser retrieves its strategies, it wants to be notified when the retrieving is processing and " +
        "when it's finished", async () => {
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

    it("When MyUser retrieves its strategies, it wants to be notified when the retrieving failed ", async () => {
        // arrange
        const presenter: RetrieveStrategiesByUserPresenter = {
            retrievingStrategiesFailed: (error) => error
        }
        const retrievingStrategiesFailedCalled = jest.spyOn(presenter, 'retrievingStrategiesFailed');

        const {selectAllStrategiesByUser, retrieveStrategiesByUser} =
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
        expect(selectAllStrategiesByUser()).toEqual(undefined);
    });
});

export {}