import {DcaStrategy} from "../entities/dca-strategy";

export type RetrieveDcaStrategyListQueryResult = Readonly<{
    dcaStrategies: Readonly<Array<DcaStrategy>>;
}>

export interface RetrieveDcaStrategyListQuery {
    (): Promise<RetrieveDcaStrategyListQueryResult>;
}