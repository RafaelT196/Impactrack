package com.impactrack.dto;

import jakarta.validation.constraints.*;
import java.util.List;

public class CompanyRequest {

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank(message = "Categoria é obrigatória")
    private String category;

    @NotBlank(message = "Descrição é obrigatória")
    private String description;

    private String logo;

    @NotNull
    @Min(0) @Max(100)
    private Integer environmental;

    @NotNull
    @Min(0) @Max(100)
    private Integer social;

    @NotNull
    @Min(0) @Max(100)
    private Integer governance;

    private Boolean highlighted = false;

    private CriteriaDto criteria;
    private List<String> alerts;

    public static class CriteriaDto {
        private String emissions;
        private String renewable;
        private String diversity;
        private String labor;
        private String transparency;

        public String getEmissions() { return emissions; }
        public void setEmissions(String emissions) { this.emissions = emissions; }
        public String getRenewable() { return renewable; }
        public void setRenewable(String renewable) { this.renewable = renewable; }
        public String getDiversity() { return diversity; }
        public void setDiversity(String diversity) { this.diversity = diversity; }
        public String getLabor() { return labor; }
        public void setLabor(String labor) { this.labor = labor; }
        public String getTransparency() { return transparency; }
        public void setTransparency(String transparency) { this.transparency = transparency; }
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }
    public Integer getEnvironmental() { return environmental; }
    public void setEnvironmental(Integer environmental) { this.environmental = environmental; }
    public Integer getSocial() { return social; }
    public void setSocial(Integer social) { this.social = social; }
    public Integer getGovernance() { return governance; }
    public void setGovernance(Integer governance) { this.governance = governance; }
    public Boolean getHighlighted() { return highlighted; }
    public void setHighlighted(Boolean highlighted) { this.highlighted = highlighted; }
    public CriteriaDto getCriteria() { return criteria; }
    public void setCriteria(CriteriaDto criteria) { this.criteria = criteria; }
    public List<String> getAlerts() { return alerts; }
    public void setAlerts(List<String> alerts) { this.alerts = alerts; }
}
