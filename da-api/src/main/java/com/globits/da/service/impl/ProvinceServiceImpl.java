package com.globits.da.service.impl;

import com.globits.da.domain.Commune;
import com.globits.da.domain.District;
import com.globits.da.domain.Province;
import com.globits.da.dto.CommuneDto;
import com.globits.da.dto.DistrictDto;
import com.globits.da.dto.ProvinceDto;
import com.globits.da.exception.NullOrNotFoundException;
import com.globits.da.repository.*;
import com.globits.da.service.ProvinceService;
import com.globits.da.validator.ProvinceValidator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProvinceServiceImpl implements ProvinceService {
    private final ProvinceRepository provinceRepository;
    private final DistrictRepository districtRepository;
    private final CommuneRepository communeRepository;
    private final EmployeeRepository employeeRepository;
    private final EmployeeCertificateRepository employeeCertificateRepository;

    public ProvinceServiceImpl(ProvinceRepository provinceRepository, DistrictRepository districtRepository, CommuneRepository communeRepository, EmployeeRepository employeeRepository, EmployeeCertificateRepository employeeCertificateRepository) {
        this.provinceRepository = provinceRepository;
        this.districtRepository = districtRepository;
        this.communeRepository = communeRepository;
        this.employeeRepository = employeeRepository;
        this.employeeCertificateRepository = employeeCertificateRepository;
    }


    @Override
    public ProvinceDto addNewProvince(ProvinceDto provinceDto) {
        Province province = new Province();
        province.setName(provinceDto.getName());

        ProvinceValidator.checkProvinceAlreadyExist(provinceDto, provinceRepository);
        ProvinceValidator.checkProvinceDto(provinceDto);

        Province savedProvince = provinceRepository.save(province);
        if(provinceDto.getDistrictDtos() != null) {
            List<District> districts = new ArrayList<>();
            for(DistrictDto districtDto : provinceDto.getDistrictDtos()) {
                District district = new District();
                district.setName(districtDto.getName());
                district.setProvince(province);
                districtRepository.save(district);
                if(!districtDto.getCommuneDtos().isEmpty() || districtDto.getCommuneDtos() != null) {
                    List<Commune> communes = new ArrayList<>();
                    for(CommuneDto communeDto : districtDto.getCommuneDtos()) {
                        Commune commune = new Commune();
                        commune.setName(communeDto.getName());
                        commune.setDistrict(district);

                        communeRepository.save(commune);
                        communes.add(commune);
                    }
                    district.setCommunes(communes);
                }

                districtRepository.save(district);
                districts.add(district);
            }
            savedProvince.setDistricts(districts);
        }

        return new ProvinceDto(savedProvince);
    }

    @Override
    public List<ProvinceDto> getProvinceList() {
        List<Province> provinces = provinceRepository.findAll();
        List<ProvinceDto> provinceDtoList = new ArrayList<>();
        for(Province province : provinces) {
            provinceDtoList.add(new ProvinceDto(province));
        }
        return provinceDtoList;
    }

    @Override
    public List<DistrictDto> findDistrictListByProvinceId(Integer id) {
        Optional<Province> province = provinceRepository.findById(id);
        if(!province.isPresent()) {
            throw new NullOrNotFoundException("Can't find province with this ID");
        }

        List<District> districts = province.get().getDistricts();
        List<DistrictDto> districtDtos = new ArrayList<>();
        for(District district : districts) {
            districtDtos.add(new DistrictDto(district));
        }
        return districtDtos;
    }

    @Override
    @Transactional
    public ProvinceDto deleteProvinceById(Integer id) {
        Optional<Province> province = provinceRepository.findById(id);
        if(!province.isPresent()) {
            throw new NullOrNotFoundException("Can't find province with this ID");
        }
        ProvinceDto provinceDto = new ProvinceDto(province.get());
        for(District district : province.get().getDistricts()) {
            for(Commune commune : district.getCommunes()) {
                employeeRepository.updateCommuneIdToNull(commune.getId());
                communeRepository.delete(commune);
            }
            employeeRepository.updateDistrictIdToNull(district.getId());
            districtRepository.delete(district);
        }
        employeeCertificateRepository.updateProvinceIdToNull(provinceDto.getId());
        employeeRepository.updateProvinceIdToNull(provinceDto.getId());
        provinceRepository.delete(province.get());

        return provinceDto;
    }

    @Override
    public ProvinceDto updateProvince(Integer id, ProvinceDto provinceDto) {
        Optional<Province> province = provinceRepository.findById(id);
        if(!province.isPresent()) {
            throw new NullOrNotFoundException("Can't find province with this id");
        }
        ProvinceValidator.checkProvinceDto(provinceDto);

        Province savedProvince = province.get();

        savedProvince.setName(null);
        provinceRepository.save(savedProvince);

        ProvinceValidator.checkProvinceAlreadyExist(provinceDto, provinceRepository);


        savedProvince.setName(provinceDto.getName());
        savedProvince.setId(id);

        savedProvince.getDistricts().clear();
        provinceRepository.save(savedProvince);


        List<District> districts = new ArrayList<>();
        if(provinceDto.getDistrictDtos() != null) {

            for(DistrictDto districtDto : provinceDto.getDistrictDtos()) {
                District district = new District();
                district.setName(districtDto.getName());
                district.setProvince(savedProvince);


                districtRepository.save(district);

                List<Commune> communes = new ArrayList<>();
                if(districtDto.getCommuneDtos() != null) {
                    for(CommuneDto communeDto : districtDto.getCommuneDtos()) {
                        Commune commune = new Commune();
                        commune.setName(communeDto.getName());
                        commune.setDistrict(district);
                        communeRepository.save(commune);
                        communes.add(commune);
                    }
                    district.setCommunes(communes);
                }

                districts.add(district);
            }
        }
        savedProvince.setDistricts(districts);

        return new ProvinceDto(savedProvince);
    }
}













