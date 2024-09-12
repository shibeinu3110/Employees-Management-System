package com.globits.da.rest;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.globits.da.AFFakeConstants;
import com.globits.da.dto.CategoryDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class RestCategoryController {
	@Autowired
	CategoryService categoryService;
	 

	@Secured({  AFFakeConstants.ROLE_ADMIN, AFFakeConstants.ROLE_SUPER_ADMIN })
	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResponseEntity<Page<CategoryDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
		Page<CategoryDto> results = categoryService.getPage(pageSize, pageIndex);
		return new ResponseEntity<Page<CategoryDto>>(results, HttpStatus.OK);
	}

	@Secured({   AFFakeConstants.ROLE_ADMIN, AFFakeConstants.ROLE_SUPER_ADMIN })
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<CategoryDto> save(@RequestBody CategoryDto dto) {
		CategoryDto result = categoryService.saveOrUpdate(null, dto);
		return new ResponseEntity<CategoryDto>(result, HttpStatus.OK);
	}

	@Secured({  AFFakeConstants.ROLE_ADMIN, AFFakeConstants.ROLE_SUPER_ADMIN })
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<CategoryDto> save(@RequestBody CategoryDto dto, @PathVariable UUID id) {
		CategoryDto result = categoryService.saveOrUpdate(id, dto);
		return new ResponseEntity<CategoryDto>(result, HttpStatus.OK);
	}

	@Secured({   AFFakeConstants.ROLE_ADMIN, AFFakeConstants.ROLE_SUPER_ADMIN })
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<CategoryDto> getList(@PathVariable UUID id) {
		CategoryDto result = categoryService.getCertificate(id);
		return new ResponseEntity<CategoryDto>(result, HttpStatus.OK);
	}

	@Secured({   AFFakeConstants.ROLE_ADMIN, AFFakeConstants.ROLE_SUPER_ADMIN })
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
		Boolean result = categoryService.deleteKho(id);
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}
	
	@Secured({  AFFakeConstants.ROLE_ADMIN, AFFakeConstants.ROLE_SUPER_ADMIN })
	@RequestMapping(value = "/getAllCategory", method = RequestMethod.GET)
	public ResponseEntity<List<CategoryDto>> getAllCategory() {
		List<CategoryDto> result = categoryService.getAllCategory();
		return new ResponseEntity<List<CategoryDto>>(result, HttpStatus.OK);
	}

	@Secured({  AFFakeConstants.ROLE_ADMIN, AFFakeConstants.ROLE_SUPER_ADMIN })
	@RequestMapping(value = "/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<CategoryDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<CategoryDto> page = this.categoryService.searchByPage(searchDto);
		return new ResponseEntity<Page<CategoryDto>>(page, HttpStatus.OK);
	}

//	@Secured({  AFFakeConstants.ROLE_ADMIN, AFFakeConstants.ROLE_SUPER_ADMIN })
	@RequestMapping(value = "/checkCode", method = RequestMethod.GET)
	public ResponseEntity<Boolean> checkCode(@RequestParam(value = "id", required = false) UUID id,
			@RequestParam("code") String code) {
		Boolean result = categoryService.checkCode(id, code);
		return new ResponseEntity<Boolean>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	
//	@GetMapping(value = "/getById/{id}")
//	public EmployeeDTO getById(UUID id)
//	{
//		EmployeeDTO employeeDTO = employeeService.getById(id);
//		return employeeDTO;
//		
//	}
 
	 
}
