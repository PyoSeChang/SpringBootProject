package com.psc.lovemyself.repository.findmyself;

import com.psc.lovemyself.domain.findmyself.Cognition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CognitionRepository extends JpaRepository<Cognition, Long> {
}
