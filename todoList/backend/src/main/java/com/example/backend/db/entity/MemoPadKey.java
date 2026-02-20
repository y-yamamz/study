package com.example.backend.db.entity;

public class MemoPadKey {
    private String categoryCd;

    private String laegeKbn;

    private String subKbn;

    private String smallKbn;

    public String getCategoryCd() {
        return categoryCd;
    }

    public void setCategoryCd(String categoryCd) {
        this.categoryCd = categoryCd;
    }

    public String getLaegeKbn() {
        return laegeKbn;
    }

    public void setLaegeKbn(String laegeKbn) {
        this.laegeKbn = laegeKbn;
    }

    public String getSubKbn() {
        return subKbn;
    }

    public void setSubKbn(String subKbn) {
        this.subKbn = subKbn;
    }

    public String getSmallKbn() {
        return smallKbn;
    }

    public void setSmallKbn(String smallKbn) {
        this.smallKbn = smallKbn;
    }
}