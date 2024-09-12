package com.globits.da.repository;

import com.globits.da.domain.EmployeeCertificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EmployeeCertificateRepository extends JpaRepository<EmployeeCertificate, Integer> {
    List<EmployeeCertificate> findCertificateByEmployeeId(Integer id);

    @Modifying
    @Transactional
    void deleteEmployeeCertificateByEmployeeId(Integer id);

    @Modifying
    @Transactional
    void deleteEmployeeCertificateByCertificateId(Integer id);

    @Modifying
    @Transactional
    @Query("UPDATE EmployeeCertificate e SET e.province.id = null WHERE e.province.id = :provinceId")
    void updateProvinceIdToNull(@Param("provinceId") Integer provinceId);


}
