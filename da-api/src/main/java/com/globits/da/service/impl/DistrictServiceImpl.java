package com.globits.da.service.impl;

import com.globits.da.domain.Commune;
import com.globits.da.domain.District;
import com.globits.da.domain.Province;
import com.globits.da.dto.CommuneDto;
import com.globits.da.dto.DistrictDto;
import com.globits.da.exception.NullOrNotFoundException;
import com.globits.da.repository.CommuneRepository;
import com.globits.da.repository.DistrictRepository;
import com.globits.da.repository.EmployeeRepository;
import com.globits.da.repository.ProvinceRepository;
import com.globits.da.service.DistrictService;
import com.globits.da.validator.BaseValidator;
import com.globits.da.validator.DistrictValidator;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DistrictServiceImpl implements DistrictService {
    private final DistrictRepository districtRepository;
    private final ProvinceRepository provinceRepository;
    private final CommuneRepository communeRepository;
    private final EmployeeRepository employeeRepository;

    public DistrictServiceImpl(DistrictRepository districtRepository, ProvinceRepository provinceRepository, CommuneRepository communeRepository, EmployeeRepository employeeRepository) {
        this.districtRepository = districtRepository;
        this.provinceRepository = provinceRepository;
        this.communeRepository = communeRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<DistrictDto> getAllDistrict() {
        List<DistrictDto> districtDtos = new ArrayList<>();
        List<District> districts = districtRepository.findAll();
        for(District district : districts) {
            districtDtos.add(new DistrictDto(district));
        }
        return districtDtos;
    }

    @Override
    public DistrictDto addNewDistrict(DistrictDto districtDto) {
        BaseValidator.checkValidValue(districtDto.getProvinceCode(), "Province code");
        DistrictValidator.checkDistrictAlreadyExist(districtDto.getProvinceCode(), districtDto.getName(), provinceRepository);

        District district = new District();
        district.setName(districtDto.getName());
        districtRepository.save(district);
        Optional<Province> province = provinceRepository.findById(districtDto.getProvinceCode());
        district.setProvince(province.get());
        //district.setCommunes(districtDto.getCommuneDtos());
        if(districtDto.getCommuneDtos() != null && !districtDto.getCommuneDtos().isEmpty()) {
            List<Commune> communes = new ArrayList<>();
            for(CommuneDto communeDto : districtDto.getCommuneDtos()) {
                Commune commune = new Commune();
                commune.setDistrict(district);
                commune.setName(communeDto.getName());

                communes.add(commune);
            }
            district.setCommunes(communes);
        }
        districtRepository.save(district);
        return new DistrictDto(district);
    }

    @Override
    public List<CommuneDto> findCommuneByDistrictId(Integer id) {
        Optional<District> district = districtRepository.findById(id);
        if(!district.isPresent()) {
            throw new NullOrNotFoundException("Can't find district with this id");
        }
        List<Commune> communes = district.get().getCommunes();
        List<CommuneDto> communeDtos = new ArrayList<>();
        for(Commune commune : communes) {
            communeDtos.add(new CommuneDto(commune));
        }
        return communeDtos;
    }

    @Override
    public DistrictDto deleteDistrictById(Integer id) {
        Optional<District> district = districtRepository.findById(id);
        if(!district.isPresent()) {
            throw new NullOrNotFoundException("Can't find district with this id");
        }

        District district1 = district.get();
        DistrictDto districtDto = new DistrictDto(district1);
        if(!district1.getCommunes().isEmpty()) {
            for(Commune commune : district1.getCommunes()) {
                employeeRepository.updateCommuneIdToNull(commune.getId());
                communeRepository.delete(commune);
            }
            district1.getCommunes().clear();
        }
        employeeRepository.updateDistrictIdToNull(id);
        districtRepository.delete(district1);
        return districtDto;
    }

    @Override
    public DistrictDto updateDistrictById(Integer id, DistrictDto districtDto) {
        Optional<District> districtOptional = districtRepository.findById(id);
        if(!districtOptional.isPresent()) {
            throw new NullOrNotFoundException("Can't find district with this id");
        }

        District savedDistrict = districtOptional.get();
        savedDistrict.setId(id);
        savedDistrict.setName(districtDto.getName());
        savedDistrict.getCommunes().clear();

        Optional<Province> provinceOptional = provinceRepository.findById(districtDto.getProvinceCode());
        if(!provinceOptional.isPresent()) {
            throw new NullOrNotFoundException("Province with id: " + districtDto.getProvinceCode() + " is not exist");
        }
        savedDistrict.setProvince(provinceOptional.get());
        districtRepository.save(savedDistrict);

        List<Commune> communes = new ArrayList<>();
        if(districtDto.getCommuneDtos() != null) {
            for(CommuneDto communeDto : districtDto.getCommuneDtos()) {
                Commune commune = new Commune();
                commune.setName(communeDto.getName());
                commune.setDistrict(savedDistrict);

                communeRepository.save(commune);
                communes.add(commune);
            }
        }
        savedDistrict.setCommunes(communes);
        return new DistrictDto(savedDistrict);
    }
}
