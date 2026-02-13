package com.example.backend.db.entity;

public class MMenu {
    private String id;

    private String name;

    private String url;

    private String biko;

    private String yukoFlag;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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
}