package com.psc.lovemyself.repository.findmyself;

import com.psc.lovemyself.domain.findmyself.Connection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, Long> {
}
