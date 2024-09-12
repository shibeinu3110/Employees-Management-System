package com.globits.da.service;

import com.globits.da.dto.CertificateDto;

import java.util.List;

public interface CertificateService {
    CertificateDto addNewCertificate(CertificateDto certificateDto);
    List<CertificateDto> getAllCertificate();
    CertificateDto findCertificateById(Integer id);
    CertificateDto deleteCertificateById(Integer id);
    CertificateDto updateCertificateById(Integer id, CertificateDto certificateDto);
}
