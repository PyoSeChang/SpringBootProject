package com.psc.lovemyself.repository.findmyself;

import com.psc.lovemyself.domain.directory.Directory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectoryRepository extends JpaRepository<Directory, Integer> {
}
