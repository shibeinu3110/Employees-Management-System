package com.globits.da.service.impl;

import com.globits.da.domain.Commune;
import com.globits.da.domain.District;
import com.globits.da.domain.Employee;
import com.globits.da.domain.Province;
import com.globits.da.dto.EmployeeDto;
import com.globits.da.exception.LogicException;
import com.globits.da.exception.NullOrNotFoundException;
import com.globits.da.repository.*;
import com.globits.da.service.EmployeeService;
import com.globits.da.validator.BaseValidator;
import com.globits.da.validator.EmployeeValidator;
import com.globits.da.validator.ExcelValidator;
import com.globits.da.validator.RegionValidator;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final ProvinceRepository provinceRepository;
    private final DistrictRepository districtRepository;
    private final CommuneRepository communeRepository;
    private final EmployeeCertificateRepository employeeCertificateRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, ProvinceRepository provinceRepository, DistrictRepository districtRepository, CommuneRepository communeRepository, EmployeeCertificateRepository employeeCertificateRepository) {
        this.employeeRepository = employeeRepository;
        this.provinceRepository = provinceRepository;
        this.districtRepository = districtRepository;
        this.communeRepository = communeRepository;
        this.employeeCertificateRepository = employeeCertificateRepository;
    }

    @Override
    public List<EmployeeDto> getEmployeeList() {
        List<Employee> employees = employeeRepository.findAll();
        List<EmployeeDto> employeeDtos = new ArrayList<>();
        for(Employee employee : employees) {
            employeeDtos.add(new EmployeeDto(employee));
        }
        return employeeDtos;
    }

    @Override
    public EmployeeDto findById(Integer id) {
        //BaseValidator.checkIsNumeric(id.toString(), "Employee ID");

        Optional<Employee> employee = employeeRepository.findById(id);

        if (!employee.isPresent()) {
            throw new NullOrNotFoundException("Can't find employee with this id");
        }
        EmployeeDto employeeDto = new EmployeeDto(employee.get());
        return employeeDto;
    }

    @Override
    public EmployeeDto findByCode(String code) {
        Optional<Employee> employee = Optional.ofNullable(employeeRepository.findByCode(code));
        if (!employee.isPresent()) {
            throw new NullOrNotFoundException("Can't find employee with this code");
        }
        EmployeeDto employeeDto = new EmployeeDto(employee.get());
        return employeeDto;
    }

    @Transactional
    @Override
    public EmployeeDto deleteById(Integer id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (!employee.isPresent()) {
            throw new NullOrNotFoundException("Can't find employee with this id");
        }

        employeeCertificateRepository.deleteEmployeeCertificateByEmployeeId(employee.get().getId());
        employeeRepository.delete(employee.get());


        return new EmployeeDto(employee.get());
    }

    @Override
    public EmployeeDto addNewEmployee(EmployeeDto employeeDto) {
        EmployeeValidator.checkCodeExisted(employeeDto.getCode(), employeeRepository);
        EmployeeValidator.checkEmployeeDto(employeeDto);


        BaseValidator.checkValidValue(employeeDto.getProvinceId(), "Province ID");
        BaseValidator.checkValidValue(employeeDto.getDistrictId(), "District ID");
        BaseValidator.checkValidValue(employeeDto.getCommuneId(), "Commune ID");


        Employee employee = new Employee();
        employee.setAge(employeeDto.getAge());
        //employee.setId(employeeDto.getId());
        employee.setCode(employeeDto.getCode());
        employee.setName(employeeDto.getName());
        employee.setPhone(employeeDto.getPhone());
        employee.setEmail(employeeDto.getEmail());

        Integer provinceId;
        Integer districtId;
        Integer communeId;

        Optional<Province> provinceOptional = provinceRepository.findById(employeeDto.getProvinceId());
        if (provinceOptional.isPresent()) {
            employee.setProvince(provinceOptional.get());
            provinceId = provinceOptional.get().getId();
        } else {
            throw new NullOrNotFoundException("Can't find province with this id: " + employeeDto.getProvinceId());
        }

        Optional<District> districtOptional = districtRepository.findById(employeeDto.getDistrictId());
        if (districtOptional.isPresent()) {
            employee.setDistrict(districtOptional.get());
            districtId = districtOptional.get().getId();
        } else {
            throw new NullOrNotFoundException("Can't find district with this id: " + employeeDto.getDistrictId());
        }

        Optional<Commune> communeOptional = communeRepository.findById(employeeDto.getCommuneId());
        if (communeOptional.isPresent()) {
            employee.setCommune(communeOptional.get());
            communeId = communeOptional.get().getId();
        } else {
            throw new NullOrNotFoundException("Can't find commune with this id: " + employeeDto.getCommuneId());
        }

        //validator
        RegionValidator.checkDistrictBelongsToProvince(provinceId, districtId, districtRepository);
        RegionValidator.checkCommuneBelongsToDistrict(districtId, communeId, communeRepository);


        employeeRepository.save(employee);
//        Employee tempEm = employeeRepository.findByCode(employeeDto.getCode());
//        employeeDto.setId(tempEm.getId());

        return new EmployeeDto(employee);
    }

    @Override
    public Object getExcelFile(HttpServletResponse response) throws IOException {
        List<Employee> employees = employeeRepository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Employees");

        //header
        Row row = sheet.createRow(0);
        String[] headerTitle = {"ID", "Name", "Code", "Email", "Phone", "Age"};
        for (int i = 0; i < headerTitle.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(headerTitle[i]);
        }


        //data
        Integer index = 1;
        for (Employee employee : employees) {
            Row row1 = sheet.createRow(index);
            row1.createCell(0).setCellValue(employee.getId());
            row1.createCell(1).setCellValue(employee.getName());
            row1.createCell(2).setCellValue(employee.getCode());
            row1.createCell(3).setCellValue(employee.getEmail());
            row1.createCell(4).setCellValue(employee.getPhone());
            row1.createCell(5).setCellValue(employee.getAge());
            index++;
        }

        response.setContentType("application/octet-stream");
        //response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        //đánh dấu đây là 1 file nhị phân, không phân loại


        String key = "Content-Disposition";
        String value = "attachment;filename=employees.xlsx";
        //tự động tải và đặt tên file excel đó là employees


        //(các cái content-disposition chính là cái header trong postman)


        response.setHeader(key, value);
        ServletOutputStream sos = response.getOutputStream();
        workbook.write(sos);
        workbook.close();
        sos.close();
        return HttpStatus.OK;

    }

    @Override
    public Object importExcelFile(MultipartFile excelFile) throws IOException {
        List<Employee> employees = new ArrayList<>();
        XSSFWorkbook workbook = new XSSFWorkbook(excelFile.getInputStream());
        XSSFSheet sheet = workbook.getSheetAt(0);
        List<String> errorList = new ArrayList<>();
        for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
            Employee employee = new Employee();
            Row row = sheet.getRow(i);

            //name
            Cell cell = row.getCell(0, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK); //avoid null
            String name = cell.getStringCellValue();
            /**validate*/
            employee.setName(name);

            //code
            cell = row.getCell(1, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
            String code = cell.getStringCellValue();
            /**validate*/
            employee.setCode(code);

            //email
            cell = row.getCell(2, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
            String email = cell.getStringCellValue();
            /**validate*/
            employee.setEmail(email);

            //phone
            cell = row.getCell(3, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
            String phone = cell.getStringCellValue();
            /**validated*/
            employee.setPhone(phone);


            //age
            cell = row.getCell(4, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
            String temp = ExcelValidator.checkIsNumeric(cell.getStringCellValue(), "Age", i);
            if (temp != null) {
                errorList.add(temp);
            } else {
                Integer age = null;
                age = Integer.valueOf(cell.getStringCellValue());
                employee.setAge(age);
            }
            /**validate*/


            //province
            cell = row.getCell(5, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
            Optional<Province> provinceOptional = provinceRepository.findByName(cell.getStringCellValue());
            if (!provinceOptional.isPresent()) {
                errorList.add("Province cell at row: " + row.getRowNum() + " is not existed");
            }
            Province province = provinceOptional.get();
            employee.setProvince(province);

            //district
            cell = row.getCell(6, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
            Optional<District> districtOptional = districtRepository.findDistrictByNameAndProvince(cell.getStringCellValue(), province);
            if (!districtOptional.isPresent()) {
                errorList.add("District cell at row: " + row.getRowNum() + " is not existed in province " + province.getName());
            }
            District district = districtOptional.get();
            employee.setDistrict(district);


            //commune
            cell = row.getCell(7, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
            Optional<Commune> communeOptional = communeRepository.findCommuneByNameAndDistrict(cell.getStringCellValue(), district);
            if (!communeOptional.isPresent()) {
                errorList.add("Commune cell at row: " + row.getRowNum() + " is not existed district " + district.getName());
            }
            Commune commune = communeOptional.get();
            employee.setCommune(commune);

            EmployeeDto employeeDto = new EmployeeDto(employee);
            errorList.add(ExcelValidator.checkCodeExisted(employeeDto.getCode(), employeeRepository, i));

            List<String> tempString = ExcelValidator.checkEmployeeDto(employeeDto, i);
            for (String s : tempString) {
                if (s != null) {
                    errorList.add(s);
                }
            }


            errorList.add(ExcelValidator.checkDistrictBelongsToProvince(province.getId(), district.getId(), districtRepository, i));
            errorList.add(ExcelValidator.checkCommuneBelongsToDistrict(district.getId(), commune.getId(), communeRepository, i));


            employees.add(employee);

        }
        StringBuilder stringBuilder = new StringBuilder();
        if (!errorList.isEmpty() || errorList != null) {
            for (String error : errorList) {
                if (error != null) {
                    stringBuilder.append(error);
                    stringBuilder.append("              ");
                }
            }
        }

        if (!stringBuilder.toString().isEmpty()) {
            throw new LogicException(stringBuilder.toString());
        }
        employeeRepository.saveAll(employees);

        return HttpStatus.OK;
    }

    @Override
    public EmployeeDto updateEmployee(Integer id, EmployeeDto employeeDto) {
        //handle province, district, commune
        BaseValidator.checkValidValue(employeeDto.getProvinceId(), "Province ID");
        BaseValidator.checkValidValue(employeeDto.getDistrictId(), "District ID");
        BaseValidator.checkValidValue(employeeDto.getCommuneId(), "Commune ID");


        Optional<Province> provinceOptional = provinceRepository.findById(employeeDto.getProvinceId());
        Optional<District> districtOptional = districtRepository.findById(employeeDto.getDistrictId());
        Optional<Commune> communeOptional = communeRepository.findById(employeeDto.getCommuneId());

        if (!provinceOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find province with this id: " + employeeDto.getProvinceId());
        }
        if (!districtOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find district with this id: " + employeeDto.getDistrictId());
        }
        if (!communeOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find commune with this id: " + employeeDto.getCommuneId());
        }

        Province province = provinceOptional.get();
        District district = districtOptional.get();
        Commune commune = communeOptional.get();

        RegionValidator.checkDistrictBelongsToProvince(employeeDto.getProvinceId(), employeeDto.getDistrictId(), districtRepository);
        RegionValidator.checkCommuneBelongsToDistrict(employeeDto.getDistrictId(), employeeDto.getCommuneId(), communeRepository);

        //PASS DATA
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (!employeeOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find employee with this id");
        }


        Employee employee = employeeOptional.get();
        employee.setCode(null);
        employeeRepository.save(employee);
        EmployeeValidator.checkCodeExisted(employeeDto.getCode(), employeeRepository);
        EmployeeValidator.checkEmployeeDto(employeeDto);


        employee.setCode(employeeDto.getCode());
        employee.setName(employeeDto.getName());
        employee.setAge(employeeDto.getAge());
        employee.setEmail(employeeDto.getEmail());
        employee.setPhone(employeeDto.getPhone());
        employee.setProvince(province);
        employee.setDistrict(district);
        employee.setCommune(commune);

        employeeRepository.save(employee);

        return new EmployeeDto(employee);
    }

}
