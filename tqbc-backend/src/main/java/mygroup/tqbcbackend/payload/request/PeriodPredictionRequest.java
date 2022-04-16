package mygroup.tqbcbackend.payload.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import mygroup.tqbcbackend.model.FrontEndPrediction;

public class PeriodPredictionRequest {

	@NotNull
	private Long predictionPeriodID;
	
	@NotNull
	private Long userID;
	
	@NotEmpty
	private List<FrontEndPrediction> predictions;

	public long getPredictionPeriodID() {
		return predictionPeriodID;
	}

	public void setPredictionPeriodID(long predictionPeriodID) {
		this.predictionPeriodID = predictionPeriodID;
	}

	public long getUserID() {
		return userID;
	}

	public void setUserID(long userID) {
		this.userID = userID;
	}

	public List<FrontEndPrediction> getPredictions() {
		return predictions;
	}

	public void setPredictions(List<FrontEndPrediction> predictions) {
		this.predictions = predictions;
	}
	
}
