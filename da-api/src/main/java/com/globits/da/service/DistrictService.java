package com.globits.da.service;

import com.globits.da.dto.CommuneDto;
import com.globits.da.dto.DistrictDto;

import java.util.List;

public interface DistrictService {
    List<DistrictDto> getAllDistrict();
    DistrictDto addNewDistrict(DistrictDto districtDto);
    List<CommuneDto> findCommuneByDistrictId(Integer id);
    DistrictDto deleteDistrictById(Integer id);
    DistrictDto  updateDistrictById(Integer id, DistrictDto districtDto);
}
