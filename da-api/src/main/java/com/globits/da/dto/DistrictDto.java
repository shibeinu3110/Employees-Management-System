package com.globits.da.dto;

import com.globits.da.domain.Commune;
import com.globits.da.domain.District;
import com.globits.da.exception.NullOrNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DistrictDto extends BaseDto{
    private String name;

    private Integer provinceCode;
    private String provinceName;


    private List<CommuneDto> communeDtos;

    public DistrictDto(District district) {
        if(district != null) {
            this.setId(district.getId());
            this.name = district.getName();
            if(district.getProvince() != null) {
                this.provinceCode = district.getProvince().getId();
                this.provinceName = district.getProvince().getName();
            }
            if(district.getCommunes() != null && !district.getCommunes().isEmpty()) {
                this.communeDtos = new ArrayList<>();
                for(Commune commune : district.getCommunes()) {
                    CommuneDto communeDto = new CommuneDto(commune);
                    this.communeDtos.add(communeDto);
                }
            }
        } else {
            throw new NullOrNotFoundException("District can't be null");
        }
    }

}
