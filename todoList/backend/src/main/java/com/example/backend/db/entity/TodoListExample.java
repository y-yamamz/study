package com.example.backend.db.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TodoListExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TodoListExample() {
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

        public Criteria andSystemCdIsNull() {
            addCriterion("SYSTEM_CD is null");
            return (Criteria) this;
        }

        public Criteria andSystemCdIsNotNull() {
            addCriterion("SYSTEM_CD is not null");
            return (Criteria) this;
        }

        public Criteria andSystemCdEqualTo(String value) {
            addCriterion("SYSTEM_CD =", value, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdNotEqualTo(String value) {
            addCriterion("SYSTEM_CD <>", value, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdGreaterThan(String value) {
            addCriterion("SYSTEM_CD >", value, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdGreaterThanOrEqualTo(String value) {
            addCriterion("SYSTEM_CD >=", value, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdLessThan(String value) {
            addCriterion("SYSTEM_CD <", value, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdLessThanOrEqualTo(String value) {
            addCriterion("SYSTEM_CD <=", value, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdLike(String value) {
            addCriterion("SYSTEM_CD like", value, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdNotLike(String value) {
            addCriterion("SYSTEM_CD not like", value, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdIn(List<String> values) {
            addCriterion("SYSTEM_CD in", values, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdNotIn(List<String> values) {
            addCriterion("SYSTEM_CD not in", values, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdBetween(String value1, String value2) {
            addCriterion("SYSTEM_CD between", value1, value2, "systemCd");
            return (Criteria) this;
        }

        public Criteria andSystemCdNotBetween(String value1, String value2) {
            addCriterion("SYSTEM_CD not between", value1, value2, "systemCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdIsNull() {
            addCriterion("PROJECT_CD is null");
            return (Criteria) this;
        }

        public Criteria andProjectCdIsNotNull() {
            addCriterion("PROJECT_CD is not null");
            return (Criteria) this;
        }

        public Criteria andProjectCdEqualTo(String value) {
            addCriterion("PROJECT_CD =", value, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdNotEqualTo(String value) {
            addCriterion("PROJECT_CD <>", value, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdGreaterThan(String value) {
            addCriterion("PROJECT_CD >", value, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdGreaterThanOrEqualTo(String value) {
            addCriterion("PROJECT_CD >=", value, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdLessThan(String value) {
            addCriterion("PROJECT_CD <", value, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdLessThanOrEqualTo(String value) {
            addCriterion("PROJECT_CD <=", value, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdLike(String value) {
            addCriterion("PROJECT_CD like", value, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdNotLike(String value) {
            addCriterion("PROJECT_CD not like", value, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdIn(List<String> values) {
            addCriterion("PROJECT_CD in", values, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdNotIn(List<String> values) {
            addCriterion("PROJECT_CD not in", values, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdBetween(String value1, String value2) {
            addCriterion("PROJECT_CD between", value1, value2, "projectCd");
            return (Criteria) this;
        }

        public Criteria andProjectCdNotBetween(String value1, String value2) {
            addCriterion("PROJECT_CD not between", value1, value2, "projectCd");
            return (Criteria) this;
        }

        public Criteria andTicketNoIsNull() {
            addCriterion("TICKET_NO is null");
            return (Criteria) this;
        }

        public Criteria andTicketNoIsNotNull() {
            addCriterion("TICKET_NO is not null");
            return (Criteria) this;
        }

        public Criteria andTicketNoEqualTo(String value) {
            addCriterion("TICKET_NO =", value, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoNotEqualTo(String value) {
            addCriterion("TICKET_NO <>", value, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoGreaterThan(String value) {
            addCriterion("TICKET_NO >", value, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoGreaterThanOrEqualTo(String value) {
            addCriterion("TICKET_NO >=", value, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoLessThan(String value) {
            addCriterion("TICKET_NO <", value, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoLessThanOrEqualTo(String value) {
            addCriterion("TICKET_NO <=", value, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoLike(String value) {
            addCriterion("TICKET_NO like", value, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoNotLike(String value) {
            addCriterion("TICKET_NO not like", value, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoIn(List<String> values) {
            addCriterion("TICKET_NO in", values, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoNotIn(List<String> values) {
            addCriterion("TICKET_NO not in", values, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoBetween(String value1, String value2) {
            addCriterion("TICKET_NO between", value1, value2, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andTicketNoNotBetween(String value1, String value2) {
            addCriterion("TICKET_NO not between", value1, value2, "ticketNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoIsNull() {
            addCriterion("REVISION_NO is null");
            return (Criteria) this;
        }

        public Criteria andRevisionNoIsNotNull() {
            addCriterion("REVISION_NO is not null");
            return (Criteria) this;
        }

        public Criteria andRevisionNoEqualTo(String value) {
            addCriterion("REVISION_NO =", value, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoNotEqualTo(String value) {
            addCriterion("REVISION_NO <>", value, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoGreaterThan(String value) {
            addCriterion("REVISION_NO >", value, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoGreaterThanOrEqualTo(String value) {
            addCriterion("REVISION_NO >=", value, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoLessThan(String value) {
            addCriterion("REVISION_NO <", value, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoLessThanOrEqualTo(String value) {
            addCriterion("REVISION_NO <=", value, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoLike(String value) {
            addCriterion("REVISION_NO like", value, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoNotLike(String value) {
            addCriterion("REVISION_NO not like", value, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoIn(List<String> values) {
            addCriterion("REVISION_NO in", values, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoNotIn(List<String> values) {
            addCriterion("REVISION_NO not in", values, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoBetween(String value1, String value2) {
            addCriterion("REVISION_NO between", value1, value2, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andRevisionNoNotBetween(String value1, String value2) {
            addCriterion("REVISION_NO not between", value1, value2, "revisionNo");
            return (Criteria) this;
        }

        public Criteria andStatusCdIsNull() {
            addCriterion("STATUS_CD is null");
            return (Criteria) this;
        }

        public Criteria andStatusCdIsNotNull() {
            addCriterion("STATUS_CD is not null");
            return (Criteria) this;
        }

        public Criteria andStatusCdEqualTo(String value) {
            addCriterion("STATUS_CD =", value, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdNotEqualTo(String value) {
            addCriterion("STATUS_CD <>", value, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdGreaterThan(String value) {
            addCriterion("STATUS_CD >", value, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdGreaterThanOrEqualTo(String value) {
            addCriterion("STATUS_CD >=", value, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdLessThan(String value) {
            addCriterion("STATUS_CD <", value, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdLessThanOrEqualTo(String value) {
            addCriterion("STATUS_CD <=", value, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdLike(String value) {
            addCriterion("STATUS_CD like", value, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdNotLike(String value) {
            addCriterion("STATUS_CD not like", value, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdIn(List<String> values) {
            addCriterion("STATUS_CD in", values, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdNotIn(List<String> values) {
            addCriterion("STATUS_CD not in", values, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdBetween(String value1, String value2) {
            addCriterion("STATUS_CD between", value1, value2, "statusCd");
            return (Criteria) this;
        }

        public Criteria andStatusCdNotBetween(String value1, String value2) {
            addCriterion("STATUS_CD not between", value1, value2, "statusCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdIsNull() {
            addCriterion("DEPLOY_CD is null");
            return (Criteria) this;
        }

        public Criteria andDeployCdIsNotNull() {
            addCriterion("DEPLOY_CD is not null");
            return (Criteria) this;
        }

        public Criteria andDeployCdEqualTo(String value) {
            addCriterion("DEPLOY_CD =", value, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdNotEqualTo(String value) {
            addCriterion("DEPLOY_CD <>", value, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdGreaterThan(String value) {
            addCriterion("DEPLOY_CD >", value, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdGreaterThanOrEqualTo(String value) {
            addCriterion("DEPLOY_CD >=", value, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdLessThan(String value) {
            addCriterion("DEPLOY_CD <", value, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdLessThanOrEqualTo(String value) {
            addCriterion("DEPLOY_CD <=", value, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdLike(String value) {
            addCriterion("DEPLOY_CD like", value, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdNotLike(String value) {
            addCriterion("DEPLOY_CD not like", value, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdIn(List<String> values) {
            addCriterion("DEPLOY_CD in", values, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdNotIn(List<String> values) {
            addCriterion("DEPLOY_CD not in", values, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdBetween(String value1, String value2) {
            addCriterion("DEPLOY_CD between", value1, value2, "deployCd");
            return (Criteria) this;
        }

        public Criteria andDeployCdNotBetween(String value1, String value2) {
            addCriterion("DEPLOY_CD not between", value1, value2, "deployCd");
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