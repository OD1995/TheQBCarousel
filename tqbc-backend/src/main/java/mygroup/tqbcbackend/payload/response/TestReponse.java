package mygroup.tqbcbackend.payload.response;

import java.util.List;

import mygroup.tqbcbackend.model.Player;
import mygroup.tqbcbackend.model.Team;

public class TestReponse {
 
    private List<Team> teams;

    private List<Player> players;


    public TestReponse(List<Team> teams, List<Player> players) {
        this.teams = teams;
        this.players = players;
    }

    public List<Team> getTeams() {
        return this.teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public List<Player> getPlayers() {
        return this.players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

}
