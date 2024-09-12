package com.globits.da.validator;


import com.globits.da.domain.EmployeeCertificate;
import com.globits.da.dto.EmployeeCertificateDto;
import com.globits.da.exception.LogicException;
import com.globits.da.repository.EmployeeCertificateRepository;

import java.util.List;

public class EmployeeCertificateValidator {
    public static void checkDuplicateCertificate(EmployeeCertificateDto employeeCertificateDto, EmployeeCertificateRepository employeeCertificateRepository) {
        List<EmployeeCertificate> employeeCertificates = employeeCertificateRepository.findCertificateByEmployeeId(employeeCertificateDto.getEmployeeId());
        Integer provinceId = employeeCertificateDto.getProvinceId();

        for(EmployeeCertificate employeeCertificate : employeeCertificates) {
            if(provinceId == employeeCertificate.getProvince().getId() && employeeCertificateDto.getCertificateId() == employeeCertificate.getCertificate().getId() && employeeCertificate.getCertificate().isValid() == true) {
                throw new LogicException("Employee already has this certificate  (still valid)");
            }
        }
    }

    public  static void checkNumberOfCertificate(EmployeeCertificateDto employeeCertificateDto, EmployeeCertificateRepository employeeCertificateRepository) {
        Integer certId = employeeCertificateDto.getCertificateId();
        Integer empId = employeeCertificateDto.getEmployeeId();

        List<EmployeeCertificate> employeeCertificates = employeeCertificateRepository.findCertificateByEmployeeId(empId);
        Integer count = 0;
        for(EmployeeCertificate employeeCertificate : employeeCertificates) {
            if(certId == employeeCertificate.getCertificate().getId()) {
                count++;
            }
        }
        if(count >= 3) {
            throw new LogicException("Number of certificate can't be more than 3");
        }
    }
}
