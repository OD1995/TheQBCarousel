package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "answertypes")
public class AnswerType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AnswerTypeID")
    private long answerTypeID;

    @Enumerated(EnumType.STRING)
    @Column(name = "AnswerType")
    private EAnswerType answerType;

    @Column(name = "AnswerTypeTidy")
    private String answerTypeTidy;

    public AnswerType() {
        
    }

    public AnswerType(long answerTypeID, EAnswerType answerType, String answerTypeTidy) {
        super();
        this.answerTypeID = answerTypeID;
        this.answerType = answerType;
        this.answerTypeTidy = answerTypeTidy;
    }

    public long getAnswerTypeID() {
        return answerTypeID;
    }    

    public void setAnswerTypeID(long answerTypeID) {
        this.answerTypeID = answerTypeID;
    }

    public EAnswerType getAnswerType() {
        return answerType;
    }

    public void setAnswerType(EAnswerType answerType) {
        this.answerType = answerType;
    }

    public String getAnswerTypeTidy() {
        return answerTypeTidy;
    }

    public void setAnswerTypeTidy(String answerTypeTidy) {
        this.answerTypeTidy = answerTypeTidy;
    }
}
