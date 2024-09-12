package com.globits.da.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_employee_certificate")
public class EmployeeCertificate extends BaseObject {
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "certificate_id")
    private Certificate certificate;
    @ManyToOne
    @JoinColumn(name = "province_id")
    private Province province;
}
