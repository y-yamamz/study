package com.example.backend.db.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MSystemExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MSystemExample() {
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

        public Criteria andCdIsNull() {
            addCriterion("CD is null");
            return (Criteria) this;
        }

        public Criteria andCdIsNotNull() {
            addCriterion("CD is not null");
            return (Criteria) this;
        }

        public Criteria andCdEqualTo(String value) {
            addCriterion("CD =", value, "cd");
            return (Criteria) this;
        }

        public Criteria andCdNotEqualTo(String value) {
            addCriterion("CD <>", value, "cd");
            return (Criteria) this;
        }

        public Criteria andCdGreaterThan(String value) {
            addCriterion("CD >", value, "cd");
            return (Criteria) this;
        }

        public Criteria andCdGreaterThanOrEqualTo(String value) {
            addCriterion("CD >=", value, "cd");
            return (Criteria) this;
        }

        public Criteria andCdLessThan(String value) {
            addCriterion("CD <", value, "cd");
            return (Criteria) this;
        }

        public Criteria andCdLessThanOrEqualTo(String value) {
            addCriterion("CD <=", value, "cd");
            return (Criteria) this;
        }

        public Criteria andCdLike(String value) {
            addCriterion("CD like", value, "cd");
            return (Criteria) this;
        }

        public Criteria andCdNotLike(String value) {
            addCriterion("CD not like", value, "cd");
            return (Criteria) this;
        }

        public Criteria andCdIn(List<String> values) {
            addCriterion("CD in", values, "cd");
            return (Criteria) this;
        }

        public Criteria andCdNotIn(List<String> values) {
            addCriterion("CD not in", values, "cd");
            return (Criteria) this;
        }

        public Criteria andCdBetween(String value1, String value2) {
            addCriterion("CD between", value1, value2, "cd");
            return (Criteria) this;
        }

        public Criteria andCdNotBetween(String value1, String value2) {
            addCriterion("CD not between", value1, value2, "cd");
            return (Criteria) this;
        }

        public Criteria andSystemNameIsNull() {
            addCriterion("SYSTEM_NAME is null");
            return (Criteria) this;
        }

        public Criteria andSystemNameIsNotNull() {
            addCriterion("SYSTEM_NAME is not null");
            return (Criteria) this;
        }

        public Criteria andSystemNameEqualTo(String value) {
            addCriterion("SYSTEM_NAME =", value, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameNotEqualTo(String value) {
            addCriterion("SYSTEM_NAME <>", value, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameGreaterThan(String value) {
            addCriterion("SYSTEM_NAME >", value, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameGreaterThanOrEqualTo(String value) {
            addCriterion("SYSTEM_NAME >=", value, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameLessThan(String value) {
            addCriterion("SYSTEM_NAME <", value, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameLessThanOrEqualTo(String value) {
            addCriterion("SYSTEM_NAME <=", value, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameLike(String value) {
            addCriterion("SYSTEM_NAME like", value, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameNotLike(String value) {
            addCriterion("SYSTEM_NAME not like", value, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameIn(List<String> values) {
            addCriterion("SYSTEM_NAME in", values, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameNotIn(List<String> values) {
            addCriterion("SYSTEM_NAME not in", values, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameBetween(String value1, String value2) {
            addCriterion("SYSTEM_NAME between", value1, value2, "systemName");
            return (Criteria) this;
        }

        public Criteria andSystemNameNotBetween(String value1, String value2) {
            addCriterion("SYSTEM_NAME not between", value1, value2, "systemName");
            return (Criteria) this;
        }

        public Criteria andNoteIsNull() {
            addCriterion("NOTE is null");
            return (Criteria) this;
        }

        public Criteria andNoteIsNotNull() {
            addCriterion("NOTE is not null");
            return (Criteria) this;
        }

        public Criteria andNoteEqualTo(String value) {
            addCriterion("NOTE =", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteNotEqualTo(String value) {
            addCriterion("NOTE <>", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteGreaterThan(String value) {
            addCriterion("NOTE >", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteGreaterThanOrEqualTo(String value) {
            addCriterion("NOTE >=", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteLessThan(String value) {
            addCriterion("NOTE <", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteLessThanOrEqualTo(String value) {
            addCriterion("NOTE <=", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteLike(String value) {
            addCriterion("NOTE like", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteNotLike(String value) {
            addCriterion("NOTE not like", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteIn(List<String> values) {
            addCriterion("NOTE in", values, "note");
            return (Criteria) this;
        }

        public Criteria andNoteNotIn(List<String> values) {
            addCriterion("NOTE not in", values, "note");
            return (Criteria) this;
        }

        public Criteria andNoteBetween(String value1, String value2) {
            addCriterion("NOTE between", value1, value2, "note");
            return (Criteria) this;
        }

        public Criteria andNoteNotBetween(String value1, String value2) {
            addCriterion("NOTE not between", value1, value2, "note");
            return (Criteria) this;
        }

        public Criteria andBikoIsNull() {
            addCriterion("BIKO is null");
            return (Criteria) this;
        }

        public Criteria andBikoIsNotNull() {
            addCriterion("BIKO is not null");
            return (Criteria) this;
        }

        public Criteria andBikoEqualTo(String value) {
            addCriterion("BIKO =", value, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoNotEqualTo(String value) {
            addCriterion("BIKO <>", value, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoGreaterThan(String value) {
            addCriterion("BIKO >", value, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoGreaterThanOrEqualTo(String value) {
            addCriterion("BIKO >=", value, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoLessThan(String value) {
            addCriterion("BIKO <", value, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoLessThanOrEqualTo(String value) {
            addCriterion("BIKO <=", value, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoLike(String value) {
            addCriterion("BIKO like", value, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoNotLike(String value) {
            addCriterion("BIKO not like", value, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoIn(List<String> values) {
            addCriterion("BIKO in", values, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoNotIn(List<String> values) {
            addCriterion("BIKO not in", values, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoBetween(String value1, String value2) {
            addCriterion("BIKO between", value1, value2, "biko");
            return (Criteria) this;
        }

        public Criteria andBikoNotBetween(String value1, String value2) {
            addCriterion("BIKO not between", value1, value2, "biko");
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