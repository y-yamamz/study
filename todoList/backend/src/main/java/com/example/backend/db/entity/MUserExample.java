package com.example.backend.db.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MUserExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MUserExample() {
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

        public Criteria andUserNameIsNull() {
            addCriterion("USER_NAME is null");
            return (Criteria) this;
        }

        public Criteria andUserNameIsNotNull() {
            addCriterion("USER_NAME is not null");
            return (Criteria) this;
        }

        public Criteria andUserNameEqualTo(String value) {
            addCriterion("USER_NAME =", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotEqualTo(String value) {
            addCriterion("USER_NAME <>", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameGreaterThan(String value) {
            addCriterion("USER_NAME >", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameGreaterThanOrEqualTo(String value) {
            addCriterion("USER_NAME >=", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLessThan(String value) {
            addCriterion("USER_NAME <", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLessThanOrEqualTo(String value) {
            addCriterion("USER_NAME <=", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLike(String value) {
            addCriterion("USER_NAME like", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotLike(String value) {
            addCriterion("USER_NAME not like", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameIn(List<String> values) {
            addCriterion("USER_NAME in", values, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotIn(List<String> values) {
            addCriterion("USER_NAME not in", values, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameBetween(String value1, String value2) {
            addCriterion("USER_NAME between", value1, value2, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotBetween(String value1, String value2) {
            addCriterion("USER_NAME not between", value1, value2, "userName");
            return (Criteria) this;
        }

        public Criteria andPasswordHashIsNull() {
            addCriterion("PASSWORD_HASH is null");
            return (Criteria) this;
        }

        public Criteria andPasswordHashIsNotNull() {
            addCriterion("PASSWORD_HASH is not null");
            return (Criteria) this;
        }

        public Criteria andPasswordHashEqualTo(String value) {
            addCriterion("PASSWORD_HASH =", value, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashNotEqualTo(String value) {
            addCriterion("PASSWORD_HASH <>", value, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashGreaterThan(String value) {
            addCriterion("PASSWORD_HASH >", value, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashGreaterThanOrEqualTo(String value) {
            addCriterion("PASSWORD_HASH >=", value, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashLessThan(String value) {
            addCriterion("PASSWORD_HASH <", value, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashLessThanOrEqualTo(String value) {
            addCriterion("PASSWORD_HASH <=", value, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashLike(String value) {
            addCriterion("PASSWORD_HASH like", value, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashNotLike(String value) {
            addCriterion("PASSWORD_HASH not like", value, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashIn(List<String> values) {
            addCriterion("PASSWORD_HASH in", values, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashNotIn(List<String> values) {
            addCriterion("PASSWORD_HASH not in", values, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashBetween(String value1, String value2) {
            addCriterion("PASSWORD_HASH between", value1, value2, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andPasswordHashNotBetween(String value1, String value2) {
            addCriterion("PASSWORD_HASH not between", value1, value2, "passwordHash");
            return (Criteria) this;
        }

        public Criteria andRoleCdIsNull() {
            addCriterion("ROLE_CD is null");
            return (Criteria) this;
        }

        public Criteria andRoleCdIsNotNull() {
            addCriterion("ROLE_CD is not null");
            return (Criteria) this;
        }

        public Criteria andRoleCdEqualTo(String value) {
            addCriterion("ROLE_CD =", value, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdNotEqualTo(String value) {
            addCriterion("ROLE_CD <>", value, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdGreaterThan(String value) {
            addCriterion("ROLE_CD >", value, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdGreaterThanOrEqualTo(String value) {
            addCriterion("ROLE_CD >=", value, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdLessThan(String value) {
            addCriterion("ROLE_CD <", value, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdLessThanOrEqualTo(String value) {
            addCriterion("ROLE_CD <=", value, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdLike(String value) {
            addCriterion("ROLE_CD like", value, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdNotLike(String value) {
            addCriterion("ROLE_CD not like", value, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdIn(List<String> values) {
            addCriterion("ROLE_CD in", values, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdNotIn(List<String> values) {
            addCriterion("ROLE_CD not in", values, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdBetween(String value1, String value2) {
            addCriterion("ROLE_CD between", value1, value2, "roleCd");
            return (Criteria) this;
        }

        public Criteria andRoleCdNotBetween(String value1, String value2) {
            addCriterion("ROLE_CD not between", value1, value2, "roleCd");
            return (Criteria) this;
        }

        public Criteria andEmailIsNull() {
            addCriterion("EMAIL is null");
            return (Criteria) this;
        }

        public Criteria andEmailIsNotNull() {
            addCriterion("EMAIL is not null");
            return (Criteria) this;
        }

        public Criteria andEmailEqualTo(String value) {
            addCriterion("EMAIL =", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailNotEqualTo(String value) {
            addCriterion("EMAIL <>", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailGreaterThan(String value) {
            addCriterion("EMAIL >", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailGreaterThanOrEqualTo(String value) {
            addCriterion("EMAIL >=", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailLessThan(String value) {
            addCriterion("EMAIL <", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailLessThanOrEqualTo(String value) {
            addCriterion("EMAIL <=", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailLike(String value) {
            addCriterion("EMAIL like", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailNotLike(String value) {
            addCriterion("EMAIL not like", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailIn(List<String> values) {
            addCriterion("EMAIL in", values, "email");
            return (Criteria) this;
        }

        public Criteria andEmailNotIn(List<String> values) {
            addCriterion("EMAIL not in", values, "email");
            return (Criteria) this;
        }

        public Criteria andEmailBetween(String value1, String value2) {
            addCriterion("EMAIL between", value1, value2, "email");
            return (Criteria) this;
        }

        public Criteria andEmailNotBetween(String value1, String value2) {
            addCriterion("EMAIL not between", value1, value2, "email");
            return (Criteria) this;
        }

        public Criteria andYukoFlagIsNull() {
            addCriterion("YUKO_FLAG is null");
            return (Criteria) this;
        }

        public Criteria andYukoFlagIsNotNull() {
            addCriterion("YUKO_FLAG is not null");
            return (Criteria) this;
        }

        public Criteria andYukoFlagEqualTo(String value) {
            addCriterion("YUKO_FLAG =", value, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagNotEqualTo(String value) {
            addCriterion("YUKO_FLAG <>", value, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagGreaterThan(String value) {
            addCriterion("YUKO_FLAG >", value, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagGreaterThanOrEqualTo(String value) {
            addCriterion("YUKO_FLAG >=", value, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagLessThan(String value) {
            addCriterion("YUKO_FLAG <", value, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagLessThanOrEqualTo(String value) {
            addCriterion("YUKO_FLAG <=", value, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagLike(String value) {
            addCriterion("YUKO_FLAG like", value, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagNotLike(String value) {
            addCriterion("YUKO_FLAG not like", value, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagIn(List<String> values) {
            addCriterion("YUKO_FLAG in", values, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagNotIn(List<String> values) {
            addCriterion("YUKO_FLAG not in", values, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagBetween(String value1, String value2) {
            addCriterion("YUKO_FLAG between", value1, value2, "yukoFlag");
            return (Criteria) this;
        }

        public Criteria andYukoFlagNotBetween(String value1, String value2) {
            addCriterion("YUKO_FLAG not between", value1, value2, "yukoFlag");
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