package com.globits.da.service;

import com.globits.da.dto.MyFirstApiDto;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface MyFirstApiService {
    String getMyFirstApiString();

    MyFirstApiDto postMyFirstApiDto(MyFirstApiDto myFirstApiDto);

    MyFirstApiDto postMyFirstApiDtoUsingServlet(HttpServletRequest request, HttpServletResponse response);

    String postMyFirstApiDtoUsingServletVer2(HttpServletRequest request, HttpServletResponse response) throws IOException;

    void postFile(MultipartFile[] submissions) throws IOException;
}
