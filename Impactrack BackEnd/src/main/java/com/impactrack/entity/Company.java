package com.impactrack.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "empresa")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 500)
    private String logo;

    @Column(nullable = false)
    private Integer esgScore;

    @Column(nullable = false)
    private Integer environmental;

    @Column(nullable = false)
    private Integer social;

    @Column(nullable = false)
    private Integer governance;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false)
    private Boolean highlighted = false;

    @Column(name = "criteria_emissions", length = 500)
    private String criteriaEmissions;

    @Column(name = "criteria_renewable", length = 500)
    private String criteriaRenewable;

    @Column(name = "criteria_diversity", length = 500)
    private String criteriaDiversity;

    @Column(name = "criteria_labor", length = 500)
    private String criteriaLabor;

    @Column(name = "criteria_transparency", length = 500)
    private String criteriaTransparency;

    @Column(name = "alerts_json", columnDefinition = "TEXT")
    private String alertsJson;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }
    public Integer getEsgScore() { return esgScore; }
    public void setEsgScore(Integer esgScore) { this.esgScore = esgScore; }
    public Integer getEnvironmental() { return environmental; }
    public void setEnvironmental(Integer environmental) { this.environmental = environmental; }
    public Integer getSocial() { return social; }
    public void setSocial(Integer social) { this.social = social; }
    public Integer getGovernance() { return governance; }
    public void setGovernance(Integer governance) { this.governance = governance; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Boolean getHighlighted() { return highlighted; }
    public void setHighlighted(Boolean highlighted) { this.highlighted = highlighted != null ? highlighted : false; }
    public String getCriteriaEmissions() { return criteriaEmissions; }
    public void setCriteriaEmissions(String criteriaEmissions) { this.criteriaEmissions = criteriaEmissions; }
    public String getCriteriaRenewable() { return criteriaRenewable; }
    public void setCriteriaRenewable(String criteriaRenewable) { this.criteriaRenewable = criteriaRenewable; }
    public String getCriteriaDiversity() { return criteriaDiversity; }
    public void setCriteriaDiversity(String criteriaDiversity) { this.criteriaDiversity = criteriaDiversity; }
    public String getCriteriaLabor() { return criteriaLabor; }
    public void setCriteriaLabor(String criteriaLabor) { this.criteriaLabor = criteriaLabor; }
    public String getCriteriaTransparency() { return criteriaTransparency; }
    public void setCriteriaTransparency(String criteriaTransparency) { this.criteriaTransparency = criteriaTransparency; }
    public String getAlertsJson() { return alertsJson; }
    public void setAlertsJson(String alertsJson) { this.alertsJson = alertsJson; }
}
