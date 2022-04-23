import PeriodPredictionService from "../services/PeriodPredictionService";


export const postPredictions = (predictionPeriodID, userID, predictions) => {
    return PeriodPredictionService.postPredictions(
        predictionPeriodID,
        userID,
        predictions
    )
    // .then(
    //     (response) => {
    //         console.log("response");
    //         console.log(response);
    //         return response;
    //         // return Promise.resolve()
    //     },
    //     (error) => {
    //         const message = 
    //             (
    //                 error.response &&
    //                 error.response.data &&
    //                 error.response.data.message
    //             ) || error.message || error.toString();

    //             return Promise.reject();
    //     }
    // );
};
