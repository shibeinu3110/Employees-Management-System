package com.globits.da.service.impl;

import com.globits.da.domain.Certificate;
import com.globits.da.domain.Employee;
import com.globits.da.domain.EmployeeCertificate;
import com.globits.da.domain.Province;
import com.globits.da.dto.EmployeeCertificateDto;
import com.globits.da.exception.NullOrNotFoundException;
import com.globits.da.repository.CertificateRepository;
import com.globits.da.repository.EmployeeCertificateRepository;
import com.globits.da.repository.EmployeeRepository;
import com.globits.da.repository.ProvinceRepository;
import com.globits.da.service.EmployeeCertificateService;
import com.globits.da.validator.BaseValidator;
import com.globits.da.validator.EmployeeCertificateValidator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeCertificateServiceImpl implements EmployeeCertificateService {
    private final EmployeeCertificateRepository employeeCertificateRepository;
    private final EmployeeRepository employeeRepository;
    private final CertificateRepository certificateRepository;
    private final ProvinceRepository provinceRepository;

    public EmployeeCertificateServiceImpl(EmployeeCertificateRepository employeeCertificateRepository, EmployeeRepository employeeRepository, CertificateRepository certificateRepository, ProvinceRepository provinceRepository) {
        this.employeeCertificateRepository = employeeCertificateRepository;
        this.employeeRepository = employeeRepository;
        this.certificateRepository = certificateRepository;
        this.provinceRepository = provinceRepository;
    }

    @Override
    public EmployeeCertificateDto addNewEmployeeCertificate(EmployeeCertificateDto employeeCertificateDto) {
        BaseValidator.checkValidValue(employeeCertificateDto.getEmployeeId(), "Employee Id");
        BaseValidator.checkValidValue(employeeCertificateDto.getCertificateId(), "Certificate Id");
        BaseValidator.checkValidValue(employeeCertificateDto.getProvinceId(), "Province id");

        EmployeeCertificate employeeCertificate = new EmployeeCertificate();

        //employee
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeCertificateDto.getEmployeeId());
        if (!employeeOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find employee with this id");
        }
        employeeCertificate.setEmployee(employeeOptional.get());

        //certificate
        Optional<Certificate> certificateOptional = certificateRepository.findById(employeeCertificateDto.getCertificateId());
        if (!certificateOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find certificate with this id");
        }
        employeeCertificate.setCertificate(certificateOptional.get());

        //province
        Optional<Province> provinceOptional = provinceRepository.findById(employeeCertificateDto.getProvinceId());
        if (!provinceOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find province with this id");
        }
        employeeCertificate.setProvince(provinceOptional.get());


        EmployeeCertificateValidator.checkDuplicateCertificate(employeeCertificateDto, employeeCertificateRepository);
        EmployeeCertificateValidator.checkNumberOfCertificate(employeeCertificateDto, employeeCertificateRepository);

        employeeCertificateRepository.save(employeeCertificate);
        return new EmployeeCertificateDto(employeeCertificate);
    }

    @Override
    public List<EmployeeCertificateDto> getAllEmployeeCertificate() {
        List<EmployeeCertificate> employeeCertificates = employeeCertificateRepository.findAll();
        List<EmployeeCertificateDto> employeeCertificateDtos = new ArrayList<>();
        for (EmployeeCertificate employeeCertificate : employeeCertificates) {
            employeeCertificateDtos.add(new EmployeeCertificateDto(employeeCertificate));
        }
        return employeeCertificateDtos;
    }

    @Override
    public List<EmployeeCertificateDto> getCertificateByEmployeeId(Integer employeeId) {
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);
        if (!employeeOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find employee with this id");
        }
        Employee employee = employeeOptional.get();
        List<EmployeeCertificate> employeeCertificates = employeeCertificateRepository.findCertificateByEmployeeId(employee.getId());
        if (employeeCertificates == null || employeeCertificates.isEmpty()) {
            throw new NullOrNotFoundException("This employee certificate list is empty");
        }

        List<EmployeeCertificateDto> employeeCertificateDtos = new ArrayList<>();
        for (EmployeeCertificate employeeCertificate : employeeCertificates) {
            employeeCertificateDtos.add(new EmployeeCertificateDto(employeeCertificate));
        }

        return employeeCertificateDtos;
    }

    @Override
    public EmployeeCertificateDto deleteEmployeeCertificateById(Integer id) {
        Optional<EmployeeCertificate> employeeCertificate = employeeCertificateRepository.findById(id);
        if(!employeeCertificate.isPresent()) {
            throw new NullOrNotFoundException("Can't find employee certificate with this id");
        }
        employeeCertificateRepository.deleteById(id);
        return new EmployeeCertificateDto(employeeCertificate.get());
    }

    @Override
    public List<EmployeeCertificateDto> deleteEmployeeCertificateByEmployeeId(Integer id) {
        List<EmployeeCertificateDto> employeeCertificateDtoList = getCertificateByEmployeeId(id);
        employeeCertificateRepository.deleteEmployeeCertificateByEmployeeId(id);
        return employeeCertificateDtoList;
    }
}
