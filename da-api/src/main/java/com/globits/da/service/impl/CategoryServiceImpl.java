package com.globits.da.service.impl;

import java.util.List;
import java.util.UUID;

import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.da.domain.Category;
import com.globits.da.dto.CategoryDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.CategoryRepository;
import com.globits.da.service.CategoryService;
@Service
public class CategoryServiceImpl extends GenericServiceImpl<Category, UUID> implements CategoryService{
	@Autowired
	CategoryRepository repos;
	 
	@Override
	public Page<CategoryDto> getPage(int pageSize, int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex-1, pageSize);
		return repos.getListPage(pageable);
	}
	@Override
	public CategoryDto saveOrUpdate(UUID id, CategoryDto dto) {
		if(dto != null ) {
			Category entity = null;
			if(dto.getId() !=null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity =  repos.getOne(dto.getId());
			}
			if(entity == null) {
				entity = new Category();
			}
			entity.setCode(dto.getCode());
			entity.setName(dto.getName());
			
			entity = repos.save(entity);
			if (entity != null) {
				return new CategoryDto(entity);
			}
			}
			return null;
	}

	@Override
	public Boolean deleteKho(UUID id) {
		if(id!=null) {
			repos.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public CategoryDto getCertificate(UUID id) {
		Category entity = repos.getOne(id);
		if(entity!=null) {
			return new CategoryDto(entity);
		}
		return null;
	}

	@Override
	public Page<CategoryDto> searchByPage(SearchDto dto) {
		if (dto == null) {
			return null;
		}

		int pageIndex = dto.getPageIndex();
		int pageSize = dto.getPageSize();

		if (pageIndex > 0) {
			pageIndex--;
		} else {
			pageIndex = 0;
		}

		String whereClause = "";
		
		String orderBy = " ORDER BY entity.createDate DESC";
		
		String sqlCount = "select count(entity.id) from  Category as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.CategoryDto(entity) from  Category as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.name LIKE :text OR entity.code LIKE :text )";
		}

		
		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, CategoryDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<CategoryDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<CategoryDto> result = new PageImpl<CategoryDto>(entities, pageable, count);
		return result;
	}

	@Override
	public Boolean checkCode(UUID id, String code) {
		if(code != null && StringUtils.hasText(code)) {
			Long count = repos.checkCode(code,id);
				return count != 0l;
			}
		return null;
	}

	@Override
	public Boolean deleteCheckById(UUID id) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<CategoryDto> getAllCategory() {
		List<CategoryDto> listCategory = repos.getAllCategory();
		return listCategory;
	}
	 

}
