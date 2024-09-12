package com.globits.da.repository;

import com.globits.da.domain.Employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer> {
    Employee findByCode(String code);
    @Modifying
    @Transactional
    @Query("UPDATE Employee e SET e.commune.id = null WHERE e.commune.id = :communeId")
    void updateCommuneIdToNull(@Param("communeId") Integer communeId);

    @Modifying
    @Transactional
    @Query("UPDATE Employee e SET e.district.id = null WHERE e.district.id = :districtId")
    void updateDistrictIdToNull(@Param("districtId") Integer districtId);

    @Modifying
    @Transactional
    @Query("UPDATE Employee e SET e.province.id = null WHERE e.province.id = :provinceId")
    void updateProvinceIdToNull(@Param("provinceId") Integer provinceId);

}
