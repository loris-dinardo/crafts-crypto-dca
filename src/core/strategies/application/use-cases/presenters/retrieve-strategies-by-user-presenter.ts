export interface RetrieveStrategiesByUserPresenter {
    retrievingStrategies?: () => void;
    strategiesRetrieved?: () => void;
    retrievingStrategiesFailed?: (error: any) => void;
}