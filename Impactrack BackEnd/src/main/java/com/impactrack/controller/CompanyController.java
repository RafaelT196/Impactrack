package com.impactrack.controller;

import com.impactrack.dto.CompanyRequest;
import com.impactrack.dto.CompanyResponse;
import com.impactrack.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService service;

    public CompanyController(CompanyService service) {
        this.service = service;
    }

    @GetMapping
    public List<CompanyResponse> listAll() {
        return service.findAll();
    }

    @GetMapping("/destaques")
    public List<CompanyResponse> listDestaques() {
        return service.findByHighlighted(true);
    }

    @GetMapping("/explorar")
    public List<CompanyResponse> listExplorar() {
        return service.findByHighlighted(false);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponse> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CompanyResponse> create(@Valid @RequestBody CompanyRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PatchMapping("/{id}/destaque")
    public ResponseEntity<CompanyResponse> toggleDestaque(@PathVariable Long id) {
        return service.toggleHighlight(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.deleteById(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
