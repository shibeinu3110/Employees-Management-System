package com.globits.da.validator;

import com.globits.da.dto.ProvinceDto;
import com.globits.da.exception.AlreadyExistException;
import com.globits.da.repository.ProvinceRepository;

public class ProvinceValidator {

    public static void checkProvinceAlreadyExist(ProvinceDto provinceDto, ProvinceRepository provinceRepository) {
        if(provinceRepository.findByNameIgnoreCase(provinceDto.getName()).isPresent()) {
            throw new AlreadyExistException("This province is already existed");
        }

    }
    public static void checkProvinceDto(ProvinceDto provinceDto) {
        BaseValidator.checkValidString(provinceDto.getName(), "Province");

    }
}
