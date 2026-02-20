package com.example.backend.db.entity;

public class MemoPad extends MemoPadKey {
    private String title;

    private String biko;

    private String memo;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBiko() {
        return biko;
    }

    public void setBiko(String biko) {
        this.biko = biko;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }
}