package com.globits.da.dto;

import com.globits.da.domain.Employee;
import com.globits.da.exception.NullOrNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto extends BaseDto {
    private String code;
    private String name;
    private String email;
    private String phone;
    private Integer age;

    private Integer provinceId;
    private String provinceName;

    private Integer districtId;
    private String districtName;

    private Integer communeId;
    private String communeName;

    public EmployeeDto(Employee employee) {
        if(employee != null) {
            this.setId(employee.getId());
            this.code = employee.getCode();
            this.email = employee.getEmail();
            this.name = employee.getName();
            this.phone = employee.getPhone();
            this.age = employee.getAge();

            if(employee.getProvince() != null) {
                this.provinceId = employee.getProvince().getId();
                this.provinceName = employee.getProvince().getName();
            }
            if(employee.getDistrict() != null) {
                this.districtId = employee.getDistrict().getId();
                this.districtName = employee.getDistrict().getName();
            }
            if(employee.getCommune() != null) {
                this.communeId = employee.getCommune().getId();
                this.communeName = employee.getCommune().getName();
            }
        } else {
            throw new NullOrNotFoundException("Employee can't be null");
        }
    }
}
