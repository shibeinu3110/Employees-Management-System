package com.globits.da.dto;

import com.globits.da.domain.District;
import com.globits.da.domain.Province;
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
public class ProvinceDto extends BaseDto {
    private String name;
    private List<DistrictDto> districtDtos;

    public ProvinceDto (Province province) {
        if(province != null) {
            this.setId(province.getId());
            this.name = province.getName();
            if(province.getDistricts() != null) {
                this.districtDtos = new ArrayList<>();
                for(District district : province.getDistricts()) {
                    DistrictDto districtDto = new DistrictDto(district);
                    this.districtDtos.add(districtDto);
                }
            }
        } else {
            throw new NullOrNotFoundException("Province can't be null");
        }
    }
}
