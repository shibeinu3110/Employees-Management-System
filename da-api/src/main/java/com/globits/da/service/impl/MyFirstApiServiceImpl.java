package com.globits.da.service.impl;

import com.globits.da.dto.MyFirstApiDto;
import com.globits.da.service.MyFirstApiService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Arrays;
import java.util.List;

@Service
public class MyFirstApiServiceImpl implements MyFirstApiService {
    @Override
    public String getMyFirstApiString() {
        return "This is my first API using service and @Autowired";
    }

    @Override
    public MyFirstApiDto postMyFirstApiDto(MyFirstApiDto myFirstApiDto) {
        return myFirstApiDto;
    }

    @Override
    public MyFirstApiDto postMyFirstApiDtoUsingServlet(HttpServletRequest request, HttpServletResponse response) {

        String name = request.getParameter("name");
        String code = request.getParameter("code");
        String ageString = request.getParameter("age");


        //convert string to int
        int age = 0;
        try {
            if(ageString != null && !ageString.isEmpty()) {
                age = Integer.parseInt(ageString);
            }
        } catch (NumberFormatException exception) {
            throw  new RuntimeException("Mismatch");
        }
        return new MyFirstApiDto(code,name,age);
    }

    @Override
    public String postMyFirstApiDtoUsingServletVer2(HttpServletRequest request, HttpServletResponse response) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        String line = null;
        while((line = request.getReader().readLine()) != null) {
            stringBuilder.append(line);
            stringBuilder.append("\n");
        }
        String ans = stringBuilder.toString();
        return ans;
    }

    @Override
    public void postFile(MultipartFile[] submissions) throws IOException {
        if(submissions.length == 0) {
            System.out.println("Please enter at least 1 file !!!");
        }
        List<MultipartFile> files = Arrays.asList(submissions);
        for(MultipartFile multipartFile:files) {
            if(!multipartFile.isEmpty()) {
                String content = readContent(multipartFile.getInputStream());
                System.out.println(content);
            } else {
                System.out.println("File with name" + multipartFile.getName() + "is empty");
            }
        }
    }

    private String readContent(InputStream inputStream) {
        StringBuilder content = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return content.toString();
    }
}
