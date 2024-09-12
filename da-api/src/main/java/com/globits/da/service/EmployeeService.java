package com.globits.da.service;


import com.globits.da.dto.EmployeeDto;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface EmployeeService {
    List<EmployeeDto> getEmployeeList();

    EmployeeDto findById(Integer id);

    EmployeeDto findByCode(String code);

    EmployeeDto deleteById(Integer id);

    EmployeeDto addNewEmployee(EmployeeDto employeeDto);

    Object getExcelFile(HttpServletResponse response) throws IOException;
    Object importExcelFile(MultipartFile excelFile) throws IOException;
    EmployeeDto updateEmployee(Integer id, EmployeeDto employeeDto);

}
