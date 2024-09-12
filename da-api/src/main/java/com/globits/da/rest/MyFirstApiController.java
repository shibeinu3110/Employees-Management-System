package com.globits.da.rest;

import com.globits.da.dto.MyFirstApiDto;
import com.globits.da.service.MyFirstApiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class MyFirstApiController {
    private final MyFirstApiService myFirstApiService;

    public MyFirstApiController(MyFirstApiService myFirstApiService) {
        this.myFirstApiService = myFirstApiService;
    }


    @GetMapping("/first")
    public ResponseEntity<String> getMyFirstApi() {
        return new ResponseEntity<>(myFirstApiService.getMyFirstApiString(), HttpStatus.OK);
    }

    /**sử dụng RequestBody và dạng raw JSON*/
    @PostMapping("/postDto1")
    public ResponseEntity<MyFirstApiDto> postMyFirstApiDto1(@RequestBody MyFirstApiDto myFirstApiDto) {
        return new ResponseEntity<>(myFirstApiService.postMyFirstApiDto(myFirstApiDto), HttpStatus.OK) ;
    }

    /**hoặc sử dụng ModelAttribute và dạng form-data*/
    @PostMapping("/postDto2")
    public ResponseEntity<MyFirstApiDto> postMyFirstApiDto2(@ModelAttribute MyFirstApiDto myFirstApiDto) {
        return new ResponseEntity<>(myFirstApiService.postMyFirstApiDto(myFirstApiDto), HttpStatus.OK) ;
    }

    /**sử dụng RequestParam và dùng form-data*/
    @PostMapping("/postDto3")
    public ResponseEntity<MyFirstApiDto> postMyFirstApiDto3(@RequestParam String name,
                                                           @RequestParam String code,
                                                           @RequestParam Integer age) {
        return new ResponseEntity<>(new MyFirstApiDto(code, name, age), HttpStatus.OK);
    }

    /**sử dụng PathVariable và dùng form-data*/
    @PostMapping("/postDto4/{name}/{code}/{age}")
    public ResponseEntity<MyFirstApiDto> postMyFirstApiDto4(@PathVariable("name") String name,
                                                            @PathVariable("code") String code,
                                                            @PathVariable("age") Integer age) {
        return new ResponseEntity<>(new MyFirstApiDto(code, name, age), HttpStatus.OK);
    }

    /**sử dung Servlet(không annotation) và dùng form-data*/
    @PostMapping("/postDto5")
    public ResponseEntity<MyFirstApiDto> postMyFirstApiDto5(HttpServletRequest request,
                                                            HttpServletResponse response) {
        return new ResponseEntity<>(myFirstApiService.postMyFirstApiDtoUsingServlet(request, response), HttpStatus.OK);
    }

    /**sử dung Servlet(không annotation) và dùng raw JSON*/
    /**không chắc chắn lắm vì nó trả về dạng string*/
    @PostMapping("/postDto6")
    public ResponseEntity<String> postMyFirstApiDto6(HttpServletRequest request,
                                                            HttpServletResponse response) throws IOException {
        return new ResponseEntity<>(myFirstApiService.postMyFirstApiDtoUsingServletVer2(request, response), HttpStatus.OK);
    }

    /**post file*/
    @PostMapping("/postDto7")
    public void postMyFirstApiDto7(@RequestParam("file") MultipartFile[] submissions) throws IOException {
        myFirstApiService.postFile(submissions);
    }























}
