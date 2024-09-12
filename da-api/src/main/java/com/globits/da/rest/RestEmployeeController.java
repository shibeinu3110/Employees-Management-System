package com.globits.da.rest;

import com.globits.da.dto.EmployeeDto;
import com.globits.da.response.CustomizedResponse;
import com.globits.da.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/employee")
public class RestEmployeeController {
    private final EmployeeService employeeService;

    public RestEmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllEmployee() {
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "query successfully", employeeService.getEmployeeList()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>((new CustomizedResponse<>(HttpStatus.OK.toString(), "find successfully", employeeService.findById(id))), HttpStatus.OK);
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<?> getEmployeeByCode(@PathVariable("code") String code) {
        return new ResponseEntity<>((new CustomizedResponse<>(HttpStatus.OK.toString(), "find successfully", employeeService.findByCode(code))), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployeeById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>((new CustomizedResponse<>(HttpStatus.OK.toString(), "delete successfully", employeeService.deleteById(id))), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> addNewEmployee(@RequestBody EmployeeDto employeeDto) {
        return new ResponseEntity<>((new CustomizedResponse<>(HttpStatus.OK.toString(), "add successfully", employeeService.addNewEmployee(employeeDto))), HttpStatus.OK);
    }
    @GetMapping("/excel/export")
    public ResponseEntity<?> getExcelFile(HttpServletResponse response) throws IOException {
        Object o = employeeService.getExcelFile(response);
        return new ResponseEntity<>((new CustomizedResponse<>(HttpStatus.OK.toString(), "export successfully", o)), HttpStatus.OK);
    }

    @PostMapping("/excel/import")
    public ResponseEntity<?> importExcelFile(@RequestParam("file")MultipartFile excelFile) throws IOException {
        Object o = employeeService.importExcelFile(excelFile);
        return new ResponseEntity<>((new CustomizedResponse<>(HttpStatus.OK.toString(), "import successfully", o)), HttpStatus.OK);

    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable("id") Integer id, @RequestBody EmployeeDto employeeDto) {
        EmployeeDto employeeDto1 = employeeService.updateEmployee(id, employeeDto);
        return new ResponseEntity<>((new CustomizedResponse<>(HttpStatus.OK.toString(), "update successfully", employeeDto1)), HttpStatus.OK);

    }
}

