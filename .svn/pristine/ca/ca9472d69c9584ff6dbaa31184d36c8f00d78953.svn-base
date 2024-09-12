package com.globits.da.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.Category;
import com.globits.da.dto.CategoryDto;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID>{
	@Query("select count(entity.id) from Category entity where entity.code =?1 and (entity.id <> ?2 or ?2 is null) ")
	Long checkCode(String code, UUID id);
	@Query("select new com.globits.da.dto.CategoryDto(ed) from Category ed")
	Page<CategoryDto> getListPage( Pageable pageable);
	
	@Query("select new com.globits.da.dto.CategoryDto(ed) from Category ed")
	List<CategoryDto> getAllCategory();

	Category findOneByCode(String code);
	
}
