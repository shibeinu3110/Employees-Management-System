package com.globits.da.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tbl_commune")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Commune extends BaseObject{
    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "district_id")
    @JsonBackReference
    private District district;
}
