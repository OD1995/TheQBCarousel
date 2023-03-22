package mygroup.tqbcbackend.payload.response;

import java.util.HashMap;

public class PredictionSplitsResponse {

    private Integer sampleSize;

    private HashMap<String,Float> data;

    public PredictionSplitsResponse() {
    }

    public PredictionSplitsResponse(Integer sampleSize, HashMap<String,Float> data) {
        this.sampleSize = sampleSize;
        this.data = data;
    }

    public Integer getSampleSize() {
        return this.sampleSize;
    }

    public void setSampleSize(Integer sampleSize) {
        this.sampleSize = sampleSize;
    }

    public HashMap<String,Float> getData() {
        return this.data;
    }

    public void setData(HashMap<String,Float> data) {
        this.data = data;
    }

    
}
