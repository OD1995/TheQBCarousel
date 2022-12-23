package mygroup.tqbcbackend.payload.response;

import java.util.List;

import mygroup.tqbcbackend.dto.LeaderboardRow;

public class LeaderboardResponse {
    
    private LeaderboardRow requestingUserRow;

    private List<LeaderboardRow> rows;

    private int pageCount;

    private long firstRowRank;

    private Integer requestingUserRowRank;

    public LeaderboardResponse() {
        
    }

    public LeaderboardResponse(List<LeaderboardRow> rows, int pageCount, long firstRowRank) {
        this.rows = rows;
        this.pageCount = pageCount;
        this.firstRowRank = firstRowRank;
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

    public long getFirstRowRank() {
        return this.firstRowRank;
    }

    public void setFirstRowRank(long firstRowRank) {
        this.firstRowRank = firstRowRank;
    }

    public Integer getRequestingUserRowRank() {
        return this.requestingUserRowRank;
    }

    public void setRequestingUserRowRank(Integer requestingUserRowRank) {
        this.requestingUserRowRank = requestingUserRowRank;
    }

}