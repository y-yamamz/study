package com.example.backend.db.entity;

import java.util.ArrayList;
import java.util.List;

public class MemoPadExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MemoPadExample() {
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

        public Criteria andCategoryCdIsNull() {
            addCriterion("CATEGORY_CD is null");
            return (Criteria) this;
        }

        public Criteria andCategoryCdIsNotNull() {
            addCriterion("CATEGORY_CD is not null");
            return (Criteria) this;
        }

        public Criteria andCategoryCdEqualTo(String value) {
            addCriterion("CATEGORY_CD =", value, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdNotEqualTo(String value) {
            addCriterion("CATEGORY_CD <>", value, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdGreaterThan(String value) {
            addCriterion("CATEGORY_CD >", value, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdGreaterThanOrEqualTo(String value) {
            addCriterion("CATEGORY_CD >=", value, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdLessThan(String value) {
            addCriterion("CATEGORY_CD <", value, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdLessThanOrEqualTo(String value) {
            addCriterion("CATEGORY_CD <=", value, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdLike(String value) {
            addCriterion("CATEGORY_CD like", value, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdNotLike(String value) {
            addCriterion("CATEGORY_CD not like", value, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdIn(List<String> values) {
            addCriterion("CATEGORY_CD in", values, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdNotIn(List<String> values) {
            addCriterion("CATEGORY_CD not in", values, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdBetween(String value1, String value2) {
            addCriterion("CATEGORY_CD between", value1, value2, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andCategoryCdNotBetween(String value1, String value2) {
            addCriterion("CATEGORY_CD not between", value1, value2, "categoryCd");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnIsNull() {
            addCriterion("LAEGE_KBN is null");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnIsNotNull() {
            addCriterion("LAEGE_KBN is not null");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnEqualTo(String value) {
            addCriterion("LAEGE_KBN =", value, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnNotEqualTo(String value) {
            addCriterion("LAEGE_KBN <>", value, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnGreaterThan(String value) {
            addCriterion("LAEGE_KBN >", value, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnGreaterThanOrEqualTo(String value) {
            addCriterion("LAEGE_KBN >=", value, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnLessThan(String value) {
            addCriterion("LAEGE_KBN <", value, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnLessThanOrEqualTo(String value) {
            addCriterion("LAEGE_KBN <=", value, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnLike(String value) {
            addCriterion("LAEGE_KBN like", value, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnNotLike(String value) {
            addCriterion("LAEGE_KBN not like", value, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnIn(List<String> values) {
            addCriterion("LAEGE_KBN in", values, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnNotIn(List<String> values) {
            addCriterion("LAEGE_KBN not in", values, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnBetween(String value1, String value2) {
            addCriterion("LAEGE_KBN between", value1, value2, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andLaegeKbnNotBetween(String value1, String value2) {
            addCriterion("LAEGE_KBN not between", value1, value2, "laegeKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnIsNull() {
            addCriterion("SUB_KBN is null");
            return (Criteria) this;
        }

        public Criteria andSubKbnIsNotNull() {
            addCriterion("SUB_KBN is not null");
            return (Criteria) this;
        }

        public Criteria andSubKbnEqualTo(String value) {
            addCriterion("SUB_KBN =", value, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnNotEqualTo(String value) {
            addCriterion("SUB_KBN <>", value, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnGreaterThan(String value) {
            addCriterion("SUB_KBN >", value, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnGreaterThanOrEqualTo(String value) {
            addCriterion("SUB_KBN >=", value, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnLessThan(String value) {
            addCriterion("SUB_KBN <", value, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnLessThanOrEqualTo(String value) {
            addCriterion("SUB_KBN <=", value, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnLike(String value) {
            addCriterion("SUB_KBN like", value, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnNotLike(String value) {
            addCriterion("SUB_KBN not like", value, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnIn(List<String> values) {
            addCriterion("SUB_KBN in", values, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnNotIn(List<String> values) {
            addCriterion("SUB_KBN not in", values, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnBetween(String value1, String value2) {
            addCriterion("SUB_KBN between", value1, value2, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSubKbnNotBetween(String value1, String value2) {
            addCriterion("SUB_KBN not between", value1, value2, "subKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnIsNull() {
            addCriterion("SMALL_KBN is null");
            return (Criteria) this;
        }

        public Criteria andSmallKbnIsNotNull() {
            addCriterion("SMALL_KBN is not null");
            return (Criteria) this;
        }

        public Criteria andSmallKbnEqualTo(String value) {
            addCriterion("SMALL_KBN =", value, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnNotEqualTo(String value) {
            addCriterion("SMALL_KBN <>", value, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnGreaterThan(String value) {
            addCriterion("SMALL_KBN >", value, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnGreaterThanOrEqualTo(String value) {
            addCriterion("SMALL_KBN >=", value, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnLessThan(String value) {
            addCriterion("SMALL_KBN <", value, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnLessThanOrEqualTo(String value) {
            addCriterion("SMALL_KBN <=", value, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnLike(String value) {
            addCriterion("SMALL_KBN like", value, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnNotLike(String value) {
            addCriterion("SMALL_KBN not like", value, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnIn(List<String> values) {
            addCriterion("SMALL_KBN in", values, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnNotIn(List<String> values) {
            addCriterion("SMALL_KBN not in", values, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnBetween(String value1, String value2) {
            addCriterion("SMALL_KBN between", value1, value2, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andSmallKbnNotBetween(String value1, String value2) {
            addCriterion("SMALL_KBN not between", value1, value2, "smallKbn");
            return (Criteria) this;
        }

        public Criteria andTitleIsNull() {
            addCriterion("TITLE is null");
            return (Criteria) this;
        }

        public Criteria andTitleIsNotNull() {
            addCriterion("TITLE is not null");
            return (Criteria) this;
        }

        public Criteria andTitleEqualTo(String value) {
            addCriterion("TITLE =", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotEqualTo(String value) {
            addCriterion("TITLE <>", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleGreaterThan(String value) {
            addCriterion("TITLE >", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleGreaterThanOrEqualTo(String value) {
            addCriterion("TITLE >=", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLessThan(String value) {
            addCriterion("TITLE <", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLessThanOrEqualTo(String value) {
            addCriterion("TITLE <=", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLike(String value) {
            addCriterion("TITLE like", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotLike(String value) {
            addCriterion("TITLE not like", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleIn(List<String> values) {
            addCriterion("TITLE in", values, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotIn(List<String> values) {
            addCriterion("TITLE not in", values, "title");
            return (Criteria) this;
        }

        public Criteria andTitleBetween(String value1, String value2) {
            addCriterion("TITLE between", value1, value2, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotBetween(String value1, String value2) {
            addCriterion("TITLE not between", value1, value2, "title");
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