package com.psc.lovemyself.repository.findmyself;

import com.psc.lovemyself.domain.findmyself.ConnectionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConnectionTypeRepository extends JpaRepository<ConnectionType, Long> {
    Optional<ConnectionType> findByConnectionType(String connectionTypename);
}
