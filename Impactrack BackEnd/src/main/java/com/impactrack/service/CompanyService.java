package com.impactrack.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.impactrack.dto.CompanyRequest;
import com.impactrack.dto.CompanyResponse;
import com.impactrack.entity.Company;
import com.impactrack.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    private final CompanyRepository repository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public CompanyService(CompanyRepository repository) {
        this.repository = repository;
    }

    public List<CompanyResponse> findAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<CompanyResponse> findByHighlighted(boolean highlighted) {
        return repository.findByHighlightedOrderByIdDesc(highlighted).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<CompanyResponse> findById(Long id) {
        return repository.findById(id).map(this::toResponse);
    }

    @Transactional
    public CompanyResponse create(CompanyRequest req) {
        Company entity = new Company();
        entity.setName(req.getName());
        entity.setCategory(req.getCategory());
        entity.setDescription(req.getDescription());
        entity.setLogo(req.getLogo() != null ? req.getLogo() : "");
        entity.setEnvironmental(req.getEnvironmental());
        entity.setSocial(req.getSocial());
        entity.setGovernance(req.getGovernance());
        entity.setEsgScore(Math.round((req.getEnvironmental() + req.getSocial() + req.getGovernance()) / 3));
        entity.setHighlighted(req.getHighlighted() != null ? req.getHighlighted() : false);
        if (req.getCriteria() != null) {
            entity.setCriteriaEmissions(req.getCriteria().getEmissions());
            entity.setCriteriaRenewable(req.getCriteria().getRenewable());
            entity.setCriteriaDiversity(req.getCriteria().getDiversity());
            entity.setCriteriaLabor(req.getCriteria().getLabor());
            entity.setCriteriaTransparency(req.getCriteria().getTransparency());
        }
        if (req.getAlerts() != null && !req.getAlerts().isEmpty()) {
            try {
                entity.setAlertsJson(objectMapper.writeValueAsString(req.getAlerts()));
            } catch (Exception e) {
                entity.setAlertsJson("[]");
            }
        }
        return toResponse(repository.save(entity));
    }

    @Transactional
    public Optional<CompanyResponse> toggleHighlight(Long id) {
        return repository.findById(id).map(company -> {
            company.setHighlighted(!Boolean.TRUE.equals(company.getHighlighted()));
            return toResponse(repository.save(company));
        });
    }

    @Transactional
    public boolean deleteById(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }

    private CompanyResponse toResponse(Company c) {
        CompanyResponse r = new CompanyResponse();
        r.setId(c.getId());
        r.setName(c.getName());
        r.setDescription(c.getDescription());
        r.setLogo(c.getLogo());
        r.setEsgScore(c.getEsgScore());
        r.setEnvironmental(c.getEnvironmental());
        r.setSocial(c.getSocial());
        r.setGovernance(c.getGovernance());
        r.setCategory(c.getCategory());
        r.setHighlighted(Boolean.TRUE.equals(c.getHighlighted()));
        Map<String, String> criteria = new LinkedHashMap<>();
        if (c.getCriteriaEmissions() != null) criteria.put("emissions", c.getCriteriaEmissions());
        if (c.getCriteriaRenewable() != null) criteria.put("renewable", c.getCriteriaRenewable());
        if (c.getCriteriaDiversity() != null) criteria.put("diversity", c.getCriteriaDiversity());
        if (c.getCriteriaLabor() != null) criteria.put("labor", c.getCriteriaLabor());
        if (c.getCriteriaTransparency() != null) criteria.put("transparency", c.getCriteriaTransparency());
        r.setCriteria(criteria.isEmpty() ? null : criteria);
        if (c.getAlertsJson() != null && !c.getAlertsJson().isEmpty()) {
            try {
                r.setAlerts(objectMapper.readValue(c.getAlertsJson(), new TypeReference<List<String>>() {}));
            } catch (Exception e) {
                r.setAlerts(Collections.emptyList());
            }
        }
        return r;
    }
}
