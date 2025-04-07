package com.psc.lovemyself.repository.findmyself;

import com.psc.lovemyself.domain.findmyself.idea.Idea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {
}

