package com.globits.da.service;

import com.globits.da.dto.CommuneDto;

import java.util.List;

public interface CommuneService {
    List<CommuneDto> getAllCommunes();
    CommuneDto addNewCommune(CommuneDto communeDto);
    CommuneDto findById(Integer id);
    CommuneDto deleteById(Integer id);
    CommuneDto updateById(Integer id, CommuneDto communeDto);


}
