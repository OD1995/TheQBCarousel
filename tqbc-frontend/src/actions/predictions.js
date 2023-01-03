import PeriodPredictionService from "../services/PeriodPredictionService";


export const postPredictions = (predictionPeriodID, userID, predictions) => {
    return PeriodPredictionService.postPredictions(
        predictionPeriodID,
        userID,
        predictions
    )
};
