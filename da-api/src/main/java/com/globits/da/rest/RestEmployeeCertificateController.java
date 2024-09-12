package com.globits.da.rest;
import com.globits.da.dto.EmployeeCertificateDto;
import com.globits.da.response.CustomizedResponse;
import com.globits.da.service.EmployeeCertificateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@RequestMapping("/api/employeeCertificate")
public class RestEmployeeCertificateController {
    private final EmployeeCertificateService employeeCertificateService;

    public RestEmployeeCertificateController(EmployeeCertificateService employeeCertificateService) {
        this.employeeCertificateService = employeeCertificateService;
    }
    @PostMapping("/")
    public ResponseEntity<?> addNewEmployeeCertificate(@RequestBody EmployeeCertificateDto employeeCertificateDto) {
        EmployeeCertificateDto employeeCertificateDto1 = employeeCertificateService.addNewEmployeeCertificate(employeeCertificateDto);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "add new employee certificate successfully", employeeCertificateDto1), HttpStatus.OK);
    }
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllEmployeeCertificate() {
        List<EmployeeCertificateDto> employeeCertificateDtos = employeeCertificateService.getAllEmployeeCertificate();
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "get all employee certificate successfully", employeeCertificateDtos), HttpStatus.OK);
    }
    @GetMapping("/getCertificate/{employeeId}")
    public ResponseEntity<?> getCertificateByEmployeeId(@PathVariable("employeeId") Integer employeeId) {
        List<EmployeeCertificateDto> employeeCertificateDto = employeeCertificateService.getCertificateByEmployeeId(employeeId);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "get all certificate by employee id successfully", employeeCertificateDto), HttpStatus.OK);

    }
    @DeleteMapping("/employee/{employeeId}")
    public ResponseEntity<?> deleteEmployeeCertificateByEmployeeId(@PathVariable("employeeId") Integer employeeId) {
        List<EmployeeCertificateDto> employeeCertificateDto = employeeCertificateService.deleteEmployeeCertificateByEmployeeId(employeeId);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "delete employee certificate by employee ID successfully", employeeCertificateDto), HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployeeCertificateById(@PathVariable("id") Integer id) {
        EmployeeCertificateDto employeeCertificateDto = employeeCertificateService.deleteEmployeeCertificateById(id);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "delete employee certificate successfully", employeeCertificateDto), HttpStatus.OK);

    }
}
