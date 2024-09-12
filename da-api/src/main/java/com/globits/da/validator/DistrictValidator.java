package com.globits.da.validator;

import com.globits.da.domain.District;
import com.globits.da.domain.Province;
import com.globits.da.exception.AlreadyExistException;
import com.globits.da.exception.NullOrNotFoundException;
import com.globits.da.repository.ProvinceRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class DistrictValidator {
    public static void checkDistrictAlreadyExist(Integer provinceCode, String districtName, ProvinceRepository provinceRepository) {
        Optional<Province> province = provinceRepository.findById(provinceCode);
        if(!province.isPresent()) {
            throw new NullOrNotFoundException("Can't find province with this id");
        }
        List<String> listDistrictName = new ArrayList<>();
        for(District district : province.get().getDistricts()) {
            listDistrictName.add(district.getName());
        }
        boolean containsDistrict = listDistrictName.stream().anyMatch(name -> name.equalsIgnoreCase(districtName));
        if(containsDistrict) {
            throw new AlreadyExistException("District with this name is already exist in province with name: " + province.get().getName() + "(id: " + provinceCode + ")");
        }


    }
}
