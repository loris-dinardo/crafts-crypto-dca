import {Strategy} from "../entities";

export interface RetrieveStrategiesByUserQuery {
    (userId: string): Promise<Array<Strategy>>;
}