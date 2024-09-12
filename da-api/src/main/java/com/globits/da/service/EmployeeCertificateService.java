package com.globits.da.service;

import com.globits.da.dto.EmployeeCertificateDto;

import java.util.List;

public interface EmployeeCertificateService {
    EmployeeCertificateDto addNewEmployeeCertificate(EmployeeCertificateDto employeeCertificateDto);
    List<EmployeeCertificateDto> getAllEmployeeCertificate();
    List<EmployeeCertificateDto> getCertificateByEmployeeId(Integer employeeId);
    EmployeeCertificateDto deleteEmployeeCertificateById(Integer id);
//    List<EmployeeCertificateDto> getCertificatesByEmployeeId(Integer id);
    List<EmployeeCertificateDto> deleteEmployeeCertificateByEmployeeId(Integer id);
}
