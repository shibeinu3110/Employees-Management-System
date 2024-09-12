package com.globits.da.rest;

import com.globits.da.dto.DistrictDto;
import com.globits.da.dto.ProvinceDto;
import com.globits.da.response.CustomizedResponse;
import com.globits.da.service.ProvinceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/province")
public class RestProvinceController {
    private final ProvinceService provinceService;
    public RestProvinceController(ProvinceService provinceService) {
        this.provinceService = provinceService;
    }


    @PostMapping("/")
    public ResponseEntity<?> addNewProvince(@RequestBody ProvinceDto provinceDto) {
        ProvinceDto addedProvince = provinceService.addNewProvince(provinceDto);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "Add province successfully", addedProvince), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getProvinceList() {
        List<ProvinceDto> provinceDtoList = provinceService.getProvinceList();
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "This is your province list", provinceDtoList), HttpStatus.OK);
    }


    @GetMapping("/findDistrictByProvinceId/{id}")
    public ResponseEntity<?> getDistrictListByProvinceId(@PathVariable("id") Integer id) {
        List<DistrictDto> districtDtoList = provinceService.findDistrictListByProvinceId(id);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "This is your district list belong to province Id:" + id, districtDtoList), HttpStatus.OK);
    }


    @DeleteMapping("/deleteProvince/{id}")
    public ResponseEntity<?> deleteProvince(@PathVariable("id") Integer id) {
        ProvinceDto provinceDto = provinceService.deleteProvinceById(id);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "Province with id: " + id + " is deleted", provinceDto), HttpStatus.OK);
    }

    @PutMapping("/updateProvince/{id}")
    public ResponseEntity<?> updateProvince(@PathVariable("id") Integer id,
                                            @RequestBody ProvinceDto provinceDto) {
        ProvinceDto provinceDto1 = provinceService.updateProvince(id, provinceDto);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "Province with id: " + id + " is updated", provinceDto1),HttpStatus.OK);
    }
}









