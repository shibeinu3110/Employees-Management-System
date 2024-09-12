package com.globits.da.service;

import com.globits.da.dto.DistrictDto;
import com.globits.da.dto.ProvinceDto;

import java.util.List;

public interface ProvinceService {
    ProvinceDto addNewProvince(ProvinceDto provinceDto);

    List<ProvinceDto> getProvinceList();

    List<DistrictDto> findDistrictListByProvinceId(Integer id);

    ProvinceDto deleteProvinceById(Integer id);

    ProvinceDto updateProvince(Integer id, ProvinceDto provinceDto);
}
