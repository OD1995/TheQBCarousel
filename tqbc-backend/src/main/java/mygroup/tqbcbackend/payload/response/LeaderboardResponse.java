package mygroup.tqbcbackend.payload.response;

import java.util.List;

import mygroup.tqbcbackend.dto.LeaderboardRow;

public class LeaderboardResponse {
    
    private LeaderboardRow requestingUserRow;

    private List<LeaderboardRow> rows;

    private int pageCount;

    public LeaderboardResponse(List<LeaderboardRow> rows, int pageCount) {
        this.rows = rows;
        this.pageCount = pageCount;
    }


    public LeaderboardRow getRequestingUserRow() {
        return this.requestingUserRow;
    }

    public void setRequestingUserRow(LeaderboardRow requestingUserRow) {
        this.requestingUserRow = requestingUserRow;
    }

    public List<LeaderboardRow> getRows() {
        return this.rows;
    }

    public void setRows(List<LeaderboardRow> rows) {
        this.rows = rows;
    }

    public int getPageCount() {
        return this.pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

}