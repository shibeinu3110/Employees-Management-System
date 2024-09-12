package com.globits.da.dto;

import com.globits.da.domain.Commune;
import com.globits.da.exception.NullOrNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommuneDto extends BaseDto{
    private String name;
    private String districtName;
    private Integer districtId;

    public CommuneDto(Commune commune) {
        if(commune != null) {
            this.setId(commune.getId());
            this.name = commune.getName();
            if(commune.getDistrict() != null) {
                this.districtId = commune.getDistrict().getId();
                this.districtName = commune.getDistrict().getName();
            }
        } else {
            throw new NullOrNotFoundException("Commune can't be null");
        }
    }
}
