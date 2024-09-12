package com.globits.da.dto;

import com.globits.da.domain.EmployeeCertificate;
import com.globits.da.exception.NullOrNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeCertificateDto extends BaseDto {
    private Integer employeeId;
    private String employeeName;

    private Integer certificateId;
    private String certificateName;
    private String certificateDescription;

    private Integer provinceId;
    private String provinceName;

    private boolean isValid;


    public EmployeeCertificateDto(EmployeeCertificate employeeCertificate) {
        if(employeeCertificate != null) {
            LocalDate currentDate = LocalDate.now();
            this.setId(employeeCertificate.getId());
            if(employeeCertificate.getEmployee() != null) {
                this.employeeId = employeeCertificate.getEmployee().getId();
                this.employeeName = employeeCertificate.getEmployee().getName();
            }
            if(employeeCertificate.getCertificate() != null) {
                this.certificateId = employeeCertificate.getCertificate().getId();
                this.certificateName = employeeCertificate.getCertificate().getName();
                this.certificateDescription = employeeCertificate.getCertificate().getDescription();
                if(!currentDate.isBefore(employeeCertificate.getCertificate().getStartDate()) &&
                        !currentDate.isAfter(employeeCertificate.getCertificate().getEndDate())) {
                    this.isValid = true;
                } else {
                    this.isValid = false;
                }
            }
            if(employeeCertificate.getProvince() != null) {
                this.provinceId = employeeCertificate.getProvince().getId();
                this.provinceName = employeeCertificate.getProvince().getName();
            }
        } else {
            throw new NullOrNotFoundException("Employee certificate can't be null");
        }
    }
}
