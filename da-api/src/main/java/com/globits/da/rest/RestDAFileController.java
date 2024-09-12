package com.globits.da.rest;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.globits.core.domain.FileDescription;
import com.globits.core.dto.FileDescriptionDto;
import com.globits.core.service.FileDescriptionService;

@RestController
@RequestMapping("/api/dafile")
public class RestDAFileController {
	@Autowired
	private Environment env;
	@Autowired
	FileDescriptionService fileDescriptionService;
	@RequestMapping(value = "/image", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<FileDescriptionDto> uploadAttachment(@RequestParam("uploadfile") MultipartFile uploadfile) {
		FileDescriptionDto result = null;
		String path = "";
		if (env.getProperty("da.file.folder") != null) {
			path = env.getProperty("da.file.folder");
		}
		try { 
			String extension = uploadfile.getOriginalFilename().split("\\.(?=[^\\.]+$)")[1];
			UUID randamCode = UUID.randomUUID();
			String filename = randamCode + "." + extension; 
			String filePath = path;
			try {
				File fileToBeSaved = new File(filePath, filename);
				uploadfile.transferTo(fileToBeSaved); 
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}

			FileDescription file = new FileDescription();
			file.setContentSize(uploadfile.getSize());
			file.setContentType(uploadfile.getContentType());
			file.setName(filename);
			file.setFilePath(filePath);
			file = fileDescriptionService.save(file);

			result = new FileDescriptionDto(file);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<FileDescriptionDto>(result, HttpStatus.OK);
	}
}
