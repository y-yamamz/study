package com.example.backend.db.entity;

import java.util.Date;

public class TodoList extends TodoListKey {
    private String revisionNo;

    private String statusCd;

    private String deployCd;

    private String note;

    private String biko;

    private String yukoFlag;

    private Date insDate;

    private String insUserId;

    private Date updDate;

    private String updUserId;

    public String getRevisionNo() {
        return revisionNo;
    }

    public void setRevisionNo(String revisionNo) {
        this.revisionNo = revisionNo;
    }

    public String getStatusCd() {
        return statusCd;
    }

    public void setStatusCd(String statusCd) {
        this.statusCd = statusCd;
    }

    public String getDeployCd() {
        return deployCd;
    }

    public void setDeployCd(String deployCd) {
        this.deployCd = deployCd;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getBiko() {
        return biko;
    }

    public void setBiko(String biko) {
        this.biko = biko;
    }

    public String getYukoFlag() {
        return yukoFlag;
    }

    public void setYukoFlag(String yukoFlag) {
        this.yukoFlag = yukoFlag;
    }

    public Date getInsDate() {
        return insDate;
    }

    public void setInsDate(Date insDate) {
        this.insDate = insDate;
    }

    public String getInsUserId() {
        return insUserId;
    }

    public void setInsUserId(String insUserId) {
        this.insUserId = insUserId;
    }

    public Date getUpdDate() {
        return updDate;
    }

    public void setUpdDate(Date updDate) {
        this.updDate = updDate;
    }

    public String getUpdUserId() {
        return updUserId;
    }

    public void setUpdUserId(String updUserId) {
        this.updUserId = updUserId;
    }
}