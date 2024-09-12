package com.globits.da.rest;


import com.globits.da.dto.CertificateDto;
import com.globits.da.response.CustomizedResponse;
import com.globits.da.service.CertificateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@Controller
@RequestMapping("/api/certificate")
public class RestCertificateController {
     private final CertificateService certificateService;

    public RestCertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @PostMapping("/")
    public ResponseEntity<?> addNewCertificate(@RequestBody CertificateDto certificateDto) {
        CertificateDto certificateDto1 = certificateService.addNewCertificate(certificateDto);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "add new certificate successfully", certificateDto1), HttpStatus.OK);
    }
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllCertificate() {
        List<CertificateDto> certificateDtos = certificateService.getAllCertificate();
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "get all certificate successfully", certificateDtos), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findCertificateById(@PathVariable("id") Integer id) {
        CertificateDto certificateDto = certificateService.findCertificateById(id);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "get certificate by id successfully", certificateDto), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCertificateById(@PathVariable("id") Integer id) {
        CertificateDto certificateDto = certificateService.deleteCertificateById(id);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "delete certificate successfully", certificateDto), HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCertificateById(@PathVariable("id") Integer id,
                                                   @RequestBody CertificateDto certificateDto) {
        CertificateDto certificateDto1 = certificateService.updateCertificateById(id, certificateDto);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "update certificate successfully", certificateDto1), HttpStatus.OK);
    }
}
