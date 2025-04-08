package com.psc.lovemyself.repository.findmyself;

import com.psc.lovemyself.domain.findmyself.ConnectionView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConnectionViewRepository extends JpaRepository<ConnectionView, Long> {
    Optional<ConnectionView> findByName(String viewName);
}
