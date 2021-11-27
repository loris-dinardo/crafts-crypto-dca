import {Strategy} from "../../models/entities";

export interface StrategyDto {
    userId: string;
    uuid: string;
    name: string;
}

export const toStrategy = ({
                               userId,
                               uuid,
                               name
                           }: StrategyDto): Strategy => (
    {
        userId,
        uuid,
        name
    }
);