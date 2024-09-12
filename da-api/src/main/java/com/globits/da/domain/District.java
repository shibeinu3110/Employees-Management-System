package com.globits.da.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "tbl_district")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class District extends BaseObject{
    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "province_id")
    @JsonBackReference
    private Province province;


    @OneToMany(mappedBy = "district", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Commune> communes;
}
