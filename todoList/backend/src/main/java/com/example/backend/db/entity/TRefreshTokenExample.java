package com.example.backend.db.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TRefreshTokenExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TRefreshTokenExample() {
        oredCriteria = new ArrayList<>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andTokenIdIsNull() {
            addCriterion("TOKEN_ID is null");
            return (Criteria) this;
        }

        public Criteria andTokenIdIsNotNull() {
            addCriterion("TOKEN_ID is not null");
            return (Criteria) this;
        }

        public Criteria andTokenIdEqualTo(Long value) {
            addCriterion("TOKEN_ID =", value, "tokenId");
            return (Criteria) this;
        }

        public Criteria andTokenIdNotEqualTo(Long value) {
            addCriterion("TOKEN_ID <>", value, "tokenId");
            return (Criteria) this;
        }

        public Criteria andTokenIdGreaterThan(Long value) {
            addCriterion("TOKEN_ID >", value, "tokenId");
            return (Criteria) this;
        }

        public Criteria andTokenIdGreaterThanOrEqualTo(Long value) {
            addCriterion("TOKEN_ID >=", value, "tokenId");
            return (Criteria) this;
        }

        public Criteria andTokenIdLessThan(Long value) {
            addCriterion("TOKEN_ID <", value, "tokenId");
            return (Criteria) this;
        }

        public Criteria andTokenIdLessThanOrEqualTo(Long value) {
            addCriterion("TOKEN_ID <=", value, "tokenId");
            return (Criteria) this;
        }

        public Criteria andTokenIdIn(List<Long> values) {
            addCriterion("TOKEN_ID in", values, "tokenId");
            return (Criteria) this;
        }

        public Criteria andTokenIdNotIn(List<Long> values) {
            addCriterion("TOKEN_ID not in", values, "tokenId");
            return (Criteria) this;
        }

        public Criteria andTokenIdBetween(Long value1, Long value2) {
            addCriterion("TOKEN_ID between", value1, value2, "tokenId");
            return (Criteria) this;
        }

        public Criteria andTokenIdNotBetween(Long value1, Long value2) {
            addCriterion("TOKEN_ID not between", value1, value2, "tokenId");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNull() {
            addCriterion("USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(String value) {
            addCriterion("USER_ID =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(String value) {
            addCriterion("USER_ID <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(String value) {
            addCriterion("USER_ID >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(String value) {
            addCriterion("USER_ID >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(String value) {
            addCriterion("USER_ID <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(String value) {
            addCriterion("USER_ID <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLike(String value) {
            addCriterion("USER_ID like", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotLike(String value) {
            addCriterion("USER_ID not like", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<String> values) {
            addCriterion("USER_ID in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<String> values) {
            addCriterion("USER_ID not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(String value1, String value2) {
            addCriterion("USER_ID between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(String value1, String value2) {
            addCriterion("USER_ID not between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andTokenHashIsNull() {
            addCriterion("TOKEN_HASH is null");
            return (Criteria) this;
        }

        public Criteria andTokenHashIsNotNull() {
            addCriterion("TOKEN_HASH is not null");
            return (Criteria) this;
        }

        public Criteria andTokenHashEqualTo(String value) {
            addCriterion("TOKEN_HASH =", value, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashNotEqualTo(String value) {
            addCriterion("TOKEN_HASH <>", value, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashGreaterThan(String value) {
            addCriterion("TOKEN_HASH >", value, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashGreaterThanOrEqualTo(String value) {
            addCriterion("TOKEN_HASH >=", value, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashLessThan(String value) {
            addCriterion("TOKEN_HASH <", value, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashLessThanOrEqualTo(String value) {
            addCriterion("TOKEN_HASH <=", value, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashLike(String value) {
            addCriterion("TOKEN_HASH like", value, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashNotLike(String value) {
            addCriterion("TOKEN_HASH not like", value, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashIn(List<String> values) {
            addCriterion("TOKEN_HASH in", values, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashNotIn(List<String> values) {
            addCriterion("TOKEN_HASH not in", values, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashBetween(String value1, String value2) {
            addCriterion("TOKEN_HASH between", value1, value2, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andTokenHashNotBetween(String value1, String value2) {
            addCriterion("TOKEN_HASH not between", value1, value2, "tokenHash");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagIsNull() {
            addCriterion("REVOKED_FLAG is null");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagIsNotNull() {
            addCriterion("REVOKED_FLAG is not null");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagEqualTo(String value) {
            addCriterion("REVOKED_FLAG =", value, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagNotEqualTo(String value) {
            addCriterion("REVOKED_FLAG <>", value, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagGreaterThan(String value) {
            addCriterion("REVOKED_FLAG >", value, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagGreaterThanOrEqualTo(String value) {
            addCriterion("REVOKED_FLAG >=", value, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagLessThan(String value) {
            addCriterion("REVOKED_FLAG <", value, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagLessThanOrEqualTo(String value) {
            addCriterion("REVOKED_FLAG <=", value, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagLike(String value) {
            addCriterion("REVOKED_FLAG like", value, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagNotLike(String value) {
            addCriterion("REVOKED_FLAG not like", value, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagIn(List<String> values) {
            addCriterion("REVOKED_FLAG in", values, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagNotIn(List<String> values) {
            addCriterion("REVOKED_FLAG not in", values, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagBetween(String value1, String value2) {
            addCriterion("REVOKED_FLAG between", value1, value2, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andRevokedFlagNotBetween(String value1, String value2) {
            addCriterion("REVOKED_FLAG not between", value1, value2, "revokedFlag");
            return (Criteria) this;
        }

        public Criteria andExpiresAtIsNull() {
            addCriterion("EXPIRES_AT is null");
            return (Criteria) this;
        }

        public Criteria andExpiresAtIsNotNull() {
            addCriterion("EXPIRES_AT is not null");
            return (Criteria) this;
        }

        public Criteria andExpiresAtEqualTo(Date value) {
            addCriterion("EXPIRES_AT =", value, "expiresAt");
            return (Criteria) this;
        }

        public Criteria andExpiresAtNotEqualTo(Date value) {
            addCriterion("EXPIRES_AT <>", value, "expiresAt");
            return (Criteria) this;
        }

        public Criteria andExpiresAtGreaterThan(Date value) {
            addCriterion("EXPIRES_AT >", value, "expiresAt");
            return (Criteria) this;
        }

        public Criteria andExpiresAtGreaterThanOrEqualTo(Date value) {
            addCriterion("EXPIRES_AT >=", value, "expiresAt");
            return (Criteria) this;
        }

        public Criteria andExpiresAtLessThan(Date value) {
            addCriterion("EXPIRES_AT <", value, "expiresAt");
            return (Criteria) this;
        }

        public Criteria andExpiresAtLessThanOrEqualTo(Date value) {
            addCriterion("EXPIRES_AT <=", value, "expiresAt");
            return (Criteria) this;
        }

        public Criteria andExpiresAtIn(List<Date> values) {
            addCriterion("EXPIRES_AT in", values, "expiresAt");
            return (Criteria) this;
        }

        public Criteria andExpiresAtNotIn(List<Date> values) {
            addCriterion("EXPIRES_AT not in", values, "expiresAt");
            return (Criteria) this;
        }

        public Criteria andExpiresAtBetween(Date value1, Date value2) {
            addCriterion("EXPIRES_AT between", value1, value2, "expiresAt");
            return (Criteria) this;
        }

        public Criteria andExpiresAtNotBetween(Date value1, Date value2) {
            addCriterion("EXPIRES_AT not between", value1, value2, "expiresAt");
            return (Criteria) this;
        }

        public Criteria andUserAgentIsNull() {
            addCriterion("USER_AGENT is null");
            return (Criteria) this;
        }

        public Criteria andUserAgentIsNotNull() {
            addCriterion("USER_AGENT is not null");
            return (Criteria) this;
        }

        public Criteria andUserAgentEqualTo(String value) {
            addCriterion("USER_AGENT =", value, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentNotEqualTo(String value) {
            addCriterion("USER_AGENT <>", value, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentGreaterThan(String value) {
            addCriterion("USER_AGENT >", value, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentGreaterThanOrEqualTo(String value) {
            addCriterion("USER_AGENT >=", value, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentLessThan(String value) {
            addCriterion("USER_AGENT <", value, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentLessThanOrEqualTo(String value) {
            addCriterion("USER_AGENT <=", value, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentLike(String value) {
            addCriterion("USER_AGENT like", value, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentNotLike(String value) {
            addCriterion("USER_AGENT not like", value, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentIn(List<String> values) {
            addCriterion("USER_AGENT in", values, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentNotIn(List<String> values) {
            addCriterion("USER_AGENT not in", values, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentBetween(String value1, String value2) {
            addCriterion("USER_AGENT between", value1, value2, "userAgent");
            return (Criteria) this;
        }

        public Criteria andUserAgentNotBetween(String value1, String value2) {
            addCriterion("USER_AGENT not between", value1, value2, "userAgent");
            return (Criteria) this;
        }

        public Criteria andIpAddressIsNull() {
            addCriterion("IP_ADDRESS is null");
            return (Criteria) this;
        }

        public Criteria andIpAddressIsNotNull() {
            addCriterion("IP_ADDRESS is not null");
            return (Criteria) this;
        }

        public Criteria andIpAddressEqualTo(String value) {
            addCriterion("IP_ADDRESS =", value, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressNotEqualTo(String value) {
            addCriterion("IP_ADDRESS <>", value, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressGreaterThan(String value) {
            addCriterion("IP_ADDRESS >", value, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressGreaterThanOrEqualTo(String value) {
            addCriterion("IP_ADDRESS >=", value, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressLessThan(String value) {
            addCriterion("IP_ADDRESS <", value, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressLessThanOrEqualTo(String value) {
            addCriterion("IP_ADDRESS <=", value, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressLike(String value) {
            addCriterion("IP_ADDRESS like", value, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressNotLike(String value) {
            addCriterion("IP_ADDRESS not like", value, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressIn(List<String> values) {
            addCriterion("IP_ADDRESS in", values, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressNotIn(List<String> values) {
            addCriterion("IP_ADDRESS not in", values, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressBetween(String value1, String value2) {
            addCriterion("IP_ADDRESS between", value1, value2, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andIpAddressNotBetween(String value1, String value2) {
            addCriterion("IP_ADDRESS not between", value1, value2, "ipAddress");
            return (Criteria) this;
        }

        public Criteria andInsDateIsNull() {
            addCriterion("INS_DATE is null");
            return (Criteria) this;
        }

        public Criteria andInsDateIsNotNull() {
            addCriterion("INS_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andInsDateEqualTo(Date value) {
            addCriterion("INS_DATE =", value, "insDate");
            return (Criteria) this;
        }

        public Criteria andInsDateNotEqualTo(Date value) {
            addCriterion("INS_DATE <>", value, "insDate");
            return (Criteria) this;
        }

        public Criteria andInsDateGreaterThan(Date value) {
            addCriterion("INS_DATE >", value, "insDate");
            return (Criteria) this;
        }

        public Criteria andInsDateGreaterThanOrEqualTo(Date value) {
            addCriterion("INS_DATE >=", value, "insDate");
            return (Criteria) this;
        }

        public Criteria andInsDateLessThan(Date value) {
            addCriterion("INS_DATE <", value, "insDate");
            return (Criteria) this;
        }

        public Criteria andInsDateLessThanOrEqualTo(Date value) {
            addCriterion("INS_DATE <=", value, "insDate");
            return (Criteria) this;
        }

        public Criteria andInsDateIn(List<Date> values) {
            addCriterion("INS_DATE in", values, "insDate");
            return (Criteria) this;
        }

        public Criteria andInsDateNotIn(List<Date> values) {
            addCriterion("INS_DATE not in", values, "insDate");
            return (Criteria) this;
        }

        public Criteria andInsDateBetween(Date value1, Date value2) {
            addCriterion("INS_DATE between", value1, value2, "insDate");
            return (Criteria) this;
        }

        public Criteria andInsDateNotBetween(Date value1, Date value2) {
            addCriterion("INS_DATE not between", value1, value2, "insDate");
            return (Criteria) this;
        }

        public Criteria andInsUserIdIsNull() {
            addCriterion("INS_USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andInsUserIdIsNotNull() {
            addCriterion("INS_USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andInsUserIdEqualTo(String value) {
            addCriterion("INS_USER_ID =", value, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdNotEqualTo(String value) {
            addCriterion("INS_USER_ID <>", value, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdGreaterThan(String value) {
            addCriterion("INS_USER_ID >", value, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdGreaterThanOrEqualTo(String value) {
            addCriterion("INS_USER_ID >=", value, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdLessThan(String value) {
            addCriterion("INS_USER_ID <", value, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdLessThanOrEqualTo(String value) {
            addCriterion("INS_USER_ID <=", value, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdLike(String value) {
            addCriterion("INS_USER_ID like", value, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdNotLike(String value) {
            addCriterion("INS_USER_ID not like", value, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdIn(List<String> values) {
            addCriterion("INS_USER_ID in", values, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdNotIn(List<String> values) {
            addCriterion("INS_USER_ID not in", values, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdBetween(String value1, String value2) {
            addCriterion("INS_USER_ID between", value1, value2, "insUserId");
            return (Criteria) this;
        }

        public Criteria andInsUserIdNotBetween(String value1, String value2) {
            addCriterion("INS_USER_ID not between", value1, value2, "insUserId");
            return (Criteria) this;
        }

        public Criteria andUpdDateIsNull() {
            addCriterion("UPD_DATE is null");
            return (Criteria) this;
        }

        public Criteria andUpdDateIsNotNull() {
            addCriterion("UPD_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andUpdDateEqualTo(Date value) {
            addCriterion("UPD_DATE =", value, "updDate");
            return (Criteria) this;
        }

        public Criteria andUpdDateNotEqualTo(Date value) {
            addCriterion("UPD_DATE <>", value, "updDate");
            return (Criteria) this;
        }

        public Criteria andUpdDateGreaterThan(Date value) {
            addCriterion("UPD_DATE >", value, "updDate");
            return (Criteria) this;
        }

        public Criteria andUpdDateGreaterThanOrEqualTo(Date value) {
            addCriterion("UPD_DATE >=", value, "updDate");
            return (Criteria) this;
        }

        public Criteria andUpdDateLessThan(Date value) {
            addCriterion("UPD_DATE <", value, "updDate");
            return (Criteria) this;
        }

        public Criteria andUpdDateLessThanOrEqualTo(Date value) {
            addCriterion("UPD_DATE <=", value, "updDate");
            return (Criteria) this;
        }

        public Criteria andUpdDateIn(List<Date> values) {
            addCriterion("UPD_DATE in", values, "updDate");
            return (Criteria) this;
        }

        public Criteria andUpdDateNotIn(List<Date> values) {
            addCriterion("UPD_DATE not in", values, "updDate");
            return (Criteria) this;
        }

        public Criteria andUpdDateBetween(Date value1, Date value2) {
            addCriterion("UPD_DATE between", value1, value2, "updDate");
            return (Criteria) this;
        }

        public Criteria andUpdDateNotBetween(Date value1, Date value2) {
            addCriterion("UPD_DATE not between", value1, value2, "updDate");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdIsNull() {
            addCriterion("UPD_USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdIsNotNull() {
            addCriterion("UPD_USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdEqualTo(String value) {
            addCriterion("UPD_USER_ID =", value, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdNotEqualTo(String value) {
            addCriterion("UPD_USER_ID <>", value, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdGreaterThan(String value) {
            addCriterion("UPD_USER_ID >", value, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdGreaterThanOrEqualTo(String value) {
            addCriterion("UPD_USER_ID >=", value, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdLessThan(String value) {
            addCriterion("UPD_USER_ID <", value, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdLessThanOrEqualTo(String value) {
            addCriterion("UPD_USER_ID <=", value, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdLike(String value) {
            addCriterion("UPD_USER_ID like", value, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdNotLike(String value) {
            addCriterion("UPD_USER_ID not like", value, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdIn(List<String> values) {
            addCriterion("UPD_USER_ID in", values, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdNotIn(List<String> values) {
            addCriterion("UPD_USER_ID not in", values, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdBetween(String value1, String value2) {
            addCriterion("UPD_USER_ID between", value1, value2, "updUserId");
            return (Criteria) this;
        }

        public Criteria andUpdUserIdNotBetween(String value1, String value2) {
            addCriterion("UPD_USER_ID not between", value1, value2, "updUserId");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {
        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}