import {DcaStrategy} from "../entities/dca-strategy";

export interface RetrieveDcaStrategyListQuery {
    (): Promise<Array<DcaStrategy>>;
}