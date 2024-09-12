package com.globits.da.rest;

import com.globits.da.dto.CommuneDto;
import com.globits.da.dto.DistrictDto;
import com.globits.da.response.CustomizedResponse;
import com.globits.da.service.DistrictService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/district")
public class RestDistrictController {
    private final DistrictService districtService;

    public RestDistrictController(DistrictService districtService) {
        this.districtService = districtService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllDistrict() {
        List<DistrictDto> districtDtos = districtService.getAllDistrict();

        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "get all district successfully", districtDtos), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> addNewDistrict(@RequestBody DistrictDto districtDto) {
        DistrictDto districtDto1 = districtService.addNewDistrict(districtDto);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "add successfully", districtDto1), HttpStatus.OK);
    }

    @GetMapping("/findCommunesByDistrictId/{id}")
    public ResponseEntity<?> findCommuneByDistrictId(@PathVariable("id") Integer id) {
        List<CommuneDto> communeDtos = districtService.findCommuneByDistrictId(id);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "get all district successfully", communeDtos), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDistrictById(@PathVariable("id") Integer id) {
        DistrictDto districtDto = districtService.deleteDistrictById(id);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "delete district successfully", districtDto), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDistrictById(@PathVariable("id") Integer id,
                                                @RequestBody DistrictDto districtDto1) {
        DistrictDto districtDto = districtService.updateDistrictById(id, districtDto1);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "update district successfully", districtDto), HttpStatus.OK);

    }
}
