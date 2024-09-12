package com.globits.da.rest;

import com.globits.da.dto.CommuneDto;
import com.globits.da.response.CustomizedResponse;
import com.globits.da.service.CommuneService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/commune")
public class RestCommuneController {
    private final CommuneService communeService;

    public RestCommuneController(CommuneService communeService) {
        this.communeService = communeService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllCommunes() {
        List<CommuneDto> communeDtos = communeService.getAllCommunes();
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "get all communes successfully", communeDtos), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> addNewCommune(@RequestBody CommuneDto communeDto) {
        CommuneDto communeDto1 = communeService.addNewCommune(communeDto);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "add new commune successfully", communeDto1), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findCommuneById(@PathVariable("id") Integer id) {
        CommuneDto communeDto = communeService.findById(id);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "find commune successfully", communeDto), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCommuneById(@PathVariable("id") Integer id) {
        CommuneDto communeDto = communeService.deleteById(id);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "delete commune successfully", communeDto), HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCommuneById(@PathVariable("id") Integer id,
                                               @RequestBody CommuneDto communeDto1) {
        CommuneDto communeDto = communeService.updateById(id, communeDto1);
        return new ResponseEntity<>(new CustomizedResponse<>(HttpStatus.OK.toString(), "update commune successfully", communeDto), HttpStatus.OK);
    }
}
