package com.impactrack.repository;

import com.impactrack.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByHighlightedOrderByIdDesc(Boolean highlighted);
}
