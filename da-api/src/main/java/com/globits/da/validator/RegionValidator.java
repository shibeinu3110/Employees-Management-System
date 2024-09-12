package com.globits.da.validator;

import com.globits.da.domain.Commune;
import com.globits.da.domain.District;
import com.globits.da.exception.LogicException;
import com.globits.da.repository.CommuneRepository;
import com.globits.da.repository.DistrictRepository;

public class RegionValidator {
    public static void checkDistrictBelongsToProvince(Integer provinceId, Integer districtId, DistrictRepository districtRepository) {
        District district = districtRepository.findById(districtId).get();
        if(district.getProvince().getId() != provinceId) {
            throw new LogicException("District doesn't belong to province");
        }
    }

    public static void checkCommuneBelongsToDistrict(Integer districtId, Integer communeId, CommuneRepository communeRepository) {
        Commune commune = communeRepository.findById(communeId).get();
        if(commune.getDistrict().getId() != districtId) {
            throw new LogicException("Commune doesn't belong to district");
        }
    }
}
