package com.globits.da.repository;

import com.globits.da.domain.Commune;
import com.globits.da.domain.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommuneRepository extends JpaRepository<Commune, Integer> {

    Optional<Commune> findCommuneByNameAndDistrict(String name , District district);
}
