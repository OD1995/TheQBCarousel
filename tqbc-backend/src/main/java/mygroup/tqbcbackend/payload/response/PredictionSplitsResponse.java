package mygroup.tqbcbackend.payload.response;

import java.util.HashMap;

public class PredictionSplitsResponse {

    private HashMap<String,Float> data;

    public PredictionSplitsResponse() {
    }

    public PredictionSplitsResponse(HashMap<String,Float> data) {
        this.data = data;
    }


    public HashMap<String,Float> getData() {
        return this.data;
    }

    public void setData(HashMap<String,Float> data) {
        this.data = data;
    }

    
}
