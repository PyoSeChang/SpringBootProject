package com.psc.lovemyself.repository.findmyself;

import com.psc.lovemyself.domain.findmyself.experience.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
}

