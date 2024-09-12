package com.globits.da.service.impl;

import com.globits.da.domain.Commune;
import com.globits.da.domain.District;
import com.globits.da.dto.CommuneDto;
import com.globits.da.exception.NullOrNotFoundException;
import com.globits.da.repository.CommuneRepository;
import com.globits.da.repository.DistrictRepository;
import com.globits.da.service.CommuneService;
import com.globits.da.validator.BaseValidator;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommuneServiceImpl implements CommuneService {
    private final CommuneRepository communeRepository;
    private final DistrictRepository districtRepository;

    public CommuneServiceImpl(CommuneRepository communeRepository, DistrictRepository districtRepository) {
        this.communeRepository = communeRepository;
        this.districtRepository = districtRepository;
    }

    @Override
    public List<CommuneDto> getAllCommunes() {
        List<Commune> communes = communeRepository.findAll();
        List<CommuneDto> communeDtos = new ArrayList<>();
        for(Commune commune : communes) {
            communeDtos.add(new CommuneDto(commune));
        }
        return communeDtos;
    }

    @Override
    public CommuneDto addNewCommune(CommuneDto communeDto) {
        BaseValidator.checkValidValue(communeDto.getDistrictId(), "District Id");
        Commune commune = new Commune();

        Optional<District> districtOptional = districtRepository.findById(communeDto.getDistrictId());
        if(!districtOptional.isPresent()) {
            throw new NullOrNotFoundException("District with this id is not exist");
        }
        commune.setDistrict(districtOptional.get());
        commune.setName(communeDto.getName());
        communeRepository.save(commune);
        return new CommuneDto(commune);
    }

    @Override
    public CommuneDto findById(Integer id) {
        Optional<Commune> communeOptional = communeRepository.findById(id);
        if(!communeOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find commune with this id");
        }

        return new CommuneDto(communeOptional.get());
    }

    @Override
    public CommuneDto deleteById(Integer id) {
        Optional<Commune> communeOptional = communeRepository.findById(id);
        if(!communeOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find commune with this id");
        }
        communeRepository.delete(communeOptional.get());
        return new CommuneDto(communeOptional.get());
    }

    @Override
    public CommuneDto updateById(Integer id, CommuneDto communeDto) {
        Optional<Commune> communeOptional = communeRepository.findById(id);
        if(!communeOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find commune with this id");
        }
        Commune commune = communeOptional.get();
        BaseValidator.checkValidValue(commune.getDistrict().getId(), "District code");

        commune.setName(communeDto.getName());

        Optional<District> districtOptional = districtRepository.findById(communeDto.getDistrictId());
        if(!districtOptional.isPresent()) {
            throw new NullOrNotFoundException("District code to update is not exist");
        }
        commune.setDistrict(districtOptional.get());

        communeRepository.save(commune);
        return new CommuneDto(commune);
    }


}
