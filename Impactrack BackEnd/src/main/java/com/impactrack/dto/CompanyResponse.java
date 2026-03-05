package com.impactrack.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyResponse {

    private Long id;
    private String name;
    private String description;
    private String logo;
    private Integer esgScore;
    private Integer environmental;
    private Integer social;
    private Integer governance;
    private String category;
    private Boolean highlighted;
    private Map<String, String> criteria;
    private List<String> alerts;

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
    public void setHighlighted(Boolean highlighted) { this.highlighted = highlighted; }
    public Map<String, String> getCriteria() { return criteria; }
    public void setCriteria(Map<String, String> criteria) { this.criteria = criteria; }
    public List<String> getAlerts() { return alerts; }
    public void setAlerts(List<String> alerts) { this.alerts = alerts; }
}
