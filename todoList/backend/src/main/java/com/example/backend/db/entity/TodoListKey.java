package com.example.backend.db.entity;

public class TodoListKey {
    private String systemCd;

    private String projectCd;

    private String ticketNo;

    public String getSystemCd() {
        return systemCd;
    }

    public void setSystemCd(String systemCd) {
        this.systemCd = systemCd;
    }

    public String getProjectCd() {
        return projectCd;
    }

    public void setProjectCd(String projectCd) {
        this.projectCd = projectCd;
    }

    public String getTicketNo() {
        return ticketNo;
    }

    public void setTicketNo(String ticketNo) {
        this.ticketNo = ticketNo;
    }
}