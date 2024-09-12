package com.globits.da.repository;

import com.globits.da.domain.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProvinceRepository extends JpaRepository<Province, Integer> {
    @Query("select new com.globits.da.dto.ProvinceDto(po) from Province po where lower(po.name) = lower(:name)")
    Optional<Province> findByNameIgnoreCase(@Param("name") String name);

    Optional<Province> findByName(String name);
}
