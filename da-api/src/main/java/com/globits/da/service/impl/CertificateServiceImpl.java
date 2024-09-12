package com.globits.da.service.impl;

import com.globits.da.domain.Certificate;
import com.globits.da.dto.CertificateDto;
import com.globits.da.exception.NullOrNotFoundException;
import com.globits.da.repository.CertificateRepository;
import com.globits.da.repository.EmployeeCertificateRepository;
import com.globits.da.service.CertificateService;
import com.globits.da.validator.BaseValidator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CertificateServiceImpl implements CertificateService {
    private final CertificateRepository certificateRepository;
    private final EmployeeCertificateRepository employeeCertificateRepository;

    public CertificateServiceImpl(CertificateRepository certificateRepository, EmployeeCertificateRepository employeeCertificateRepository) {
        this.certificateRepository = certificateRepository;
        this.employeeCertificateRepository = employeeCertificateRepository;
    }

    @Override
    public CertificateDto addNewCertificate(CertificateDto certificateDto) {
        LocalDate currentDate = LocalDate.now();

        Certificate certificate = new Certificate();
        BaseValidator.checkValidString(certificateDto.getStartDate().toString(), "Start date");
        BaseValidator.checkValidString(certificateDto.getEndDate().toString(), "End date");


        certificate.setName(certificateDto.getName());
        certificate.setDescription(certificateDto.getDescription());
        certificate.setStartDate(certificateDto.getStartDate());
        certificate.setEndDate(certificateDto.getEndDate());

        if(!currentDate.isBefore(certificateDto.getStartDate()) && !currentDate.isAfter(certificateDto.getEndDate())) {
            certificate.setValid(true);
        } else {
            certificate.setValid(false);
        }
        certificateRepository.save(certificate);
        return new CertificateDto(certificate);
    }

    @Override
    public List<CertificateDto> getAllCertificate() {
        List<Certificate> certificates = certificateRepository.findAll();
        List<CertificateDto> certificateDtos = new ArrayList<>();
        for(Certificate certificate : certificates) {
            certificateDtos.add(new CertificateDto(certificate));
        }
        return certificateDtos;
    }

    @Override
    public CertificateDto findCertificateById(Integer id) {
        Optional<Certificate> certificateOptional = certificateRepository.findById(id);
        if(!certificateOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find certificate with this id");
        }
        CertificateDto certificateDto = new CertificateDto(certificateOptional.get());
        return certificateDto;
    }

    @Transactional
    @Override
    public CertificateDto deleteCertificateById(Integer id) {
        Optional<Certificate> certificateOptional = certificateRepository.findById(id);
        if(!certificateOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find certificate with this id");
        }
        CertificateDto certificateDto = new CertificateDto(certificateOptional.get());

        employeeCertificateRepository.deleteEmployeeCertificateByCertificateId(certificateOptional.get().getId());
        certificateRepository.delete(certificateOptional.get());
        return certificateDto;
    }

    @Override
    public CertificateDto updateCertificateById(Integer id, CertificateDto certificateDto) {
        Optional<Certificate> certificateOptional = certificateRepository.findById(id);
        if(!certificateOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find certificate with this id");
        }
        Certificate certificate = certificateOptional.get();
        certificate.setName(certificateDto.getName());
        certificate.setDescription(certificateDto.getDescription());
        certificate.setStartDate(certificateDto.getStartDate());
        certificate.setEndDate(certificateDto.getEndDate());

        LocalDate currentDate = LocalDate.now();
        if(!currentDate.isBefore(certificateDto.getStartDate()) && !currentDate.isAfter(certificateDto.getEndDate())) {
            certificate.setValid(true);
        } else {
            certificate.setValid(false);
        }
        certificateRepository.save(certificate);
        return new CertificateDto(certificate);
    }
}
