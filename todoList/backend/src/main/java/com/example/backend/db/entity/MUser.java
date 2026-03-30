package com.example.backend.db.entity;

import java.util.Date;

public class MUser {
    private String userId;

    private String userName;

    private String passwordHash;

    private String roleCd;

    private String email;

    private String yukoFlag;

    private Date insDate;

    private String insUserId;

    private Date updDate;

    private String updUserId;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getRoleCd() {
        return roleCd;
    }

    public void setRoleCd(String roleCd) {
        this.roleCd = roleCd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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